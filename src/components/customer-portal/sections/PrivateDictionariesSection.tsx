
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Lock, Edit, Trash2, Save, X } from 'lucide-react';
import { GlossaryTerm } from '@/types/glossary';
import { Glossary } from '@/types/organization';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface PrivateDictionariesSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface GlossaryFormValues {
  name: string;
  description: string;
}

interface TermFormValues {
  term: string;
  definition: string;
  category: string;
}

const PrivateDictionariesSection: React.FC<PrivateDictionariesSectionProps> = ({ user, setLocalLoading }) => {
  const [privateGlossaries, setPrivateGlossaries] = useState<Glossary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGlossary, setSelectedGlossary] = useState<string | null>(null);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [isNewGlossaryDialogOpen, setIsNewGlossaryDialogOpen] = useState(false);
  const [isNewTermDialogOpen, setIsNewTermDialogOpen] = useState(false);

  // Forms
  const glossaryForm = useForm<GlossaryFormValues>({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const termForm = useForm<TermFormValues>({
    defaultValues: {
      term: '',
      definition: '',
      category: ''
    }
  });

  // Fetch private glossaries for the user
  useEffect(() => {
    const fetchPrivateGlossaries = async () => {
      setIsLoading(true);
      try {
        // First get the organizations this user belongs to
        const { data: memberships, error: membershipError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', user.id);
          
        if (membershipError) throw membershipError;
        
        // Then get the glossaries for these organizations
        if (memberships && memberships.length > 0) {
          const orgIds = memberships.map(m => m.organization_id);
          
          const { data: glossaries, error: glossariesError } = await supabase
            .from('glossaries')
            .select('id, name, description, organization_id')
            .in('organization_id', orgIds);
            
          if (glossariesError) throw glossariesError;
          setPrivateGlossaries(glossaries || []);
          
          // Select the first glossary by default if available
          if (glossaries && glossaries.length > 0 && !selectedGlossary) {
            setSelectedGlossary(glossaries[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching private glossaries:", error);
        toast.error("Failed to load private glossaries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivateGlossaries();
  }, [user.id]);

  // Fetch glossary terms when a glossary is selected
  useEffect(() => {
    if (!selectedGlossary) return;
    
    const fetchGlossaryTerms = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('glossary_terms')
          .select('*')
          .eq('glossary_id', selectedGlossary);
          
        if (error) throw error;
        setGlossaryTerms(data || []);
      } catch (error) {
        console.error("Error fetching glossary terms:", error);
        toast.error("Failed to load glossary terms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlossaryTerms();
  }, [selectedGlossary]);

  // Filter terms by search
  const filteredTerms = glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (term.category && term.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group terms by category
  const groupedTerms = filteredTerms.reduce((groups, term) => {
    const category = term.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(term);
    return groups;
  }, {} as Record<string, GlossaryTerm[]>);

  // Create new glossary
  const handleCreateGlossary = async (values: GlossaryFormValues) => {
    setIsLoading(true);
    try {
      // Get the user's organization (assuming they're in at least one)
      const { data: memberships, error: membershipError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id)
        .limit(1);
        
      if (membershipError) throw membershipError;
      
      if (!memberships || memberships.length === 0) {
        toast.error("You need to be part of an organization to create a glossary");
        return;
      }
      
      const organizationId = memberships[0].organization_id;
      
      // Create the glossary
      const { data: newGlossary, error: glossaryError } = await supabase
        .from('glossaries')
        .insert({
          name: values.name,
          description: values.description,
          organization_id: organizationId
        })
        .select()
        .single();
        
      if (glossaryError) throw glossaryError;
      
      toast.success("Glossary created successfully");
      setPrivateGlossaries([...privateGlossaries, newGlossary]);
      setSelectedGlossary(newGlossary.id);
      setIsNewGlossaryDialogOpen(false);
      glossaryForm.reset();
    } catch (error) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create glossary");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new term to glossary
  const handleAddTerm = async (values: TermFormValues) => {
    if (!selectedGlossary) {
      toast.error("No glossary selected");
      return;
    }
    
    setIsLoading(true);
    try {
      const { data: newTerm, error } = await supabase
        .from('glossary_terms')
        .insert({
          term: values.term,
          definition: values.definition,
          category: values.category || 'General',
          glossary_id: selectedGlossary
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Term added successfully");
      setGlossaryTerms([...glossaryTerms, newTerm]);
      setIsNewTermDialogOpen(false);
      termForm.reset();
    } catch (error) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Private Dictionaries</h2>
          <p className="text-gray-600 mb-6">
            Manage dictionaries specific to your organization.
          </p>
        </div>
        
        <Dialog open={isNewGlossaryDialogOpen} onOpenChange={setIsNewGlossaryDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Dictionary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Dictionary</DialogTitle>
              <DialogDescription>
                Add a new dictionary for your organization.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...glossaryForm}>
              <form onSubmit={glossaryForm.handleSubmit(handleCreateGlossary)} className="space-y-4">
                <FormField
                  control={glossaryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Technical Terms" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your dictionary
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={glossaryForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A collection of technical terms for our team" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Short description of the dictionary's purpose
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Dictionary"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Dictionaries</CardTitle>
              <CardDescription>Dictionaries your organization owns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {isLoading && !privateGlossaries.length ? (
                <LoadingSpinner message="Loading dictionaries..." />
              ) : (
                privateGlossaries.map(glossary => (
                  <Button 
                    key={glossary.id}
                    variant={selectedGlossary === glossary.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedGlossary(glossary.id)}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {glossary.name}
                  </Button>
                ))
              )}
              
              {!isLoading && privateGlossaries.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <p>No private dictionaries available</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setIsNewGlossaryDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create first dictionary
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {privateGlossaries.find(g => g.id === selectedGlossary)?.name || 'Dictionary Terms'}
                </CardTitle>
                <CardDescription>
                  {privateGlossaries.find(g => g.id === selectedGlossary)?.description || 'Search and browse terms'}
                </CardDescription>
              </div>
              
              {selectedGlossary && (
                <Dialog open={isNewTermDialogOpen} onOpenChange={setIsNewTermDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Term
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Term</DialogTitle>
                      <DialogDescription>
                        Add a new term to your dictionary.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...termForm}>
                      <form onSubmit={termForm.handleSubmit(handleAddTerm)} className="space-y-4">
                        <FormField
                          control={termForm.control}
                          name="term"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Term</FormLabel>
                              <FormControl>
                                <Input placeholder="API" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={termForm.control}
                          name="definition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Definition</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Application Programming Interface" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={termForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input placeholder="Technical" {...field} />
                              </FormControl>
                              <FormDescription>
                                Optional category to organize terms
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <DialogFooter>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Term"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            
            <div className="px-6 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search terms..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <CardContent className="max-h-[60vh] overflow-y-auto">
              {isLoading && !glossaryTerms.length ? (
                <LoadingSpinner message="Loading terms..." />
              ) : (
                Object.entries(groupedTerms).map(([category, terms]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-md font-semibold mb-2 text-gray-700 border-b pb-1">
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {terms.map((term) => (
                        <div key={term.id} className="border rounded-md p-3 bg-gray-50">
                          <div className="flex justify-between">
                            <div className="font-medium text-gray-900">{term.term}</div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{term.definition}</div>
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="text-xs text-gray-500 mt-2">
                              Related: {term.relatedTerms.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
              
              {!isLoading && selectedGlossary && filteredTerms.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  {searchTerm ? (
                    <p>No terms found matching "{searchTerm}"</p>
                  ) : (
                    <div>
                      <p>No terms in this dictionary yet</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setIsNewTermDialogOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add your first term
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {!selectedGlossary && !isLoading && (
                <div className="text-center py-10 text-gray-500">
                  <p>Select a dictionary to view terms</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivateDictionariesSection;

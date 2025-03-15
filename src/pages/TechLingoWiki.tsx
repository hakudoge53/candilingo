
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTechLingoWiki } from "@/hooks/useTechLingoWiki";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth/useAuth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface TermFormValues {
  term: string;
  definition: string;
  category: string;
  difficulty: string;
}

const TechLingoWiki = () => {
  const { terms, isLoading, addTerm, updateTerm, deleteTerm, isAdding, isUpdating, isDeleting } = useTechLingoWiki();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<any>(null);
  const { activeUser } = useAuth();
  
  const isAdmin = activeUser?.id && activeUser.membership_tier === 'Admin';

  // Group terms by category
  const groupedTerms = terms.reduce((groups: Record<string, any[]>, term) => {
    const category = term.category || 'General';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(term);
    return groups;
  }, {});

  const categories = Object.keys(groupedTerms).sort();

  // Filter terms based on search query
  const filteredTerms = searchQuery 
    ? terms.filter(term => 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (term.category && term.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : terms;

  // Filter categories based on search
  const filteredCategories = searchQuery 
    ? categories.filter(category => 
        groupedTerms[category].some(term => 
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
        ) || category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  // Form for adding/editing terms
  const form = useForm<TermFormValues>({
    defaultValues: {
      term: '',
      definition: '',
      category: 'General',
      difficulty: 'Beginner'
    }
  });

  // Reset form when dialog closes
  const resetForm = () => {
    form.reset({
      term: '',
      definition: '',
      category: 'General',
      difficulty: 'Beginner'
    });
  };

  // Set form values for editing
  const editTerm = (term: any) => {
    setSelectedTerm(term);
    form.reset({
      term: term.term,
      definition: term.definition,
      category: term.category || 'General',
      difficulty: term.difficulty || 'Beginner'
    });
    setIsEditDialogOpen(true);
  };

  // Handle form submission for adding a term
  const handleAddTerm = (values: TermFormValues) => {
    addTerm(values.term, values.definition, values.category, values.difficulty);
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Handle form submission for editing a term
  const handleUpdateTerm = (values: TermFormValues) => {
    if (selectedTerm) {
      updateTerm(selectedTerm.id, values.term, values.definition, values.category, values.difficulty);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  // Handle deleting a term
  const handleDeleteTerm = (id: string) => {
    deleteTerm(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-techlex-blue">TechLingo Wiki</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Navigate technical terms and explanations to better understand the language of technology.
          </p>

          {/* Search and Admin Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search terms..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isAdmin && (
              <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                setIsAddDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button className="ml-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Term
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Term</DialogTitle>
                    <DialogDescription>
                      Add a new technical term and its definition to the wiki.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddTerm)} className="space-y-4">
                      <FormField
                        control={form.control}
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
                        control={form.control}
                        name="definition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Definition</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Application Programming Interface..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input placeholder="Programming" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="difficulty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Difficulty</FormLabel>
                              <Select defaultValue={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select difficulty" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit" disabled={isAdding}>
                          {isAdding ? "Adding..." : "Add Term"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner message="Loading tech terms..." />
            </div>
          ) : filteredTerms.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-center text-gray-500 mb-4">
                  {searchQuery ? `No terms found matching "${searchQuery}"` : "No terms in the database yet."}
                </p>
                {isAdmin && !searchQuery && (
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Term
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue={filteredCategories[0] || "all"} className="space-y-4">
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-max">
                  {filteredCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {filteredCategories.map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  {groupedTerms[category]
                    .filter(term => 
                      !searchQuery || 
                      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      term.definition.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((term) => (
                      <Card key={term.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {term.term}
                                <Badge className="ml-2" variant="outline">{term.difficulty || 'Beginner'}</Badge>
                              </CardTitle>
                              <CardDescription>{term.category || 'General'}</CardDescription>
                            </div>
                            
                            {isAdmin && (
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="icon" onClick={() => editTerm(term)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Term</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{term.term}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={() => handleDeleteTerm(term.id)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{term.definition}</p>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Edit Term Dialog */}
          {selectedTerm && (
            <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
              setIsEditDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Term</DialogTitle>
                  <DialogDescription>
                    Update this technical term and its definition.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleUpdateTerm)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="term"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Term</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="definition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Definition</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Term"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechLingoWiki;


import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, FileEdit, Trash2, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Glossary, GlossaryTerm } from '@/types/organization';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GlossaryPanelProps {
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  terms: GlossaryTerm[];
  createGlossary: (name: string, description?: string) => Promise<Glossary | null>;
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>;
  deleteGlossary: (glossaryId: string) => Promise<void>;
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>;
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>;
  deleteTerm: (termId: string) => Promise<void>;
  organizationId: string;
  isLoading: boolean;
}

const GlossaryPanel = ({ 
  glossaries, 
  activeGlossary,
  setActiveGlossary,
  terms,
  createGlossary, 
  updateGlossary,
  deleteGlossary,
  addTerm,
  updateTerm,
  deleteTerm,
  organizationId,
  isLoading 
}: GlossaryPanelProps) => {
  const [newGlossaryOpen, setNewGlossaryOpen] = useState(false);
  const [editGlossaryOpen, setEditGlossaryOpen] = useState(false);
  const [newTermOpen, setNewTermOpen] = useState(false);
  const [editTermOpen, setEditTermOpen] = useState(false);
  const [editTermId, setEditTermId] = useState<string | null>(null);
  
  const [newGlossary, setNewGlossary] = useState({
    name: '',
    description: ''
  });
  
  const [editGlossary, setEditGlossary] = useState({
    id: '',
    name: '',
    description: ''
  });
  
  const [newTerm, setNewTerm] = useState({
    term: '',
    definition: '',
    category: ''
  });
  
  const [editTerm, setEditTerm] = useState({
    id: '',
    term: '',
    definition: '',
    category: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateGlossary = async () => {
    if (!newGlossary.name.trim()) return;
    
    setIsSubmitting(true);
    await createGlossary(newGlossary.name, newGlossary.description);
    setIsSubmitting(false);
    setNewGlossary({
      name: '',
      description: ''
    });
    setNewGlossaryOpen(false);
  };

  const handleUpdateGlossary = async () => {
    if (!editGlossary.name.trim() || !editGlossary.id) return;
    
    setIsSubmitting(true);
    await updateGlossary(editGlossary.id, {
      name: editGlossary.name,
      description: editGlossary.description
    });
    setIsSubmitting(false);
    setEditGlossaryOpen(false);
  };

  const handleDeleteGlossary = async (glossaryId: string) => {
    await deleteGlossary(glossaryId);
  };

  const handleAddTerm = async () => {
    if (!newTerm.term.trim() || !newTerm.definition.trim() || !activeGlossary) return;
    
    setIsSubmitting(true);
    await addTerm(
      activeGlossary.id, 
      newTerm.term, 
      newTerm.definition, 
      newTerm.category.trim() || undefined
    );
    setIsSubmitting(false);
    setNewTerm({
      term: '',
      definition: '',
      category: ''
    });
    setNewTermOpen(false);
  };

  const handleUpdateTerm = async () => {
    if (!editTerm.term.trim() || !editTerm.definition.trim() || !editTerm.id) return;
    
    setIsSubmitting(true);
    await updateTerm(editTerm.id, {
      term: editTerm.term,
      definition: editTerm.definition,
      category: editTerm.category.trim() || undefined
    });
    setIsSubmitting(false);
    setEditTermOpen(false);
  };

  const handleEditTerm = (term: GlossaryTerm) => {
    setEditTerm({
      id: term.id,
      term: term.term,
      definition: term.definition,
      category: term.category || ''
    });
    setEditTermOpen(true);
  };

  const handleDeleteTerm = async (termId: string) => {
    await deleteTerm(termId);
  };

  const prepareEditGlossary = (glossary: Glossary) => {
    setEditGlossary({
      id: glossary.id,
      name: glossary.name,
      description: glossary.description || ''
    });
    setEditGlossaryOpen(true);
  };

  // Group terms by category for better display
  const groupedTerms = terms.reduce((groups, term) => {
    const category = term.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(term);
    return groups;
  }, {} as Record<string, GlossaryTerm[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedTerms).sort();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Custom Glossaries</h2>
        <Dialog open={newGlossaryOpen} onOpenChange={setNewGlossaryOpen}>
          <DialogTrigger asChild>
            <Button className="bg-techlex-blue">
              <PlusCircle className="mr-2 h-4 w-4" /> New Glossary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Glossary</DialogTitle>
              <DialogDescription>
                Create a new custom glossary for your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Glossary Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter glossary name" 
                  value={newGlossary.name} 
                  onChange={(e) => setNewGlossary({...newGlossary, name: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter glossary description" 
                  value={newGlossary.description} 
                  onChange={(e) => setNewGlossary({...newGlossary, description: e.target.value})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateGlossary} 
                disabled={isSubmitting || !newGlossary.name.trim()}
                className="bg-techlex-blue"
              >
                {isSubmitting ? "Creating..." : "Create Glossary"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {glossaries.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-gray-500">No glossaries yet. Create your first custom glossary to get started.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Tabs 
              value={activeGlossary?.id || ""} 
              onValueChange={(value) => {
                const glossary = glossaries.find(g => g.id === value);
                if (glossary) setActiveGlossary(glossary);
              }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList className="h-auto p-1">
                  {glossaries.map((glossary) => (
                    <TabsTrigger 
                      key={glossary.id} 
                      value={glossary.id}
                      className="px-4 py-2"
                    >
                      {glossary.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {activeGlossary && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => prepareEditGlossary(activeGlossary)}
                    >
                      <FileEdit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Glossary</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this glossary? This will permanently delete all terms within it.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => activeGlossary && handleDeleteGlossary(activeGlossary.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>

              {glossaries.map((glossary) => (
                <TabsContent key={glossary.id} value={glossary.id} className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-semibold">{glossary.name}</h3>
                          {glossary.description && (
                            <p className="text-gray-500 mt-1">{glossary.description}</p>
                          )}
                        </div>
                        
                        <Dialog open={newTermOpen} onOpenChange={setNewTermOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-techlex-blue">
                              <PlusCircle className="mr-2 h-4 w-4" /> Add Term
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Term</DialogTitle>
                              <DialogDescription>
                                Add a new term to your glossary.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="term">Term</Label>
                                <Input 
                                  id="term" 
                                  placeholder="Enter term" 
                                  value={newTerm.term} 
                                  onChange={(e) => setNewTerm({...newTerm, term: e.target.value})} 
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="definition">Definition</Label>
                                <Textarea 
                                  id="definition" 
                                  placeholder="Enter definition" 
                                  value={newTerm.definition} 
                                  onChange={(e) => setNewTerm({...newTerm, definition: e.target.value})} 
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="category">Category (Optional)</Label>
                                <Input 
                                  id="category" 
                                  placeholder="Enter category" 
                                  value={newTerm.category} 
                                  onChange={(e) => setNewTerm({...newTerm, category: e.target.value})} 
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={handleAddTerm} 
                                disabled={isSubmitting || !newTerm.term.trim() || !newTerm.definition.trim()}
                                className="bg-techlex-blue"
                              >
                                {isSubmitting ? "Adding..." : "Add Term"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {terms.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No terms in this glossary yet. Add some terms to get started.</p>
                        </div>
                      ) : (
                        <ScrollArea className="h-[500px] pr-4">
                          {sortedCategories.map((category) => (
                            <div key={category} className="mb-6">
                              <h4 className="text-lg font-medium mb-3 text-techlex-blue">{category}</h4>
                              <div className="space-y-4">
                                {groupedTerms[category].map((term) => (
                                  <div key={term.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                      <h5 className="text-md font-semibold">{term.term}</h5>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem onClick={() => handleEditTerm(term)}>
                                            <FileEdit className="mr-2 h-4 w-4" />
                                            Edit Term
                                          </DropdownMenuItem>
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete Term
                                              </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Term</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Are you sure you want to delete this term? This action cannot be undone.
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
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    <p className="text-gray-600 mt-2">{term.definition}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Edit Glossary Dialog */}
          <Dialog open={editGlossaryOpen} onOpenChange={setEditGlossaryOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Glossary</DialogTitle>
                <DialogDescription>
                  Update your glossary details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Glossary Name</Label>
                  <Input 
                    id="edit-name" 
                    placeholder="Enter glossary name" 
                    value={editGlossary.name} 
                    onChange={(e) => setEditGlossary({...editGlossary, name: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description (Optional)</Label>
                  <Textarea 
                    id="edit-description" 
                    placeholder="Enter glossary description" 
                    value={editGlossary.description} 
                    onChange={(e) => setEditGlossary({...editGlossary, description: e.target.value})} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleUpdateGlossary} 
                  disabled={isSubmitting || !editGlossary.name.trim()}
                  className="bg-techlex-blue"
                >
                  {isSubmitting ? "Updating..." : "Update Glossary"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Edit Term Dialog */}
          <Dialog open={editTermOpen} onOpenChange={setEditTermOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Term</DialogTitle>
                <DialogDescription>
                  Update term details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-term">Term</Label>
                  <Input 
                    id="edit-term" 
                    placeholder="Enter term" 
                    value={editTerm.term} 
                    onChange={(e) => setEditTerm({...editTerm, term: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-definition">Definition</Label>
                  <Textarea 
                    id="edit-definition" 
                    placeholder="Enter definition" 
                    value={editTerm.definition} 
                    onChange={(e) => setEditTerm({...editTerm, definition: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category (Optional)</Label>
                  <Input 
                    id="edit-category" 
                    placeholder="Enter category" 
                    value={editTerm.category} 
                    onChange={(e) => setEditTerm({...editTerm, category: e.target.value})} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleUpdateTerm} 
                  disabled={isSubmitting || !editTerm.term.trim() || !editTerm.definition.trim()}
                  className="bg-techlex-blue"
                >
                  {isSubmitting ? "Updating..." : "Update Term"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default GlossaryPanel;

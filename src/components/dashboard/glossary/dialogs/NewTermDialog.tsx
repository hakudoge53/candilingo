
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface NewTermDialogProps {
  isSubmitting: boolean;
  onAddTerm: (term: string, definition: string, category: string) => Promise<void>;
}

const NewTermDialog: React.FC<NewTermDialogProps> = ({
  isSubmitting,
  onAddTerm
}) => {
  const [newTerm, setNewTerm] = useState({
    term: '',
    definition: '',
    category: ''
  });

  const handleAddTerm = async () => {
    if (!newTerm.term.trim() || !newTerm.definition.trim()) return;
    await onAddTerm(newTerm.term, newTerm.definition, newTerm.category);
    setNewTerm({
      term: '',
      definition: '',
      category: ''
    });
  };

  return (
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
  );
};

export default NewTermDialog;


import React, { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GlossaryTerm } from '@/types/organization';

interface EditTermDialogProps {
  term: GlossaryTerm;
  isSubmitting: boolean;
  onUpdateTerm: (termId: string, term: string, definition: string, category: string) => Promise<void>;
}

const EditTermDialog: React.FC<EditTermDialogProps> = ({
  term,
  isSubmitting,
  onUpdateTerm
}) => {
  const [editTerm, setEditTerm] = useState({
    id: '',
    term: '',
    definition: '',
    category: ''
  });

  useEffect(() => {
    if (term) {
      setEditTerm({
        id: term.id,
        term: term.term,
        definition: term.definition,
        category: term.category || ''
      });
    }
  }, [term]);

  const handleUpdateTerm = async () => {
    if (!editTerm.term.trim() || !editTerm.definition.trim() || !editTerm.id) return;
    await onUpdateTerm(editTerm.id, editTerm.term, editTerm.definition, editTerm.category);
  };

  return (
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
  );
};

export default EditTermDialog;


import React, { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Glossary } from '@/types/organization';

interface EditGlossaryDialogProps {
  glossary: Glossary;
  isSubmitting: boolean;
  onUpdateGlossary: (glossaryId: string, name: string, description: string) => Promise<void>;
}

const EditGlossaryDialog: React.FC<EditGlossaryDialogProps> = ({
  glossary,
  isSubmitting,
  onUpdateGlossary
}) => {
  const [editGlossary, setEditGlossary] = useState({
    id: '',
    name: '',
    description: ''
  });

  useEffect(() => {
    if (glossary) {
      setEditGlossary({
        id: glossary.id,
        name: glossary.name,
        description: glossary.description || ''
      });
    }
  }, [glossary]);

  const handleUpdateGlossary = async () => {
    if (!editGlossary.name.trim() || !editGlossary.id) return;
    await onUpdateGlossary(editGlossary.id, editGlossary.name, editGlossary.description);
  };

  return (
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
  );
};

export default EditGlossaryDialog;

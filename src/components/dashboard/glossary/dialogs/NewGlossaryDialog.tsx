
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface NewGlossaryDialogProps {
  isSubmitting: boolean;
  onCreateGlossary: (name: string, description: string) => Promise<void>;
}

const NewGlossaryDialog: React.FC<NewGlossaryDialogProps> = ({
  isSubmitting,
  onCreateGlossary
}) => {
  const [newGlossary, setNewGlossary] = useState({
    name: '',
    description: ''
  });

  const handleCreateGlossary = async () => {
    if (!newGlossary.name.trim()) return;
    await onCreateGlossary(newGlossary.name, newGlossary.description);
    setNewGlossary({
      name: '',
      description: ''
    });
  };

  return (
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
  );
};

export default NewGlossaryDialog;

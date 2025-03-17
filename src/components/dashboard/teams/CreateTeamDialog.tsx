
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (name: string, description: string) => Promise<void>;
  isSubmitting: boolean;
}

const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({
  isOpen,
  onClose,
  onCreateTeam,
  isSubmitting
}) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleSubmit = async () => {
    await onCreateTeam(teamName, teamDescription);
    // Reset form fields on successful submission (handled by parent)
  };

  const handleClose = () => {
    setTeamName('');
    setTeamDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Teams help you organize members within your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input 
              id="name" 
              placeholder="Enter team name" 
              value={teamName} 
              onChange={(e) => setTeamName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Enter team description" 
              value={teamDescription} 
              onChange={(e) => setTeamDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !teamName.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;

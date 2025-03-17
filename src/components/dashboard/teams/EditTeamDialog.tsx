
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Team } from '@/hooks/organization/types';

interface EditTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTeam: (name: string, description: string) => Promise<void>;
  isSubmitting: boolean;
  team: Team | null;
}

const EditTeamDialog: React.FC<EditTeamDialogProps> = ({
  isOpen,
  onClose,
  onUpdateTeam,
  isSubmitting,
  team
}) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  // Set form values when team changes
  useEffect(() => {
    if (team) {
      setTeamName(team.name);
      setTeamDescription(team.description || '');
    }
  }, [team]);

  const handleSubmit = async () => {
    await onUpdateTeam(teamName, teamDescription);
    // Reset and close are handled by parent component
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
          <DialogTitle>Edit Team</DialogTitle>
          <DialogDescription>
            Update team information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Team Name</Label>
            <Input 
              id="edit-name" 
              placeholder="Enter team name" 
              value={teamName} 
              onChange={(e) => setTeamName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description (optional)</Label>
            <Textarea 
              id="edit-description" 
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
            {isSubmitting ? "Updating..." : "Update Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamDialog;

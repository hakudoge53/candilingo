
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface DialogActionsProps {
  onClose: () => void;
  onAddMember: () => void;
  isSubmitting: boolean;
  isDisabled: boolean;
}

const DialogActions: React.FC<DialogActionsProps> = ({
  onClose,
  onAddMember,
  isSubmitting,
  isDisabled
}) => {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        onClick={onAddMember} 
        disabled={isSubmitting || isDisabled}
      >
        {isSubmitting ? "Adding..." : "Add to Team"}
      </Button>
    </DialogFooter>
  );
};

export default DialogActions;


import React from 'react';
import { OrganizationMember, UserRole, ROLE_LABELS } from '@/types/organization';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface DeleteOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteOrganizationDialog: React.FC<DeleteOrganizationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isDeleting
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Organization</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this organization? This action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Organization"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface RemoveMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isRemoving: boolean;
  memberName: string;
}

export const RemoveMemberDialog: React.FC<RemoveMemberDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isRemoving,
  memberName
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {memberName} from this organization?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isRemoving}>
            {isRemoving ? "Removing..." : "Remove Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isChanging: boolean;
  memberName: string;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const ChangeRoleDialog: React.FC<ChangeRoleDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isChanging,
  memberName,
  role,
  onRoleChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Member Role</DialogTitle>
          <DialogDescription>
            Change the role of {memberName} to {ROLE_LABELS[role]}?
          </DialogDescription>
        </DialogHeader>
        
        <Select onValueChange={(value) => onRoleChange(value as UserRole)} defaultValue={role}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">{ROLE_LABELS['owner']}</SelectItem>
            <SelectItem value="manager">{ROLE_LABELS['manager']}</SelectItem>
            <SelectItem value="team_lead">{ROLE_LABELS['team_lead']}</SelectItem>
            <SelectItem value="employee">{ROLE_LABELS['employee']}</SelectItem>
          </SelectContent>
        </Select>
        
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onConfirm} disabled={isChanging}>
            {isChanging ? "Changing..." : "Change Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface RevokeInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isRevoking: boolean;
}

export const RevokeInviteDialog: React.FC<RevokeInviteDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isRevoking
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke Invitation</DialogTitle>
          <DialogDescription>
            Are you sure you want to revoke this invitation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isRevoking}>
            {isRevoking ? "Revoking..." : "Revoke Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

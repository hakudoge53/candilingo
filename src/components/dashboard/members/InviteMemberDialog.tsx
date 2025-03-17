
import React from 'react';
import { Organization, UserRole } from '@/types/organization';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import InviteMemberForm from '@/components/customer-portal/sections/organization/InviteMemberForm';

interface InviteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization | null;
  onMemberInvited: (values: { email: string; name: string; role: UserRole }) => Promise<any>;
  isLoading: boolean;
}

const InviteMemberDialog: React.FC<InviteMemberDialogProps> = ({ 
  isOpen, 
  onClose, 
  organization, 
  onMemberInvited, 
  isLoading 
}) => {
  const handleInvite = async (values: { email: string; name: string; role: UserRole }) => {
    if (!organization) {
      return;
    }

    await onMemberInvited(values);
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite New Member</DialogTitle>
        <DialogDescription>
          Invite a new member to your organization.
        </DialogDescription>
      </DialogHeader>
      <InviteMemberForm onInvite={handleInvite} isLoading={isLoading} />
    </>
  );
};

export default InviteMemberDialog;

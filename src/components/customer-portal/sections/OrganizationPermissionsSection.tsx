
import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { useAuth } from '@/hooks/useAuth';
import { OrganizationMember, UserRole } from '@/types/organization';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useOrganizationData } from './organization/useOrganizationData';
import { useOrganizationActions } from './organization/OrganizationActions';
import NoOrganizationCard from './organization/NoOrganizationCard';
import OrganizationCard from './organization/OrganizationCard';
import DangerZoneCard from './organization/DangerZoneCard';
import { DeleteOrganizationDialog, RemoveMemberDialog, ChangeRoleDialog, RevokeInviteDialog } from './organization/ConfirmationDialogs';

interface OrganizationPermissionsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const OrganizationPermissionsSection: React.FC<OrganizationPermissionsSectionProps> = ({ user, setLocalLoading }) => {
  const { activeUser } = useAuth();
  const currentUserId = activeUser?.id || '';

  // Get organization data
  const { organization, members, invites, isLoading, setMembers, setInvites } = useOrganizationData(user);

  // Dialog state
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] = useState(false);
  const [isRoleChangeConfirmationOpen, setIsRoleChangeConfirmationOpen] = useState(false);
  const [isRevokeConfirmationOpen, setIsRevokeConfirmationOpen] = useState(false);
  
  // Selected items state
  const [memberToRemove, setMemberToRemove] = useState<OrganizationMember | null>(null);
  const [memberToChangeRole, setMemberToChangeRole] = useState<OrganizationMember | null>(null);
  const [inviteToRevoke, setInviteToRevoke] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('employee');

  // Get organization actions
  const {
    handleInviteMember,
    handleRevokeInvite,
    handleChangeRole,
    handleRemoveMember,
    handleDeleteOrganization,
    isDeletingOrg,
    isRemovingMember,
    isChangingRole,
    isRevokingInvite,
    isSubmittingInvite
  } = useOrganizationActions({ organization, setMembers, setInvites });

  // Handle member removal
  const openRemoveMemberDialog = (member: OrganizationMember) => {
    setMemberToRemove(member);
    setIsRemoveConfirmationOpen(true);
  };

  const confirmRemoveMember = async () => {
    if (memberToRemove) {
      await handleRemoveMember(memberToRemove.id);
      setIsRemoveConfirmationOpen(false);
      setMemberToRemove(null);
    }
  };

  // Handle role change
  const openChangeRoleDialog = (member: OrganizationMember) => {
    setMemberToChangeRole(member);
    setNewRole(member.role);
    setIsRoleChangeConfirmationOpen(true);
  };

  const confirmChangeRole = async () => {
    if (memberToChangeRole) {
      await handleChangeRole(memberToChangeRole.id, newRole);
      setIsRoleChangeConfirmationOpen(false);
      setMemberToChangeRole(null);
    }
  };

  // Handle invite revocation
  const openRevokeInviteDialog = (inviteId: string) => {
    setInviteToRevoke(inviteId);
    setIsRevokeConfirmationOpen(true);
  };

  const confirmRevokeInvite = async () => {
    if (inviteToRevoke) {
      await handleRevokeInvite(inviteToRevoke);
      setIsRevokeConfirmationOpen(false);
      setInviteToRevoke(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading organization data..." />;
  }

  if (!organization) {
    return <NoOrganizationCard />;
  }

  return (
    <div className="space-y-6">
      <OrganizationCard
        organization={organization}
        members={members}
        invites={invites}
        currentUserId={currentUserId}
        onInviteMember={handleInviteMember}
        onChangeRole={openChangeRoleDialog}
        onRemoveMember={openRemoveMemberDialog}
        onRevokeInvite={openRevokeInviteDialog}
        isSubmittingInvite={isSubmittingInvite}
      />
      
      <DangerZoneCard onDeleteClick={() => setIsDeleteConfirmationOpen(true)} />
      
      {/* Confirmation Dialogs */}
      <DeleteOrganizationDialog
        open={isDeleteConfirmationOpen}
        onOpenChange={setIsDeleteConfirmationOpen}
        onConfirm={handleDeleteOrganization}
        isDeleting={isDeletingOrg}
      />
      
      <RemoveMemberDialog
        open={isRemoveConfirmationOpen}
        onOpenChange={setIsRemoveConfirmationOpen}
        onConfirm={confirmRemoveMember}
        isRemoving={isRemovingMember}
        memberName={memberToRemove?.user?.name || memberToRemove?.invited_name || memberToRemove?.user_id || ''}
      />
      
      <ChangeRoleDialog
        open={isRoleChangeConfirmationOpen}
        onOpenChange={setIsRoleChangeConfirmationOpen}
        onConfirm={confirmChangeRole}
        isChanging={isChangingRole}
        memberName={memberToChangeRole?.user?.name || memberToChangeRole?.invited_name || memberToChangeRole?.user_id || ''}
        role={newRole}
        onRoleChange={setNewRole}
      />
      
      <RevokeInviteDialog
        open={isRevokeConfirmationOpen}
        onOpenChange={setIsRevokeConfirmationOpen}
        onConfirm={confirmRevokeInvite}
        isRevoking={isRevokingInvite}
      />
    </div>
  );
};

export default OrganizationPermissionsSection;

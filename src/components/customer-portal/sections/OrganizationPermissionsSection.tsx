
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { toast } from 'sonner';
import { useOrganizationOperations } from './organization/useOrganizationOperations';
import OrganizationContent from './organization/OrganizationContent';
import { OrganizationMember } from '@/types/organization';

interface OrganizationPermissionsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const OrganizationPermissionsSection: React.FC<OrganizationPermissionsSectionProps> = ({
  user,
  setLocalLoading
}) => {
  const [activeTab, setActiveTab] = useState('members');
  
  const {
    organizations,
    activeOrganization,
    members,
    isLoading,
    error,
    handleCreateOrganization,
    handleUpdateOrganization,
    handleDeleteOrganization,
    handleLeaveOrganization,
    handleInviteMember,
    handleRoleChange,
    handleRemoveMember,
    handleRevokeInvitation
  } = useOrganizationOperations(setLocalLoading);
  
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);
  
  // Sort members into active members and pending invitations
  const activeMembers = members.filter(m => m.status === 'active');
  const pendingInvites = members.filter(m => m.status === 'pending');
  
  return (
    <OrganizationContent
      user={user}
      activeOrganization={activeOrganization}
      members={members}
      activeMembers={activeMembers}
      pendingInvites={pendingInvites}
      isLoading={isLoading}
      error={error}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleCreateOrganization={handleCreateOrganization}
      handleUpdateOrganization={handleUpdateOrganization}
      handleDeleteOrganization={handleDeleteOrganization}
      handleLeaveOrganization={handleLeaveOrganization}
      handleInviteMember={handleInviteMember}
      handleRoleChange={handleRoleChange}
      handleRemoveMember={handleRemoveMember}
      handleRevokeInvitation={handleRevokeInvitation}
    />
  );
};

export default OrganizationPermissionsSection;

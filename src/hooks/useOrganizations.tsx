
import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import { useOrganizationList, UseOrganizationListReturn } from './organization/useOrganizationList';
import { useOrganizationMembers, UseOrganizationMembersReturn } from './organization/useOrganizationMembers';

export interface UseOrganizationsReturn {
  organizations: Organization[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  members: OrganizationMember[];
  createOrganization: (name: string) => Promise<Organization | null>;
  inviteMember: (organizationId: string, email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refetchMembers: () => void;
}

// This is a facade hook that combines the functionality of the more focused hooks
// while maintaining the same API for backward compatibility
export const useOrganizations = (): UseOrganizationsReturn => {
  const {
    organizations,
    activeOrganization,
    setActiveOrganization,
    createOrganization,
    isLoading: isOrgLoading,
    error: orgError,
    refetch: refetchOrganizations
  } = useOrganizationList();

  const {
    members,
    inviteMember: inviteMemberToOrg,
    updateMemberRole,
    removeMember,
    isLoading: isMembersLoading,
    error: membersError,
    refetchMembers
  } = useOrganizationMembers(activeOrganization?.id);

  // Combine loading states
  const isLoading = isOrgLoading || isMembersLoading;
  
  // Combine errors
  const error = orgError || membersError;
  
  // Wrapper for inviteMember to maintain the same API
  const inviteMember = async (organizationId: string, email: string, name: string, role: UserRole) => {
    return await inviteMemberToOrg(email, name, role);
  };

  return {
    organizations,
    activeOrganization,
    setActiveOrganization,
    members,
    createOrganization,
    inviteMember,
    updateMemberRole,
    removeMember,
    isLoading,
    error,
    refetch: refetchOrganizations,
    refetchMembers: () => activeOrganization && refetchMembers()
  };
};

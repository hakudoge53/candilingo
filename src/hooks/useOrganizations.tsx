
import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import { useOrganizationList, UseOrganizationListReturn } from './organization/useOrganizationList';
import { useOrganizationMembers, UseOrganizationMembersReturn } from './organization/useOrganizationMembers';

export interface UseOrganizationsReturn {
  organizations: Organization[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  members: OrganizationMember[];
  createOrganization: (name: string) => Promise<Organization | null>;
  inviteMember: (email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refetchMembers: () => void;
}

// This is a facade hook that combines the functionality of the more focused hooks
export const useOrganizations = (): UseOrganizationsReturn => {
  const {
    organizations,
    activeOrganization,
    setActiveOrganization,
    createNewOrganization, // Note: renamed from createOrganization to match the implementation
    organizationsLoading: isOrgLoading,
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
  
  // Use only member errors for now
  const error = membersError;
  
  // Simplified inviteMember to use the active organization
  const inviteMember = async (email: string, name: string, role: UserRole) => {
    return await inviteMemberToOrg(email, name, role);
  };

  // Create a refetch function that does nothing for now
  const refetch = async () => {
    // This would normally refetch organizations, but we don't have that function yet
    // Could be implemented in useOrganizationList
  };

  // Rename createNewOrganization to match interface
  const createOrganization = createNewOrganization;

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
    refetch,
    refetchMembers
  };
};


import { OrganizationMember, UserRole } from '@/types/organization';
import { useMembersFetch, UseMembersFetchReturn } from './members/useMembersFetch';
import { useMemberInvite, UseMemberInviteReturn } from './members/useMemberInvite';
import { useMemberRoleUpdate, UseMemberRoleUpdateReturn } from './members/useMemberRoleUpdate';
import { useMemberRemoval, UseMemberRemovalReturn } from './members/useMemberRemoval';

export interface UseOrganizationMembersReturn {
  members: OrganizationMember[];
  inviteMember: (email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetchMembers: () => Promise<void>;
}

export const useOrganizationMembers = (organizationId: string | undefined): UseOrganizationMembersReturn => {
  // Use the member fetching hook
  const { 
    members, 
    isLoading: isFetchLoading, 
    error, 
    refetchMembers,
    setMembers 
  } = useMembersFetch(organizationId);
  
  // Use the member invite hook
  const { 
    inviteMember: inviteMemberToOrg, 
    isLoading: isInviteLoading 
  } = useMemberInvite({
    organizationId,
    setMembers
  });
  
  // Use the role update hook
  const { 
    updateMemberRole, 
    isLoading: isRoleUpdateLoading 
  } = useMemberRoleUpdate({
    setMembers
  });
  
  // Use the member removal hook
  const { 
    removeMember, 
    isLoading: isRemovalLoading 
  } = useMemberRemoval({
    setMembers
  });

  // Combine loading states
  const isLoading = isFetchLoading || isInviteLoading || isRoleUpdateLoading || isRemovalLoading;

  // Wrapper function to maintain the same API
  const inviteMember = async (email: string, name: string, role: UserRole) => {
    return await inviteMemberToOrg(email, name, role);
  };

  return {
    members,
    inviteMember,
    updateMemberRole,
    removeMember,
    isLoading,
    error,
    refetchMembers
  };
};

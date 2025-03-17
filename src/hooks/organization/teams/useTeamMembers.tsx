import { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { useTeamMembersFetch } from './teamMembers/useTeamMembersFetch';
import { useTeamMemberAdd } from './teamMembers/useTeamMemberAdd';
import { useTeamMemberUpdate } from './teamMembers/useTeamMemberUpdate';
import { useTeamMemberRemove } from './teamMembers/useTeamMemberRemove';

export interface UseTeamMembersReturn {
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: string | null;
  fetchTeamMembers: (teamId: string) => Promise<void>;
  addMemberToTeam: (teamId: string, memberId: string, isManager: boolean) => Promise<boolean>;
  updateTeamMember: (id: string, isManager: boolean) => Promise<boolean>;
  removeFromTeam: (id: string) => Promise<boolean>;
}

/**
 * Hook for managing team members
 * This is a composite hook that combines all team member operations
 */
export const useTeamMembers = (): UseTeamMembersReturn => {
  // Use individual hooks for each operation
  const { teamMembers, isLoading: isFetchLoading, error: fetchError, fetchTeamMembers } = useTeamMembersFetch();
  const { addMemberToTeam: addMember, isLoading: isAddLoading, error: addError } = useTeamMemberAdd();
  const { updateTeamMember: updateMember, isLoading: isUpdateLoading, error: updateError } = useTeamMemberUpdate();
  const { removeFromTeam: removeMember, isLoading: isRemoveLoading, error: removeError } = useTeamMemberRemove();
  
  // Combined loading and error states
  const isLoading = isFetchLoading || isAddLoading || isUpdateLoading || isRemoveLoading;
  const [error, setError] = useState<string | null>(null);

  // Update error state when any of the individual errors change
  useEffect(() => {
    const currentError = fetchError || addError || updateError || removeError;
    setError(currentError);
  }, [fetchError, addError, updateError, removeError]);

  // Add a member and then refresh the team members list
  const addMemberToTeam = async (teamId: string, memberId: string, isManager: boolean): Promise<boolean> => {
    const success = await addMember(teamId, memberId, isManager);
    if (success) {
      await fetchTeamMembers(teamId);
    }
    return success;
  };

  // Update a member and then refresh the team members list
  const updateTeamMember = async (id: string, isManager: boolean): Promise<boolean> => {
    const success = await updateMember(id, isManager);
    
    // If successful, update the local state instead of refetching
    if (success) {
      // No need to fetch again, we can update the state directly
      // This is handled by the parent component that uses this hook
    }
    return success;
  };

  // Remove a member and then refresh the team members list
  const removeFromTeam = async (id: string): Promise<boolean> => {
    const success = await removeMember(id);
    
    // If successful, update the local state instead of refetching
    if (success) {
      // No need to fetch again, we can update the state directly
      // This is handled by the parent component that uses this hook
    }
    return success;
  };

  return {
    teamMembers,
    isLoading,
    error,
    fetchTeamMembers,
    addMemberToTeam,
    updateTeamMember,
    removeFromTeam
  };
};

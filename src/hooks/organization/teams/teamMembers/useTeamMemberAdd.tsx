
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { TeamMember, SelectQueryError, UserData } from '../../types';
import { OrganizationMember, UserRole, MemberStatus } from '@/types/organization';
import { toast } from "sonner";

export interface UseTeamMemberAddReturn {
  addMemberToTeam: (teamId: string, memberId: string, isManager: boolean) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for adding a member to a team
 */
export const useTeamMemberAdd = (): UseTeamMemberAddReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Add a member to a team
   */
  const addMemberToTeam = async (
    teamId: string, 
    memberId: string, 
    isManager: boolean
  ): Promise<boolean> => {
    if (!teamId || !memberId) {
      toast.error('Team and member are required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if member is already in the team
      const { data: existingMember, error: checkError } = await supabase
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('member_id', memberId)
        .single();

      if (checkError && !checkError.message.includes('No rows found')) {
        throw checkError;
      }

      if (existingMember) {
        toast.error('Member is already in this team');
        setIsLoading(false);
        return false;
      }

      // Add member to team
      const { error } = await supabase
        .from('team_members')
        .insert([
          { 
            team_id: teamId, 
            member_id: memberId,
            is_team_manager: isManager
          }
        ]);

      if (error) throw error;
      
      toast.success('Member added to team successfully');
      return true;
    } catch (err: any) {
      console.error('Error adding member to team:', err);
      setError(err.message);
      toast.error('Failed to add member to team');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addMemberToTeam,
    isLoading,
    error
  };
};

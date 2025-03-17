
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { TeamMember, SelectQueryError, UserData } from '../../types';
import { OrganizationMember, UserRole, MemberStatus } from '@/types/organization';
import { toast } from "sonner";

export interface UseTeamMembersFetchReturn {
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: string | null;
  fetchTeamMembers: (teamId: string) => Promise<void>;
}

/**
 * Hook for fetching team members
 */
export const useTeamMembersFetch = (): UseTeamMembersFetchReturn => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch members for a specific team
   */
  const fetchTeamMembers = async (teamId: string): Promise<void> => {
    if (!teamId) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          member:organization_members(
            *,
            user:profiles(id, name, email, avatar_url)
          )
        `)
        .eq('team_id', teamId);

      if (error) throw error;

      // Transform the data to match the expected format with safer type handling
      const transformedMembers: TeamMember[] = data.map(item => {
        // Handle case when member is present
        if (item.member) {
          // Handle potential error in user data
          let userObject: UserData | SelectQueryError | null = item.member.user;
          
          // If user is an error or null, create a fallback user object
          if (!userObject || (typeof userObject === 'object' && 'error' in userObject)) {
            userObject = {
              name: item.member.invited_name || 'Unknown',
              email: item.member.invited_email || 'No email',
              avatar_url: null
            } as UserData;
          }

          // Create a properly typed member object
          const memberWithUserData = {
            ...item.member,
            status: item.member.status as MemberStatus,
            role: item.member.role as UserRole,
            user: userObject as UserData
          } as OrganizationMember;
          
          return {
            id: item.id,
            team_id: item.team_id,
            member_id: item.member_id,
            is_team_manager: item.is_team_manager,
            created_at: item.created_at,
            updated_at: item.updated_at,
            member: memberWithUserData
          } as TeamMember;
        }
        
        // If no member data, return as is
        return {
          id: item.id,
          team_id: item.team_id,
          member_id: item.member_id,
          is_team_manager: item.is_team_manager,
          created_at: item.created_at,
          updated_at: item.updated_at
        } as TeamMember;
      });

      setTeamMembers(transformedMembers);
    } catch (err: any) {
      console.error('Error fetching team members:', err);
      setError(err.message);
      toast.error('Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teamMembers,
    isLoading,
    error,
    fetchTeamMembers
  };
};

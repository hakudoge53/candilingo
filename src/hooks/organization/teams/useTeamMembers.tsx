
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { TeamMember, SelectQueryError, UserData } from '../types';
import { OrganizationMember, UserRole, MemberStatus } from '@/types/organization';
import { toast } from "sonner";

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
 */
export const useTeamMembers = (): UseTeamMembersReturn => {
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
      const { data, error } = await supabase
        .from('team_members')
        .insert([
          { 
            team_id: teamId, 
            member_id: memberId,
            is_team_manager: isManager
          }
        ])
        .select(`
          *,
          member:organization_members(
            *,
            user:profiles(id, name, email, avatar_url)
          )
        `)
        .single();

      if (error) throw error;

      // Handle case when member data is available
      if (data.member) {
        // Handle potential error in user data
        let userObject: UserData | SelectQueryError | null = data.member.user;
        
        // If user is an error or null, create a fallback user object
        if (!userObject || (typeof userObject === 'object' && 'error' in userObject)) {
          userObject = {
            name: data.member.invited_name || 'Unknown',
            email: data.member.invited_email || 'No email',
            avatar_url: null
          } as UserData;
        }

        // Create a properly typed member object
        const memberWithUserData = {
          ...data.member,
          status: data.member.status as MemberStatus,
          role: data.member.role as UserRole,
          user: userObject as UserData
        } as OrganizationMember;
        
        const newTeamMember: TeamMember = {
          id: data.id,
          team_id: data.team_id,
          member_id: data.member_id,
          is_team_manager: data.is_team_manager,
          created_at: data.created_at,
          updated_at: data.updated_at,
          member: memberWithUserData
        };
        
        setTeamMembers(prev => [...prev, newTeamMember]);
      } else {
        // If no member data, add as is
        setTeamMembers(prev => [
          ...prev, 
          {
            id: data.id,
            team_id: data.team_id,
            member_id: data.member_id,
            is_team_manager: data.is_team_manager,
            created_at: data.created_at,
            updated_at: data.updated_at
          } as TeamMember
        ]);
      }
      
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

  /**
   * Update a team member (change manager status)
   */
  const updateTeamMember = async (
    id: string, 
    isManager: boolean
  ): Promise<boolean> => {
    if (!id) {
      toast.error('Team member id is required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('team_members')
        .update({ 
          is_team_manager: isManager,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);

      if (error) throw error;

      setTeamMembers(prev => 
        prev.map(member => member.id === id ? { ...member, is_team_manager: isManager } : member)
      );
      
      toast.success('Team member updated successfully');
      return true;
    } catch (err: any) {
      console.error('Error updating team member:', err);
      setError(err.message);
      toast.error('Failed to update team member');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove a member from a team
   */
  const removeFromTeam = async (id: string): Promise<boolean> => {
    if (!id) {
      toast.error('Team member id is required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(member => member.id !== id));
      toast.success('Member removed from team successfully');
      return true;
    } catch (err: any) {
      console.error('Error removing team member:', err);
      setError(err.message);
      toast.error('Failed to remove member from team');
      return false;
    } finally {
      setIsLoading(false);
    }
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

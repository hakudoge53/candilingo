
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { TeamMember } from '../types';
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

      // Transform the data to match the expected format
      const transformedMembers: TeamMember[] = data.map(item => {
        // Convert raw member status string to MemberStatus type
        if (item.member) {
          const memberWithStatus = {
            ...item.member,
            status: item.member.status as MemberStatus,
            role: item.member.role as UserRole
          };
          
          return {
            id: item.id,
            team_id: item.team_id,
            member_id: item.member_id,
            is_team_manager: item.is_team_manager,
            created_at: item.created_at,
            updated_at: item.updated_at,
            member: memberWithStatus
          };
        }
        
        return item as TeamMember;
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

      // Transform data to include the correct types before adding to state
      if (data.member) {
        const newTeamMember: TeamMember = {
          ...data,
          member: {
            ...data.member,
            status: data.member.status as MemberStatus,
            role: data.member.role as UserRole
          }
        };
        
        setTeamMembers(prev => [...prev, newTeamMember]);
      } else {
        setTeamMembers(prev => [...prev, data as TeamMember]);
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

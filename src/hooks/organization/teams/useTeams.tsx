
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/hooks/auth/useAuth';
import { Team } from '../types';
import { toast } from "sonner";

export interface UseTeamsReturn {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  fetchTeams: (organizationId: string) => Promise<void>;
  createTeam: (name: string, description: string, organizationId: string) => Promise<Team | null>;
  updateTeam: (id: string, name: string, description: string) => Promise<boolean>;
  deleteTeam: (id: string) => Promise<boolean>;
}

/**
 * Hook for managing teams within an organization
 */
export const useTeams = (): UseTeamsReturn => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch teams for a specific organization
   */
  const fetchTeams = async (organizationId: string): Promise<void> => {
    if (!organizationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members:team_members(count)
        `)
        .eq('organization_id', organizationId)
        .order('name');

      if (error) throw error;

      // Process data to include member count
      const processedTeams: Team[] = (data || []).map(team => {
        const memberCount = team.team_members?.[0]?.count || 0;
        return {
          ...team,
          member_count: memberCount
        };
      });

      setTeams(processedTeams);
    } catch (err: any) {
      console.error('Error fetching teams:', err);
      setError(err.message);
      toast.error('Failed to load teams');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Create a new team
   */
  const createTeam = async (
    name: string, 
    description: string, 
    organizationId: string
  ): Promise<Team | null> => {
    if (!organizationId || !name.trim()) {
      toast.error('Team name and organization are required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([
          { 
            name, 
            description,
            organization_id: organizationId
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const newTeam: Team = {
        ...data,
        member_count: 0
      };
      
      setTeams(prev => [...prev, newTeam]);
      toast.success('Team created successfully');
      return newTeam;
    } catch (err: any) {
      console.error('Error creating team:', err);
      setError(err.message);
      toast.error('Failed to create team');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update an existing team
   */
  const updateTeam = async (
    id: string, 
    name: string, 
    description: string
  ): Promise<boolean> => {
    if (!id || !name.trim()) {
      toast.error('Team id and name are required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('teams')
        .update({ name, description, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setTeams(prev => 
        prev.map(team => team.id === id ? { ...team, name, description } : team)
      );
      
      toast.success('Team updated successfully');
      return true;
    } catch (err: any) {
      console.error('Error updating team:', err);
      setError(err.message);
      toast.error('Failed to update team');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a team
   */
  const deleteTeam = async (id: string): Promise<boolean> => {
    if (!id) {
      toast.error('Team id is required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTeams(prev => prev.filter(team => team.id !== id));
      toast.success('Team deleted successfully');
      return true;
    } catch (err: any) {
      console.error('Error deleting team:', err);
      setError(err.message);
      toast.error('Failed to delete team');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teams,
    isLoading,
    error,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam
  };
};

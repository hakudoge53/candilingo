
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UseTeamMemberUpdateReturn {
  updateTeamMember: (id: string, isManager: boolean) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for updating a team member
 */
export const useTeamMemberUpdate = (): UseTeamMemberUpdateReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    updateTeamMember,
    isLoading,
    error
  };
};

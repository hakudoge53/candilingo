
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UseTeamMemberRemoveReturn {
  removeFromTeam: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for removing a member from a team
 */
export const useTeamMemberRemove = (): UseTeamMemberRemoveReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    removeFromTeam,
    isLoading,
    error
  };
};

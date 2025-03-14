
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRole } from '@/types/organization';
import { useAuth } from '../../useAuth';

export const useMemberRoleUpdate = (
  setMembers: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Update member's role
  const updateMemberRole = async (memberId: string, role: UserRole) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ role })
        .eq('id', memberId);
      
      if (error) throw error;
      
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, role } : member
        )
      );
      
      toast.success("Member role updated");
    } catch (error: any) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member role");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateMemberRole,
    isLoading
  };
};

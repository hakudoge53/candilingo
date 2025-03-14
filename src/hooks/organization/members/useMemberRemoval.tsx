
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember } from '@/types/organization';
import { useAuth } from '../../useAuth';

export interface UseMemberRemovalProps {
  setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>>;
}

export interface UseMemberRemovalReturn {
  removeMember: (memberId: string) => Promise<void>;
  isLoading: boolean;
}

export const useMemberRemoval = ({
  setMembers
}: UseMemberRemovalProps): UseMemberRemovalReturn => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Remove member from organization
  const removeMember = async (memberId: string) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
      setMembers(prev => prev.filter(member => member.id !== memberId));
      
      toast.success("Member removed successfully");
    } catch (error: any) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeMember,
    isLoading
  };
};

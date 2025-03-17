
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember } from '@/types/organization';
import { useAuth } from '../../auth/useAuth';
import { useLicenses } from '../licenses/useLicenses';

export interface UseMemberRemovalProps {
  setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>>;
}

export interface UseMemberRemovalReturn {
  removeMember: (memberId: string, organizationId: string) => Promise<void>;
  isLoading: boolean;
}

export const useMemberRemoval = ({
  setMembers
}: UseMemberRemovalProps): UseMemberRemovalReturn => {
  const { isLoggedIn } = useAuth();
  const { releaseLicense } = useLicenses();
  const [isLoading, setIsLoading] = useState(false);

  // Remove member from organization
  const removeMember = async (memberId: string, organizationId: string) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      // First get the member to check their status
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('*')
        .eq('id', memberId)
        .single();
        
      if (memberError) throw memberError;
      
      // Delete the member record
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
      // Release the license if the member was active
      if (memberData.status === 'active') {
        await releaseLicense(organizationId, memberData.user_id);
      }
      
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

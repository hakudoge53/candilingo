
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRole, OrganizationMember } from '@/types/organization';
import { useAuth } from '../../useAuth';

export interface UseMemberRoleUpdateProps {
  setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>>;
}

export interface UseMemberRoleUpdateReturn {
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  isLoading: boolean;
}

export const useMemberRoleUpdate = ({
  setMembers
}: UseMemberRoleUpdateProps): UseMemberRoleUpdateReturn => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Update member's role
  const updateMemberRole = async (memberId: string, role: UserRole) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      // Create the update object with the role
      const updateData = { role: role as any }; // Cast to any to work around TypeScript issues
      
      const { error } = await supabase
        .from('organization_members')
        .update(updateData)
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

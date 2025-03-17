
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember, UserRole, MemberStatus } from '@/types/organization';
import { useAuth } from '../../useAuth';

export interface UseMemberInviteProps {
  organizationId: string | undefined;
  setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>>;
}

export interface UseMemberInviteReturn {
  inviteMember: (email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  isLoading: boolean;
}

export const useMemberInvite = ({
  organizationId,
  setMembers
}: UseMemberInviteProps): UseMemberInviteReturn => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Invite a new member to organization
  const inviteMember = async (email: string, name: string, role: UserRole) => {
    if (!isLoggedIn || !organizationId) return null;
    
    setIsLoading(true);
    
    try {
      // Generate a random token for the invitation
      const token = Math.random().toString(36).substring(2, 15);
      
      // Create the member data object
      const memberData = {
        organization_id: organizationId,
        user_id: '00000000-0000-0000-0000-000000000000', // Placeholder until user accepts invitation
        invited_email: email,
        invited_name: name,
        role, // Need to cast to any for Supabase
        invitation_token: token,
        status: 'pending'
      };
      
      // Insert the new member
      const { data, error } = await supabase
        .from('organization_members')
        .insert(memberData as any)
        .select()
        .single();
      
      if (error) throw error;
      
      const newMember: OrganizationMember = {
        ...data,
        role: data.role as UserRole,
        status: data.status as MemberStatus
      };
      
      setMembers(prev => [newMember, ...prev]);
      
      toast.success("Invitation sent successfully");
      return newMember;
    } catch (error: any) {
      console.error("Error inviting member:", error);
      toast.error("Failed to send invitation");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inviteMember,
    isLoading
  };
};

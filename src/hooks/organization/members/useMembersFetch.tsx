
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember, MemberStatus, UserRole } from '@/types/organization';
import { useAuth } from '../../useAuth';

interface MemberResponse {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  status: string;
  created_at: string;
  updated_at: string;
  invited_email: string | null;
  invited_name: string | null;
  invitation_token: string | null;
  user: {
    name: string;
    email: string;
    membership_tier?: string;
    status?: string;
  } | null;
}

export interface UseMembersFetchReturn {
  members: OrganizationMember[];
  isLoading: boolean;
  error: string | null;
  refetchMembers: () => Promise<void>;
  setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>>;
}

export const useMembersFetch = (organizationId: string | undefined): UseMembersFetchReturn => {
  const { isLoggedIn } = useAuth();
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch organization members
  const fetchMembers = async () => {
    if (!isLoggedIn || !organizationId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(
            name,
            email,
            membership_tier,
            status
          )
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Safely convert the data to the correct type
      const typedMembers: OrganizationMember[] = (data || []).map(member => {
        // Handle case where user might be an error object or null
        let userObject = null;
        if (member.user && typeof member.user === 'object' && !('error' in member.user)) {
          userObject = member.user;
        }
        
        return {
          id: member.id,
          organization_id: member.organization_id,
          user_id: member.user_id,
          invited_email: member.invited_email,
          invited_name: member.invited_name,
          role: member.role as UserRole,
          status: member.status as MemberStatus,
          created_at: member.created_at,
          updated_at: member.updated_at,
          invitation_token: member.invitation_token,
          user: userObject
        };
      });
      
      setMembers(typedMembers);
    } catch (error: any) {
      console.error("Error fetching members:", error);
      setError(error.message);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch members when organization changes
  useEffect(() => {
    if (organizationId) {
      fetchMembers();
    } else {
      setMembers([]);
    }
  }, [organizationId]);

  return {
    members,
    isLoading,
    error,
    refetchMembers: fetchMembers,
    setMembers
  };
};

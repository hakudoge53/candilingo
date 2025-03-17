
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Organization, OrganizationMember, MemberStatus } from '@/types/organization';
import { getActiveOrganization, setActiveOrganization } from '@/utils/supabaseHelpers';
import { useAuth } from '@/hooks/auth/useAuth';

export interface UseOrganizationReturn {
  activeOrganization: Organization | null;
  members: OrganizationMember[];
  activeMembers: OrganizationMember[];
  pendingInvites: OrganizationMember[];
  isLoading: boolean;
  error: string | null;
  fetchOrganization: (id: string) => Promise<void>;
  setActiveOrg: (org: Organization | null) => Promise<boolean>;
}

export const useOrganization = (): UseOrganizationReturn => {
  const { activeUser } = useAuth();
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch active organization on user change
  useEffect(() => {
    const loadActiveOrganization = async () => {
      if (!activeUser?.id) return;
      
      try {
        const activeOrgId = await getActiveOrganization(activeUser.id);
        if (activeOrgId) {
          await fetchOrganization(activeOrgId);
        }
      } catch (err) {
        console.error("Error loading active organization:", err);
      }
    };
    
    loadActiveOrganization();
  }, [activeUser?.id]);

  // Set active organization in database and state
  const setActiveOrg = async (org: Organization | null): Promise<boolean> => {
    if (!activeUser?.id) {
      toast.error("You must be logged in to set an active organization");
      return false;
    }
    
    try {
      setIsLoading(true);
      const success = await setActiveOrganization(activeUser.id, org?.id || null);
      
      if (success) {
        setActiveOrganization(org);
        if (org) {
          await fetchOrganization(org.id);
          toast.success(`Switched to ${org.name}`);
        } else {
          setMembers([]);
          toast.success("Organization unset");
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error setting active organization:", err);
      toast.error("Failed to set organization");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrganization = useCallback(async (id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);

    try {
      console.log(`Fetching organization with ID: ${id}`);
      
      // Fetch organization details
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single();

      if (orgError) {
        throw orgError;
      }
      
      console.log("Organization data fetched:", orgData);
      
      // Fetch organization members
      const { data: membersData, error: membersError } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(name, email, status, membership_tier, avatar_url)
        `)
        .eq('organization_id', id);

      if (membersError) {
        throw membersError;
      }
      
      console.log("Organization members fetched:", membersData?.length);

      setActiveOrganization(orgData as Organization);
      
      // Properly handle the members data with type casting
      const typedMembers: OrganizationMember[] = (membersData || []).map((member: any) => {
        // Handle case where user might be an error object or null
        let userObject = null;
        if (member.user && typeof member.user === 'object' && !('error' in member.user)) {
          userObject = {
            name: member.user.name,
            email: member.user.email,
            status: member.user.status,
            membership_tier: member.user.membership_tier,
            avatar_url: member.user.avatar_url
          };
        }
        
        return {
          id: member.id,
          organization_id: member.organization_id,
          user_id: member.user_id,
          invited_email: member.invited_email,
          invited_name: member.invited_name,
          role: member.role,
          status: member.status,
          created_at: member.created_at || '',
          updated_at: member.updated_at || '',
          invitation_token: member.invitation_token,
          user: userObject
        } as OrganizationMember;
      });
      
      setMembers(typedMembers);
    } catch (err: any) {
      console.error('Error fetching organization:', err);
      setError(err.message);
      toast.error('Failed to load organization data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter members by status - using case-insensitive comparison
  const activeMembers = members.filter(
    member => member.status?.toLowerCase() === 'active'
  );
  
  const pendingInvites = members.filter(
    member => member.status?.toLowerCase() === 'pending'
  );

  return {
    activeOrganization,
    members,
    activeMembers,
    pendingInvites,
    isLoading,
    error,
    fetchOrganization,
    setActiveOrg
  };
};

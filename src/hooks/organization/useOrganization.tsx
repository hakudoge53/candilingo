
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Organization, OrganizationMember, MemberStatus } from '@/types/organization';

export interface UseOrganizationReturn {
  activeOrganization: Organization | null;
  members: OrganizationMember[];
  activeMembers: OrganizationMember[];
  pendingInvites: OrganizationMember[];
  isLoading: boolean;
  error: string | null;
  fetchOrganization: (id: string) => Promise<void>;
}

export const useOrganization = (): UseOrganizationReturn => {
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganization = async (id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Fetch organization details
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single();

      if (orgError) throw orgError;
      
      // Fetch organization members
      const { data: membersData, error: membersError } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(name, email, status, membership_tier, avatar_url)
        `)
        .eq('organization_id', id);

      if (membersError) throw membersError;

      setActiveOrganization(orgData as Organization);
      setMembers(membersData as OrganizationMember[]);
    } catch (err: any) {
      console.error('Error fetching organization:', err);
      setError(err.message);
      toast.error('Failed to load organization data');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter members by status
  const activeMembers = members.filter(
    member => member.status === 'active' || member.status === 'Active'
  );
  
  const pendingInvites = members.filter(
    member => member.status === 'pending' || member.status === 'Pending'
  );

  return {
    activeOrganization,
    members,
    activeMembers,
    pendingInvites,
    isLoading,
    error,
    fetchOrganization
  };
};

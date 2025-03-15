
import { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { Organization, OrganizationMember } from '@/types/organization';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { OrganizationInvitation } from './types';

export const useOrganizationData = (user: User) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [invites, setInvites] = useState<OrganizationInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      setIsLoading(true);
      try {
        const { data: memberships, error: membershipError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', user.id)
          .single();
          
        if (membershipError) throw membershipError;
        
        if (!memberships) {
          toast.error("You are not part of any organization");
          return;
        }
        
        const organizationId = memberships.organization_id;
        
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', organizationId)
          .single();
          
        if (orgError) throw orgError;
        setOrganization(orgData);
        
        const { data: membersData, error: membersError } = await supabase
          .from('organization_members')
          .select('*, user:profiles(name, email, membership_tier, status, avatar_url)')
          .eq('organization_id', organizationId);
          
        if (membersError) throw membersError;
        // Cast as OrganizationMember[] to handle the type compatibility
        setMembers(membersData as unknown as OrganizationMember[]);

        const { data: invitesData, error: invitesError } = await supabase
          .from('organization_members')
          .select('id, organization_id, invited_email, invited_name, role, status, created_at')
          .eq('organization_id', organizationId)
          .eq('status', 'pending');
          
        if (invitesError) throw invitesError;
        setInvites(invitesData as unknown as OrganizationInvitation[]);
      } catch (error) {
        console.error("Error fetching organization data:", error);
        toast.error("Failed to load organization data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizationData();
  }, [user.id]);

  return {
    organization,
    members,
    invites,
    isLoading,
    setMembers,
    setInvites
  };
};

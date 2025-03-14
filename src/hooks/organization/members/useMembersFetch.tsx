
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember } from '@/types/organization';
import { useAuth } from '../../useAuth';

export const useMembersFetch = (organizationId: string | undefined) => {
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
      
      setMembers(data);
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

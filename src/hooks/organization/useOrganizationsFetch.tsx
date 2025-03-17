
import { useState, useEffect } from 'react';
import { Organization, UserRole } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { getActiveOrganization } from '@/utils/supabaseHelpers';
import { UseOrganizationsFetchReturn } from './types';

/**
 * Hook to fetch all organizations that the current user has access to
 * 
 * @returns {UseOrganizationsFetchReturn} Object containing organizations and methods to fetch them
 */
export const useOrganizationsFetch = (): UseOrganizationsFetchReturn => {
  const { session, user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganizationId, setActiveOrganizationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load active organization ID when the user changes
  useEffect(() => {
    const loadActiveOrganizationId = async () => {
      if (!user?.id) return;
      
      try {
        const activeOrgId = await getActiveOrganization(user.id);
        setActiveOrganizationId(activeOrgId);
      } catch (err) {
        console.error("Error loading active organization ID:", err);
      }
    };
    
    loadActiveOrganizationId();
  }, [user?.id]);

  /**
   * Fetch organizations from the database
   * 
   * @returns {Promise<void>}
   */
  const fetchOrganizations = async () => {
    if (!session || !user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching organizations for user:", user.id);
      
      // First, get all organizations the user created
      const { data: ownedOrgs, error: ownedError } = await supabase
        .from('organizations')
        .select('*')
        .eq('created_by', user.id);

      if (ownedError) {
        console.error("Error fetching owned organizations:", ownedError);
        setError("Failed to load organizations");
        toast.error("Failed to load organizations");
        return;
      }
      
      console.log("Owned organizations:", ownedOrgs?.length || 0);
      
      // Then, get all organizations the user is a member of
      const { data: memberOrgs, error: memberError } = await supabase
        .from('organization_members')
        .select(`
          organization_id,
          role,
          organizations (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (memberError) {
        console.error("Error fetching member organizations:", memberError);
        setError("Failed to load organizations");
        toast.error("Failed to load organizations");
        return;
      }
      
      console.log("Member organizations:", memberOrgs?.length || 0);
      
      // Combine both sets of organizations, avoiding duplicates
      const ownedOrgIds = new Set(ownedOrgs?.map(org => org.id) || []);
      const allOrgs: Organization[] = [];
      
      // Add owned orgs first
      if (ownedOrgs) {
        allOrgs.push(...ownedOrgs.map(org => ({
          id: org.id,
          name: org.name,
          role: 'owner' as UserRole,
          member_count: 1, // Default member count
          created_at: org.created_at,
          active: org.active,
          created_by: org.created_by
        })));
      }
      
      // Add member orgs if not already added as owned
      if (memberOrgs) {
        for (const memberOrg of memberOrgs) {
          if (memberOrg.organizations && !ownedOrgIds.has(memberOrg.organization_id)) {
            allOrgs.push({
              id: memberOrg.organization_id,
              name: memberOrg.organizations.name,
              role: memberOrg.role as UserRole,
              member_count: 1, // Default member count
              created_at: memberOrg.organizations.created_at,
              active: memberOrg.organizations.active,
              created_by: memberOrg.organizations.created_by
            });
          }
        }
      }
      
      console.log("Combined organizations:", allOrgs.length);
      setOrganizations(allOrgs);
      
      // Get the active organization ID if it hasn't been loaded yet
      if (!activeOrganizationId && user?.id) {
        try {
          const activeOrgId = await getActiveOrganization(user.id);
          setActiveOrganizationId(activeOrgId);
        } catch (err) {
          console.error("Error loading active organization ID:", err);
        }
      }
    } catch (error: any) {
      console.error("Error fetching organizations:", error);
      setError(`Failed to load organizations: ${error.message}`);
      toast.error(`Failed to load organizations: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session && user?.id) {
      fetchOrganizations().catch(err => {
        console.error("Failed to fetch organizations:", err);
        setIsLoading(false);
      });
    }
  }, [session, user?.id]);

  return {
    organizations,
    activeOrganizationId,
    fetchOrganizations,
    isLoading,
    error
  };
};

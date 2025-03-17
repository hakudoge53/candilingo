
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Organization } from '@/types/organization';
import { toast } from 'sonner';
import { useAuth } from '../useAuth';

export interface UseOrganizationListReturn {
  organizations: Organization[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  createOrganization: (name: string) => Promise<Organization | null>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useOrganizationList = (): UseOrganizationListReturn => {
  const { isLoggedIn, activeUser } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch organizations
  const fetchOrganizations = async () => {
    if (!isLoggedIn || !activeUser) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First, get the organizations where the user is a member
      const { data: memberships, error: membershipError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', activeUser.id);
      
      if (membershipError) throw membershipError;
      
      if (memberships.length === 0) {
        setOrganizations([]);
        setActiveOrganization(null);
        return;
      }
      
      // Get the organization IDs
      const orgIds = memberships.map(membership => membership.organization_id);
      
      // Get the organizations
      const { data: orgs, error: orgsError } = await supabase
        .from('organizations')
        .select('*')
        .in('id', orgIds)
        .order('created_at', { ascending: false });
      
      if (orgsError) throw orgsError;
      
      setOrganizations(orgs as Organization[]);
      
      // Set active organization to the first one if none is set
      if (orgs.length > 0 && !activeOrganization) {
        setActiveOrganization(orgs[0] as Organization);
      }
    } catch (error: any) {
      console.error("Error fetching organizations:", error);
      setError(error.message);
      toast.error("Failed to load organizations");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new organization
  const createOrganization = async (name: string): Promise<Organization | null> => {
    if (!isLoggedIn || !activeUser) return null;
    
    setIsLoading(true);
    
    try {
      // First create the organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name,
          created_by: activeUser.id
        })
        .select()
        .single();
      
      if (orgError) throw orgError;
      
      // Then create a membership for the current user as the owner
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: orgData.id,
          user_id: activeUser.id,
          role: 'owner',
          status: 'active'
        });
      
      if (memberError) {
        // If membership creation fails, delete the organization to avoid orphaned organizations
        await supabase
          .from('organizations')
          .delete()
          .eq('id', orgData.id);
        
        throw memberError;
      }
      
      const newOrg = orgData as Organization;
      
      // Update local state
      setOrganizations(prevOrgs => [newOrg, ...prevOrgs]);
      setActiveOrganization(newOrg);
      
      toast.success("Organization created successfully");
      return newOrg;
    } catch (error: any) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch organizations on mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrganizations();
    }
  }, [isLoggedIn, activeUser?.id]);

  return {
    organizations,
    activeOrganization,
    setActiveOrganization,
    createOrganization,
    isLoading,
    error,
    refetch: fetchOrganizations
  };
};

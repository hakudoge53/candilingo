
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Organization, UserRole } from '../organization/types';
import { useAuth } from '../useAuth';
import { toast } from 'sonner';

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
  const { user, activeUser } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch organizations for the current user
  const fetchOrganizations = async () => {
    if (!user) {
      setOrganizations([]);
      setActiveOrganization(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all organizations where the user is a member
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id);
      
      if (memberError) throw memberError;
      
      if (memberData.length === 0) {
        // If no organizations, check if this is simon.tejme@hotmail.com and create a default org
        if (user.email === 'simon.tejme@hotmail.com') {
          const defaultOrg = await createDefaultOrganization('Candilingo');
          if (defaultOrg) {
            setOrganizations([defaultOrg]);
            setActiveOrganization(defaultOrg);
          }
        }
        setIsLoading(false);
        return;
      }
      
      // Get organization details
      const orgIds = memberData.map(item => item.organization_id);
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .in('id', orgIds);
      
      if (orgError) throw orgError;
      
      setOrganizations(orgData as Organization[]);
      
      // Set active organization to first one if not already set
      if (orgData.length > 0 && !activeOrganization) {
        setActiveOrganization(orgData[0] as Organization);
      }
    } catch (error: any) {
      console.error("Error fetching organizations:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a default organization for simon.tejme@hotmail.com
  const createDefaultOrganization = async (name: string): Promise<Organization | null> => {
    if (!user) return null;
    
    try {
      // Create the organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({ name, created_by: user.id })
        .select()
        .single();
      
      if (orgError) throw orgError;
      
      // Add the user as an owner
      const memberData = {
        organization_id: orgData.id,
        user_id: user.id,
        role: 'owner' as UserRole,
        status: 'active'
      };
      
      // Need to cast to any to work around TypeScript limitations with Supabase
      await supabase
        .from('organization_members')
        .insert(memberData as any);
      
      toast.success("Default organization created for you!");
      return orgData as Organization;
    } catch (error: any) {
      console.error("Error creating default organization:", error);
      toast.error("Failed to create default organization");
      return null;
    }
  };

  // Create a new organization
  const createOrganization = async (name: string): Promise<Organization | null> => {
    if (!user) return null;
    
    try {
      // Create the organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({ name, created_by: user.id })
        .select()
        .single();
      
      if (orgError) throw orgError;
      
      // Add the user as an owner
      const memberData = {
        organization_id: orgData.id,
        user_id: user.id,
        role: 'owner' as UserRole,
        status: 'active'
      };
      
      // Need to cast to any to work around TypeScript limitations with Supabase
      await supabase
        .from('organization_members')
        .insert(memberData as any);
      
      // Update local state
      const newOrg = orgData as Organization;
      setOrganizations(prev => [...prev, newOrg]);
      setActiveOrganization(newOrg);
      
      return newOrg;
    } catch (error: any) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
      return null;
    }
  };

  // Fetch organizations when user changes
  useEffect(() => {
    fetchOrganizations();
  }, [user?.id]);

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

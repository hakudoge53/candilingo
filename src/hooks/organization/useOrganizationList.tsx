
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Organization } from '@/types/organization';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's organizations
  const fetchOrganizations = async () => {
    if (!isLoggedIn || !activeUser) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First check if user is a member of any organizations
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', activeUser.id)
        .eq('status', 'active');
      
      if (memberError) throw memberError;
      
      if (memberData && memberData.length > 0) {
        const orgIds = memberData.map(item => item.organization_id);
        
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .in('id', orgIds)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setOrganizations(data);
        
        // Set active organization to first one by default if none is selected
        if (data.length > 0 && !activeOrganization) {
          setActiveOrganization(data[0]);
        }
      } else {
        setOrganizations([]);
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
  const createOrganization = async (name: string) => {
    if (!isLoggedIn || !activeUser) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert([{ name, created_by: activeUser.id }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Also create a membership record for the creator as admin
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: data.id,
          user_id: activeUser.id,
          role: 'owner',
          status: 'active'
        }]);
      
      if (memberError) throw memberError;
      
      setOrganizations(prev => [data, ...prev]);
      setActiveOrganization(data);
      
      toast.success("Organization created successfully");
      return data;
    } catch (error: any) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Special function to create an organization for a specific user
  // This will be triggered when the dashboard loads if no organizations exist
  const createDefaultOrganization = async () => {
    if (!isLoggedIn || !activeUser) return;
    
    // Check if user already has organizations
    if (organizations.length > 0) return;
    
    // Check if user has email simon.tejme@hotmail.com
    if (activeUser.email === 'simon.tejme@hotmail.com') {
      console.log("Creating default organization for Simon");
      await createOrganization("Candilingo");
    }
  };

  // Load organizations when user logs in
  useEffect(() => {
    if (isLoggedIn && activeUser) {
      fetchOrganizations();
    } else {
      setOrganizations([]);
      setActiveOrganization(null);
    }
  }, [isLoggedIn, activeUser]);

  // Create default organization if needed
  useEffect(() => {
    if (isLoggedIn && activeUser && organizations.length === 0 && !isLoading) {
      createDefaultOrganization();
    }
  }, [isLoggedIn, activeUser, organizations, isLoading]);

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

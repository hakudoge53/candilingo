
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Organization } from '@/types/organization';
import { useAuth } from '../useAuth';

export const useOrganizationList = () => {
  const { isLoggedIn, activeUser } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's organizations
  const fetchOrganizations = async () => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setOrganizations(data);
      
      // Set active organization to first one by default if none is selected
      if (data.length > 0 && !activeOrganization) {
        setActiveOrganization(data[0]);
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
    if (!isLoggedIn) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert([{ name, created_by: activeUser?.id }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Also create a membership record for the creator as admin
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: data.id,
          user_id: activeUser?.id,
          role: 'admin',
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

  // Load organizations when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrganizations();
    } else {
      setOrganizations([]);
      setActiveOrganization(null);
    }
  }, [isLoggedIn]);

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

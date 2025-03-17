
import { useState, useEffect } from 'react';
import { Organization, UserRole } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { UseOrganizationsFetchReturn } from './types';

/**
 * Hook to fetch all organizations that the current user has created
 * 
 * @returns {UseOrganizationsFetchReturn} Object containing organizations and methods to fetch them
 */
export const useOrganizationsFetch = (): UseOrganizationsFetchReturn => {
  const { session, user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch organizations from the database
   * 
   * @returns {Promise<void>}
   */
  const fetchOrganizations = async () => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { data: organizationsData, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('created_by', user?.id);

      if (error) {
        console.error("Error fetching organizations:", error);
        setError("Failed to load organizations");
        toast.error("Failed to load organizations");
      } else {
        // Transform the data to match the Organization interface
        const transformedOrgs: Organization[] = (organizationsData || []).map(org => ({
          id: org.id,
          name: org.name,
          role: 'owner' as UserRole, // Default role for fetched organizations
          member_count: 1, // Default member count
          created_at: org.created_at,
          active: org.active,
          created_by: org.created_by
        }));
        
        setOrganizations(transformedOrgs);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      setError("Failed to load organizations");
      toast.error("Failed to load organizations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations().catch(err => {
      console.error("Failed to fetch organizations:", err);
      setIsLoading(false);
    });
  }, [session, user]);

  return {
    organizations,
    fetchOrganizations,
    isLoading,
    error
  };
};

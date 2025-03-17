
import { useState } from 'react';
import { Organization, UserRole } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { UseOrganizationCreateReturn } from './types';

/**
 * Hook to handle creating new organizations
 * 
 * @returns {UseOrganizationCreateReturn} Object containing methods to create organizations
 */
export const useOrganizationCreate = (): UseOrganizationCreateReturn => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create a new organization
   * 
   * @param {string} name - The name of the new organization
   * @returns {Promise<Organization | null>} The newly created organization or null if creation failed
   */
  const createOrganization = async (name: string): Promise<Organization | null> => {
    if (!user?.id) {
      toast.error("User ID not available");
      setError("User ID not available");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert([
          {
            name,
            created_by: user.id,
          },
        ])
        .select();

      if (error) {
        console.error("Error creating organization:", error);
        toast.error("Failed to create organization");
        setError("Failed to create organization");
        return null;
      }

      const newOrganization = data && data[0] ? data[0] as any : null;

      if (newOrganization) {
        // Add required properties to match the Organization interface
        const fullOrganization: Organization = {
          ...newOrganization,
          role: 'owner' as UserRole,
          member_count: 1
        };
        
        toast.success("Organization created successfully!");
        return fullOrganization;
      }

      return null;
    } catch (error) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
      setError("Failed to create organization");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrganization,
    isLoading,
    error
  };
};

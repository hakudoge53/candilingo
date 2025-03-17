
import { useState } from 'react';
import { Organization, UserRole } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { setActiveOrganization } from '@/utils/supabaseHelpers';
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
      console.log("Creating organization:", name, "for user:", user.id);
      
      // First, create the organization
      const { data, error: orgError } = await supabase
        .from('organizations')
        .insert([
          {
            name,
            created_by: user.id,
          },
        ])
        .select();

      if (orgError) {
        console.error("Error creating organization:", orgError);
        toast.error("Failed to create organization");
        setError(`Failed to create organization: ${orgError.message}`);
        return null;
      }

      const newOrganization = data && data[0] ? data[0] as any : null;
      
      if (!newOrganization) {
        toast.error("Failed to create organization - no data returned");
        return null;
      }
      
      console.log("Organization created successfully:", newOrganization);
      
      // Add required properties to match the Organization interface
      const fullOrganization: Organization = {
        ...newOrganization,
        role: 'owner' as UserRole,
        member_count: 1
      };
      
      // Set this as the active organization for the user using the utility function
      const success = await setActiveOrganization(user.id, newOrganization.id);
      
      if (success) {
        toast.success("Organization created successfully!");
      } else {
        toast.warning("Organization created but couldn't set as active");
      }
      
      return fullOrganization;
    } catch (error: any) {
      console.error("Error creating organization:", error);
      toast.error(`Failed to create organization: ${error.message}`);
      setError(`Failed to create organization: ${error.message}`);
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

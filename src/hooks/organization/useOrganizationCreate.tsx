
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
      
      // Now ensure the user is added as a member with admin role
      // (This is now handled by the database trigger, but we'll check if it exists)
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('*')
        .eq('organization_id', newOrganization.id)
        .eq('user_id', user.id)
        .single();
        
      if (memberError && !memberError.message.includes('No rows found')) {
        console.error("Error checking organization member:", memberError);
      }
      
      // If the member doesn't exist for some reason, add them manually
      if (!memberData) {
        const { error: insertError } = await supabase
          .from('organization_members')
          .insert([
            {
              organization_id: newOrganization.id,
              user_id: user.id,
              role: 'admin',
              status: 'active'
            }
          ]);
          
        if (insertError) {
          console.error("Error adding user as organization member:", insertError);
        }
      }

      // Add required properties to match the Organization interface
      const fullOrganization: Organization = {
        ...newOrganization,
        role: 'owner' as UserRole,
        member_count: 1
      };
      
      // Set this as the active organization for the user
      await setActiveOrganization(user.id, newOrganization.id);
      
      toast.success("Organization created successfully!");
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
  
  // Helper function to set the active organization in user_settings
  const setActiveOrganization = async (userId: string, organizationId: string): Promise<boolean> => {
    try {
      // Check if user_settings record exists
      const { data: existingSettings, error: checkError } = await supabase
        .from('user_settings')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (checkError && !checkError.message.includes('No rows found')) {
        console.error("Error checking user settings:", checkError);
        return false;
      }
      
      if (existingSettings) {
        // Update existing settings
        const { error: updateError } = await supabase
          .from('user_settings')
          .update({ active_organization_id: organizationId })
          .eq('user_id', userId);
        
        if (updateError) {
          console.error("Error updating active organization:", updateError);
          return false;
        }
      } else {
        // Create new settings
        const { error: insertError } = await supabase
          .from('user_settings')
          .insert({ 
            user_id: userId, 
            active_organization_id: organizationId,
            highlight_enabled: true,
            highlight_color: '#9b87f5'
          });
        
        if (insertError) {
          console.error("Error creating user settings:", insertError);
          return false;
        }
      }
      
      console.log("Successfully set active organization:", organizationId);
      return true;
    } catch (error) {
      console.error("Error setting active organization:", error);
      return false;
    }
  };

  return {
    createOrganization,
    isLoading,
    error
  };
};

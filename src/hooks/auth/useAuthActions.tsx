
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from './types';

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.info("You have been logged out.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createDefaultOrganization = async (userId: string | undefined, name: string = "My Organization") => {
    if (!userId) {
      toast.error("You must be logged in to create an organization");
      return null;
    }
    
    try {
      setIsLoading(true);
      
      // Create a new organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([{ name, created_by: userId }])
        .select()
        .single();
      
      if (orgError) {
        throw orgError;
      }
      
      // Create membership for user as admin
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: orgData.id,
          user_id: userId,
          role: 'admin',
          status: 'active'
        }]);
      
      if (memberError) {
        throw memberError;
      }
      
      toast.success("Default organization created successfully");
      return orgData;
    } catch (error: any) {
      console.error("Error creating default organization:", error);
      toast.error("Failed to create organization: " + error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogout,
    createDefaultOrganization
  };
};

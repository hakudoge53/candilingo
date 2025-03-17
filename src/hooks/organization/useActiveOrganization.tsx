
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Organization } from '@/types/organization';
import { UserSettings, UseActiveOrganizationReturn } from './types';
import { useAuth } from '../auth/useAuth';
import { toast } from 'sonner';

/**
 * Hook to manage the active organization for the current user
 * 
 * @param {Organization[]} organizations - Array of organizations the user is a member of
 * @returns {UseActiveOrganizationReturn} Object containing the active organization and methods to set it
 */
export const useActiveOrganization = (organizations: Organization[]): UseActiveOrganizationReturn => {
  const { user } = useAuth();
  const [activeOrganization, setActiveOrganizationState] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch the user's active organization from user_settings when component mounts
  useEffect(() => {
    if (!user?.id || organizations.length === 0) return;
    
    const loadActiveOrganization = async () => {
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          // If no settings exist, create them
          if (error.message.includes('No rows found')) {
            await createUserSettings(user.id);
            return;
          }
          throw error;
        }
        
        // If active_organization_id exists, find it in the organizations array
        if (data && data.active_organization_id) {
          const activeOrg = organizations.find(org => org.id === data.active_organization_id);
          if (activeOrg) {
            setActiveOrganizationState(activeOrg);
            return;
          }
        }
        
        // If no active org is set or it doesn't exist in the user's orgs, default to the first one
        if (organizations.length > 0) {
          setActiveOrganizationState(organizations[0]);
          // Save this as the active organization
          await setActiveOrganization(organizations[0]);
        }
      } catch (err: any) {
        console.error("Error fetching active organization:", err);
        setError(err.message);
      }
    };
    
    loadActiveOrganization();
  }, [user?.id, organizations]);
  
  /**
   * Create initial user settings for a user
   */
  const createUserSettings = async (userId: string) => {
    try {
      await supabase
        .from('user_settings')
        .insert([{ user_id: userId }]);
      
      // If organizations exist, set the first one as active
      if (organizations.length > 0) {
        setActiveOrganizationState(organizations[0]);
        await setActiveOrganization(organizations[0]);
      }
    } catch (err: any) {
      console.error("Error creating user settings:", err);
      setError(err.message);
    }
  };
  
  /**
   * Set the active organization for the current user
   */
  const setActiveOrganization = async (org: Organization | null) => {
    if (!user?.id) return;
    
    try {
      // Update state first for responsiveness
      setActiveOrganizationState(org);
      
      // Update the user_settings table
      const { error } = await supabase
        .from('user_settings')
        .update({ active_organization_id: org?.id || null })
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (err: any) {
      console.error("Error setting active organization:", err);
      setError(err.message);
      toast.error("Failed to update active organization");
    }
  };
  
  return {
    activeOrganization,
    setActiveOrganization,
    error
  };
};

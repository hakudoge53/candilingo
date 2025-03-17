
import { useState, useEffect } from 'react';
import { Organization } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { UseActiveOrganizationReturn, UserSettings } from './types';

export const useActiveOrganization = (
  organizations: Organization[]
): UseActiveOrganizationReturn => {
  const { user } = useAuth();
  const [activeOrganization, setActiveOrganizationState] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveOrganization = async () => {
      if (!user || organizations.length === 0) return;

      try {
        // First, check if the user_settings table exists and has the active_organization_id column
        const { data: userSettings, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (error) {
          console.error("Error fetching user settings:", error);
          return;
        }

        // Safely check if active_organization_id exists in the user settings
        const activeOrgId = userSettings && 'active_organization_id' in userSettings ? 
          userSettings.active_organization_id : null;

        if (activeOrgId) {
          const activeOrg = organizations.find(org => org.id === activeOrgId) || null;
          setActiveOrganizationState(activeOrg);
        } else {
          setActiveOrganizationState(organizations.length > 0 ? organizations[0] : null);
        }
      } catch (error) {
        console.error("Error fetching active organization:", error);
        setError("Failed to fetch active organization");
      }
    };

    fetchActiveOrganization().catch(err => {
      console.error("Failed to fetch active organization:", err);
    });
  }, [user, organizations]);

  const setActiveOrganization = async (organization: Organization | null) => {
    setActiveOrganizationState(organization);
    setError(null);

    try {
      if (!user) return;
      
      // First check if user settings record exists
      const { data: existingSettings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (existingSettings) {
        // Update existing settings
        await supabase
          .from('user_settings')
          .update({
            active_organization_id: organization?.id || null
          })
          .eq('user_id', user.id);
      } else {
        // Create new settings record with defaults
        const newSettings: UserSettings = {
          user_id: user.id,
          active_organization_id: organization?.id || null,
          highlight_enabled: true,
          highlight_color: '#9b87f5'
        };
        
        await supabase
          .from('user_settings')
          .insert(newSettings);
      }

      console.log("Updated active organization in settings");
    } catch (error) {
      console.error("Error updating active organization:", error);
      setError("Failed to update active organization");
      toast.error("Failed to update active organization");
    }
  };

  return {
    activeOrganization,
    setActiveOrganization,
    error
  };
};

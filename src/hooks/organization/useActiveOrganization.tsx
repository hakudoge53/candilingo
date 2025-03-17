
import { useState, useEffect } from 'react';
import { Organization } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { UseActiveOrganizationReturn, UserSettings } from './types';

export const useActiveOrganization = (organizations: Organization[]): UseActiveOrganizationReturn => {
  const { user } = useAuth();
  const [activeOrganization, setActiveOrg] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load the active organization when organizations are fetched
  useEffect(() => {
    const fetchActiveOrganization = async () => {
      if (!user?.id || organizations.length === 0) {
        return;
      }

      try {
        // Get user's active organization ID from user_settings
        const { data: userSettings, error: settingsError } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (settingsError) {
          console.error("Error fetching user settings:", settingsError);
          setError("Failed to fetch user settings");
          return;
        }

        // Find matching organization from fetched organizations
        if (userSettings?.active_organization_id) {
          const active = organizations.find(org => org.id === userSettings.active_organization_id);
          if (active) {
            setActiveOrg(active);
          } else if (organizations.length > 0) {
            // If active not found but organizations exist, set first as active
            setActiveOrg(organizations[0]);
            await updateActiveOrganization(organizations[0]);
          }
        } else if (organizations.length > 0) {
          // If no active org set, use first org and update settings
          setActiveOrg(organizations[0]);
          await updateActiveOrganization(organizations[0]);
        }
      } catch (error) {
        console.error("Error setting active organization:", error);
        setError("Failed to set active organization");
      }
    };

    fetchActiveOrganization();
  }, [user, organizations]);

  // Function to update active organization in user settings
  const updateActiveOrganization = async (org: Organization | null) => {
    if (!user?.id) {
      return;
    }

    try {
      const { data: existingSettings, error: fetchError } = await supabase
        .from('user_settings')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching user settings:", fetchError);
        return;
      }

      if (existingSettings) {
        // Update existing settings
        const { error: updateError } = await supabase
          .from('user_settings')
          .update({
            active_organization_id: org?.id || null
          })
          .eq('id', existingSettings.id);

        if (updateError) {
          console.error("Error updating user settings:", updateError);
        }
      } else {
        // Create new settings
        const { error: insertError } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            active_organization_id: org?.id || null
          });

        if (insertError) {
          console.error("Error creating user settings:", insertError);
        }
      }
    } catch (error) {
      console.error("Error managing user settings:", error);
    }
  };

  // Function to set active organization (both local state and in DB)
  const setActiveOrganization = async (org: Organization | null): Promise<void> => {
    setActiveOrg(org);
    await updateActiveOrganization(org);
  };

  return {
    activeOrganization,
    setActiveOrganization,
    error
  };
};

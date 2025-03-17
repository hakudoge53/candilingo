import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAuth } from '../auth/useAuth';
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export interface UseOrganizationListReturn {
  organizations: Organization[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  createNewOrganization: (name: string) => Promise<Organization | null>;
  organizationsLoading: boolean;
}

export const useOrganizationList = (): UseOrganizationListReturn => {
  const supabase = useSupabaseClient();
  const { session, user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganization, setActiveOrganizationState] = useState<Organization | null>(null);
  const [organizationsLoading, setOrganizationsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!session) {
        setOrganizationsLoading(false);
        return;
      }

      setOrganizationsLoading(true);
      try {
        const { data: organizationsData, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('created_by', user?.id);

        if (error) {
          console.error("Error fetching organizations:", error);
          toast.error("Failed to load organizations");
        } else {
          setOrganizations(organizationsData || []);
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
        toast.error("Failed to load organizations");
      } finally {
        setOrganizationsLoading(false);
      }
    };

    fetchOrganizations();
  }, [session, supabase, user]);

  useEffect(() => {
    const fetchActiveOrganization = async () => {
      if (!session) return;

      try {
        const { data: userSettings, error } = await supabase
          .from('user_settings')
          .select('active_organization_id')
          .eq('user_id', user?.id)
          .single();

        if (error) {
          console.error("Error fetching user settings:", error);
          return;
        }

        const activeOrgId = userSettings?.active_organization_id;

        if (activeOrgId) {
          const activeOrg = organizations.find(org => org.id === activeOrgId) || null;
          setActiveOrganizationState(activeOrg);
        } else {
          setActiveOrganizationState(null);
        }
      } catch (error) {
        console.error("Error fetching active organization:", error);
      }
    };

    fetchActiveOrganization();
  }, [session, supabase, user, organizations]);

  const setActiveOrganization = async (organization: Organization | null) => {
    setActiveOrganizationState(organization);

    return supabase
      .from('user_settings')
      .update({
        active_organization_id: organization?.id || null,
      })
      .eq('user_id', user.id)
      .then(() => {
        console.log("Updated active organization in settings");
      })
      .catch(error => {
        console.error("Error updating active organization:", error);
        toast.error("Failed to update active organization");
      });
  };

  const createNewOrganization = async (name: string): Promise<Organization | null> => {
    if (!user?.id) {
      toast.error("User ID not available");
      return null;
    }

    return supabase
      .from('organizations')
      .insert([
        {
          name,
          created_by: user.id,
        },
      ])
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error creating organization:", error);
          toast.error("Failed to create organization");
          return null;
        }

        const newOrganization = data ? data[0] as Organization : null;

        if (newOrganization) {
          setOrganizations(prevOrgs => [...prevOrgs, newOrganization]);
          toast.success("Organization created successfully!");
        }

        return newOrganization;
      })
      .catch(error => {
        console.error("Error creating organization:", error);
        toast.error("Failed to create organization");
        return null;
      });
  };

  return {
    organizations,
    activeOrganization,
    setActiveOrganization,
    createNewOrganization,
    organizationsLoading,
  };
};

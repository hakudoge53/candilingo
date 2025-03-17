
import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import { supabase } from "@/integrations/supabase/client";
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

    fetchOrganizations().catch(err => {
      console.error("Failed to fetch organizations:", err);
      setOrganizationsLoading(false);
    });
  }, [session, user]);

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

    fetchActiveOrganization().catch(err => {
      console.error("Failed to fetch active organization:", err);
    });
  }, [session, user, organizations]);

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
        return null;
      }

      const newOrganization = data && data[0] ? data[0] as Organization : null;

      if (newOrganization) {
        // Add required properties to match the Organization interface
        const fullOrganization: Organization = {
          ...newOrganization,
          role: 'owner' as UserRole,
          member_count: 1
        };
        
        setOrganizations(prevOrgs => [...prevOrgs, fullOrganization]);
        toast.success("Organization created successfully!");
        return fullOrganization;
      }

      return null;
    } catch (error) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
      return null;
    }
  };

  return {
    organizations,
    activeOrganization,
    setActiveOrganization,
    createNewOrganization,
    organizationsLoading,
  };
};

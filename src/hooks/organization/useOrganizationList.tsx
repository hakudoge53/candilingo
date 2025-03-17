
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Organization, UserRole } from '@/types/organization';
import { useAuth } from '../useAuth';
import { toast } from "sonner";
import { castRole } from '@/utils/supabaseHelpers';

export interface UseOrganizationListProps {
  onOrganizationChange?: (org: Organization) => void;
}

export interface UseOrganizationListReturn {
  organizations: Organization[];
  activeOrganization: Organization | null;
  organizationsLoading: boolean;
  activeOrganizationLoading: boolean;
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  setActiveOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
  createNewOrganization: (name: string) => Promise<Organization | null>;
}

export const useOrganizationList = ({
  onOrganizationChange
}: UseOrganizationListProps = {}): UseOrganizationListReturn => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [organizationsLoading, setOrganizationsLoading] = useState(false);
  const [activeOrganizationLoading, setActiveOrganizationLoading] = useState(false);

  // Load organizations on mount
  useEffect(() => {
    if (!user) return;
    
    setOrganizationsLoading(true);
    
    supabase
      .from('organizations')
      .select(`
        *,
        organization_members(role)
      `)
      .then(response => {
        if (response.error) {
          console.error('Error fetching organizations:', response.error);
          toast.error('Failed to fetch organizations: ' + response.error.message);
        } else {
          const orgs = response.data.map(org => ({
            ...org,
            role: org.organization_members?.[0]?.role as UserRole,
            member_count: 1
          })) as Organization[];
          setOrganizations(orgs);
          
          if (orgs.length > 0 && !activeOrganization) {
            setActiveOrganization(orgs[0]);
            onOrganizationChange?.(orgs[0]);
          }
        }
      })
      .finally(() => {
        setOrganizationsLoading(false);
      });
  }, [user]);

  // Load active organization from local storage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const orgId = localStorage.getItem('activeOrganizationId');
    if (!orgId) return;
    
    setActiveOrganizationLoading(true);
    
    supabase
      .from('organizations')
      .select(`
        *,
        organization_members(role)
      `)
      .eq('id', orgId)
      .then(response => {
        if (response.error) {
          console.error('Error fetching active organization:', response.error);
        } else if (response.data && response.data.length > 0) {
          const org = {
            ...response.data[0],
            role: response.data[0].organization_members?.[0]?.role as UserRole,
            member_count: 1
          } as Organization;
          setActiveOrganization(org);
          onOrganizationChange?.(org);
        }
      })
      .finally(() => {
        setActiveOrganizationLoading(false);
      });
  }, []);

  // Save active organization to local storage when it changes
  useEffect(() => {
    if (!activeOrganization) {
      localStorage.removeItem('activeOrganizationId');
    } else {
      localStorage.setItem('activeOrganizationId', activeOrganization.id);
    }
  }, [activeOrganization]);

  const createNewOrganization = async (name: string) => {
    if (!user) return;
    
    setOrganizationsLoading(true);
    
    try {
      // First create the organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([{ name: name }])
        .select()
        .single();
      
      if (orgError) throw orgError;
      
      // Then add the current user as an owner
      const memberData = {
        organization_id: orgData.id,
        user_id: user.id,
        role: castRole('owner'), // Use castRole to handle type conversion
        status: 'active'
      };
      
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([memberData]);
      
      if (memberError) throw memberError;
      
      // Update local state
      const newOrg = {
        ...orgData,
        role: 'owner' as UserRole, // Type cast to UserRole
        member_count: 1
      };
      
      setOrganizations(prevOrgs => [...prevOrgs, newOrg]);
      setActiveOrganization(newOrg);
      
      onOrganizationChange?.(newOrg);
      return newOrg;
    } catch (error: any) {
      console.error('Error creating organization:', error);
      toast.error('Failed to create organization: ' + error.message);
      return null;
    } finally {
      setOrganizationsLoading(false);
    }
  };

  return {
    organizations,
    activeOrganization,
    organizationsLoading,
    activeOrganizationLoading,
    setOrganizations,
    setActiveOrganization,
    createNewOrganization
  };
};

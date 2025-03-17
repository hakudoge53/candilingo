import { Organization, UserRole } from '@/types/organization';
import { UseOrganizationListReturn } from './types';
import { useOrganizationsFetch } from './useOrganizationsFetch';
import { useActiveOrganization } from './useActiveOrganization';
import { useOrganizationCreate } from './useOrganizationCreate';
import { useState, useEffect } from 'react';

export { UserSettings } from './types';
export { UseOrganizationListReturn } from './types';

export const useOrganizationList = (): UseOrganizationListReturn => {
  const { organizations, isLoading: organizationsLoading } = useOrganizationsFetch();
  const { activeOrganization, setActiveOrganization } = useActiveOrganization(organizations);
  const { createOrganization } = useOrganizationCreate();
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    setAllOrganizations(organizations);
  }, [organizations]);

  const createNewOrganization = async (name: string): Promise<Organization | null> => {
    const newOrg = await createOrganization(name);
    
    if (newOrg) {
      setAllOrganizations(prevOrgs => [...prevOrgs, newOrg]);
    }
    
    return newOrg;
  };

  return {
    organizations: allOrganizations,
    activeOrganization,
    setActiveOrganization,
    createNewOrganization,
    organizationsLoading,
  };
};

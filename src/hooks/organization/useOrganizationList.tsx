
import { Organization, UserRole } from '@/types/organization';
import { UseOrganizationListReturn } from './types';
import { useOrganizationsFetch } from './useOrganizationsFetch';
import { useActiveOrganization } from './useActiveOrganization';
import { useOrganizationCreate } from './useOrganizationCreate';
import { useState, useEffect } from 'react';

export { UserSettings } from './types';
export type { UseOrganizationListReturn } from './types';

/**
 * A combined hook that manages organization listing, active organization selection,
 * and organization creation.
 * 
 * @returns {UseOrganizationListReturn} An object with organizations data and methods
 */
export const useOrganizationList = (): UseOrganizationListReturn => {
  const { organizations, isLoading: organizationsLoading } = useOrganizationsFetch();
  const { activeOrganization, setActiveOrganization } = useActiveOrganization(organizations);
  const { createOrganization } = useOrganizationCreate();
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    setAllOrganizations(organizations);
  }, [organizations]);

  /**
   * Creates a new organization and adds it to the local state
   * 
   * @param {string} name - The name of the new organization
   * @returns {Promise<Organization | null>} The newly created organization or null if creation failed
   */
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

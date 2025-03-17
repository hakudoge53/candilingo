
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { OrganizationLicense } from '../types';
import { toast } from "sonner";

export interface UseLicensesReturn {
  licenses: OrganizationLicense[];
  isLoading: boolean;
  error: string | null;
  fetchLicenses: (organizationId: string) => Promise<void>;
  addLicenses: (organizationId: string, count: number, licenseType?: string) => Promise<boolean>;
  checkLicenseAvailability: (organizationId: string) => Promise<boolean>;
  allocateLicense: (organizationId: string, userId: string) => Promise<boolean>;
  releaseLicense: (organizationId: string, userId: string) => Promise<boolean>;
}

/**
 * Hook for managing organization licenses
 */
export const useLicenses = (): UseLicensesReturn => {
  const [licenses, setLicenses] = useState<OrganizationLicense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch licenses for a specific organization
   */
  const fetchLicenses = async (organizationId: string): Promise<void> => {
    if (!organizationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('organization_licenses')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) throw error;

      setLicenses(data || []);
    } catch (err: any) {
      console.error('Error fetching licenses:', err);
      setError(err.message);
      toast.error('Failed to load license information');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add licenses to an organization
   */
  const addLicenses = async (
    organizationId: string, 
    count: number,
    licenseType: string = 'standard'
  ): Promise<boolean> => {
    if (!organizationId || count <= 0) {
      toast.error('Organization ID and positive license count are required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if license record exists for this type
      const { data: existingLicense, error: checkError } = await supabase
        .from('organization_licenses')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('license_type', licenseType)
        .single();

      if (checkError && !checkError.message.includes('No rows found')) {
        throw checkError;
      }

      if (existingLicense) {
        // Update existing license
        const newTotal = existingLicense.total_licenses + count;
        const { error } = await supabase
          .from('organization_licenses')
          .update({ 
            total_licenses: newTotal,
            updated_at: new Date().toISOString() 
          })
          .eq('id', existingLicense.id);

        if (error) throw error;

        setLicenses(prev => prev.map(license => 
          license.id === existingLicense.id 
            ? { ...license, total_licenses: newTotal } 
            : license
        ));
      } else {
        // Create new license record
        const { data, error } = await supabase
          .from('organization_licenses')
          .insert([
            { 
              organization_id: organizationId,
              total_licenses: count,
              used_licenses: 0,
              license_type: licenseType
            }
          ])
          .select()
          .single();

        if (error) throw error;

        setLicenses(prev => [...prev, data]);
      }
      
      toast.success(`${count} licenses added successfully`);
      return true;
    } catch (err: any) {
      console.error('Error adding licenses:', err);
      setError(err.message);
      toast.error('Failed to add licenses');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check if license is available for adding a new member
   */
  const checkLicenseAvailability = async (organizationId: string): Promise<boolean> => {
    if (!organizationId) return false;

    try {
      const { data, error } = await supabase
        .from('organization_licenses')
        .select('*')
        .eq('organization_id', organizationId)
        .order('license_type');

      if (error) throw error;

      // If no license records exist
      if (!data || data.length === 0) {
        return false;
      }

      // Check across all license types
      let totalLicenses = 0;
      let usedLicenses = 0;
      
      data.forEach(license => {
        totalLicenses += license.total_licenses;
        usedLicenses += license.used_licenses;
      });

      return totalLicenses > usedLicenses;
    } catch (err: any) {
      console.error('Error checking license availability:', err);
      return false;
    }
  };
  
  /**
   * Allocate a license to a specific user
   */
  const allocateLicense = async (organizationId: string, userId: string): Promise<boolean> => {
    if (!organizationId || !userId) {
      toast.error('Organization ID and User ID are required');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First check if a license is available
      const isAvailable = await checkLicenseAvailability(organizationId);
      if (!isAvailable) {
        toast.error('No licenses available. Please purchase more licenses.');
        return false;
      }
      
      // Get the first license record with available licenses
      const { data: licenseData, error: licenseError } = await supabase
        .from('organization_licenses')
        .select('*')
        .eq('organization_id', organizationId)
        .order('license_type');
        
      if (licenseError) throw licenseError;
      
      if (!licenseData || licenseData.length === 0) {
        toast.error('No license records found');
        return false;
      }
      
      // Find a license with available slots
      const availableLicense = licenseData.find(license => 
        license.used_licenses < license.total_licenses
      );
      
      if (!availableLicense) {
        toast.error('No licenses with available capacity');
        return false;
      }
      
      // Update the license record to increment used_licenses
      const { error: updateError } = await supabase
        .from('organization_licenses')
        .update({ 
          used_licenses: availableLicense.used_licenses + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', availableLicense.id);
        
      if (updateError) throw updateError;
      
      // Update the allocation in the user record (could be in organization_members or a dedicated table)
      // This part depends on your schema design
      
      setLicenses(prev => prev.map(license => 
        license.id === availableLicense.id 
          ? { ...license, used_licenses: license.used_licenses + 1 } 
          : license
      ));
      
      toast.success('License allocated successfully');
      return true;
    } catch (err: any) {
      console.error('Error allocating license:', err);
      setError(err.message);
      toast.error('Failed to allocate license');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Release a license from a specific user
   */
  const releaseLicense = async (organizationId: string, userId: string): Promise<boolean> => {
    if (!organizationId || !userId) {
      toast.error('Organization ID and User ID are required');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the license record for this organization
      const { data: licenseData, error: licenseError } = await supabase
        .from('organization_licenses')
        .select('*')
        .eq('organization_id', organizationId)
        .order('license_type');
        
      if (licenseError) throw licenseError;
      
      if (!licenseData || licenseData.length === 0) {
        toast.error('No license records found');
        return false;
      }
      
      // Select the first license with used_licenses > 0
      const licenseToUpdate = licenseData.find(license => license.used_licenses > 0);
      
      if (!licenseToUpdate) {
        toast.error('No licenses are currently in use');
        return false;
      }
      
      // Update the license record to decrement used_licenses
      const { error: updateError } = await supabase
        .from('organization_licenses')
        .update({ 
          used_licenses: licenseToUpdate.used_licenses - 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', licenseToUpdate.id);
        
      if (updateError) throw updateError;
      
      // Update the allocation in the user record (could be in organization_members or a dedicated table)
      // This part depends on your schema design
      
      setLicenses(prev => prev.map(license => 
        license.id === licenseToUpdate.id 
          ? { ...license, used_licenses: license.used_licenses - 1 } 
          : license
      ));
      
      toast.success('License released successfully');
      return true;
    } catch (err: any) {
      console.error('Error releasing license:', err);
      setError(err.message);
      toast.error('Failed to release license');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    licenses,
    isLoading,
    error,
    fetchLicenses,
    addLicenses,
    checkLicenseAvailability,
    allocateLicense,
    releaseLicense
  };
};

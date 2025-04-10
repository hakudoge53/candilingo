
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '../auth/useAuth';
import { toast } from "sonner";
import { UseOrganizationOperationsReturn } from './types';

/**
 * Hook to handle organization operations such as updating, deleting, and leaving
 * 
 * @returns {UseOrganizationOperationsReturn} Object containing methods for organization operations
 */
export const useOrganizationOperations = (): UseOrganizationOperationsReturn => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Update an organization's name
   * 
   * @param {string} id - The ID of the organization to update
   * @param {string} name - The new name for the organization
   * @returns {Promise<boolean>} Whether the update was successful
   */
  const updateOrganization = async (id: string, name: string): Promise<boolean> => {
    if (!user?.id) {
      toast.error("User ID not available");
      setError("User ID not available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('organizations')
        .update({ name })
        .eq('id', id)
        .eq('created_by', user.id);

      if (error) {
        console.error("Error updating organization:", error);
        toast.error("Failed to update organization");
        setError("Failed to update organization");
        return false;
      }

      toast.success("Organization updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
      setError("Failed to update organization");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete an organization and all its members
   * 
   * @param {string} id - The ID of the organization to delete
   * @returns {Promise<boolean>} Whether the deletion was successful
   */
  const deleteOrganization = async (id: string): Promise<boolean> => {
    if (!user?.id) {
      toast.error("User ID not available");
      setError("User ID not available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, delete all organization members
      const { error: membersError } = await supabase
        .from('organization_members')
        .delete()
        .eq('organization_id', id);

      if (membersError) {
        console.error("Error removing organization members:", membersError);
        toast.error("Failed to delete organization");
        setError("Failed to delete organization members");
        return false;
      }

      // Then delete the organization itself
      const { error: orgError } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id)
        .eq('created_by', user.id);

      if (orgError) {
        console.error("Error deleting organization:", orgError);
        toast.error("Failed to delete organization");
        setError("Failed to delete organization");
        return false;
      }

      toast.success("Organization deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
      setError("Failed to delete organization");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Leave an organization (remove current user's membership)
   * 
   * @param {string} id - The ID of the organization to leave
   * @returns {Promise<boolean>} Whether leaving the organization was successful
   */
  const leaveOrganization = async (id: string): Promise<boolean> => {
    if (!user?.id) {
      toast.error("User ID not available");
      setError("User ID not available");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Delete the user's membership in the organization
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('organization_id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error("Error leaving organization:", error);
        toast.error("Failed to leave organization");
        setError("Failed to leave organization");
        return false;
      }

      toast.success("Left organization successfully!");
      return true;
    } catch (error) {
      console.error("Error leaving organization:", error);
      toast.error("Failed to leave organization");
      setError("Failed to leave organization");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateOrganization,
    deleteOrganization,
    leaveOrganization,
    isLoading,
    error
  };
};

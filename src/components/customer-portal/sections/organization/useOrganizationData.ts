import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Organization } from '@/types/organization';

interface Props {
  organizationId?: string;
}

export const useOrganizationData = ({ organizationId }: Props) => {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!organizationId) {
      setCurrentOrganization(null);
      return;
    }

    const fetchOrganization = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', organizationId)
          .single();

        if (error) {
          setError(error);
        } else if (data) {
          setOrganization(data);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  // Update the setOrganization function to include the required properties
const setOrganization = (data) => {
  // Make sure data includes the required Organization properties
  setCurrentOrganization({
    ...data,
    role: data.role || 'owner', // Default to owner if not provided
    member_count: data.member_count || 1 // Default to 1 if not provided
  });
};

  return {
    currentOrganization,
    isLoading,
    error,
  };
};

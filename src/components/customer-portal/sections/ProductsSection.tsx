
import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import ProductsPage from './products/ProductsPage';

interface ProductsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  user, 
  setLocalLoading 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [organizationId, setOrganizationId] = useState<string | undefined>();

  // Get user's organization
  React.useEffect(() => {
    const fetchUserOrganization = async () => {
      setIsLoading(true);
      setLocalLoading(true);
      
      try {
        const { data: memberships, error } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', user.id)
          .limit(1);
          
        if (error) throw error;
        
        if (memberships && memberships.length > 0) {
          setOrganizationId(memberships[0].organization_id);
        }
      } catch (error) {
        console.error("Error fetching user organization:", error);
      } finally {
        setIsLoading(false);
        setLocalLoading(false);
      }
    };

    fetchUserOrganization();
  }, [user.id, setLocalLoading]);

  return (
    <div className="space-y-6">
      <ProductsPage organizationId={organizationId} />
    </div>
  );
};

export default ProductsSection;

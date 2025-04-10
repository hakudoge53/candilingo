
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import PrivateDictionariesHeader from './dictionaries/PrivateDictionariesHeader';
import PrivateDictionariesContent from './dictionaries/PrivateDictionariesContent';
import GlossaryCreator from './dictionaries/GlossaryCreator';

interface PrivateDictionariesSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const PrivateDictionariesSection: React.FC<PrivateDictionariesSectionProps> = ({ 
  user, 
  setLocalLoading 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGlossaryDialogOpen, setIsGlossaryDialogOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState<string | undefined>();

  // Get user's organization
  useEffect(() => {
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

  // Handle new glossary dialog
  const handleNewGlossaryClick = () => {
    setIsGlossaryDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PrivateDictionariesHeader 
        onNewGlossaryClick={handleNewGlossaryClick}
      />
      
      <PrivateDictionariesContent
        organizationId={organizationId}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PrivateDictionariesSection;

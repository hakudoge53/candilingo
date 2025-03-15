
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GlossaryTerm } from '@/types/glossary';
import { Glossary } from '@/types/organization';
import { toast } from 'sonner';
import { useGlossaryList } from '@/hooks/glossary/useGlossaryList';
import { useGlossaryTerms } from '@/hooks/glossary/useGlossaryTerms';

// Import the new components
import GlossaryList from './dictionaries/GlossaryList';
import TermList from './dictionaries/TermList';
import TermEditor from './dictionaries/TermEditor';
import GlossaryCreator from './dictionaries/GlossaryCreator';

interface PrivateDictionariesSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface GlossaryFormValues {
  name: string;
  description: string;
}

interface TermFormValues {
  term: string;
  definition: string;
  category: string;
}

const PrivateDictionariesSection: React.FC<PrivateDictionariesSectionProps> = ({ user, setLocalLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewGlossaryDialogOpen, setIsNewGlossaryDialogOpen] = useState(false);
  const [isNewTermDialogOpen, setIsNewTermDialogOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState<string | undefined>();

  // Get user's organization
  useEffect(() => {
    const fetchUserOrganization = async () => {
      setIsLoading(true);
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
        toast.error("Failed to load organization information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrganization();
  }, [user.id]);

  // Use the custom hooks for glossaries and terms
  const { 
    glossaries, 
    activeGlossary, 
    setActiveGlossary, 
    createGlossary,
    isLoading: isGlossaryLoading
  } = useGlossaryList(organizationId);

  const {
    terms,
    addTerm,
    isLoading: isTermsLoading
  } = useGlossaryTerms(activeGlossary?.id);

  // Handle glossary selection
  const handleSelectGlossary = (glossaryId: string) => {
    const selected = glossaries.find(g => g.id === glossaryId);
    if (selected) {
      setActiveGlossary(selected);
    }
  };

  // Create new glossary
  const handleCreateGlossary = async (values: GlossaryFormValues) => {
    setIsLoading(true);
    try {
      const newGlossary = await createGlossary(values.name, values.description);
      if (newGlossary) {
        setIsNewGlossaryDialogOpen(false);
        toast.success("Glossary created successfully");
      }
    } catch (error) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create glossary");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new term to glossary
  const handleAddTerm = async (values: TermFormValues) => {
    if (!activeGlossary?.id) {
      toast.error("No glossary selected");
      return;
    }
    
    setIsLoading(true);
    try {
      const newTerm = await addTerm(
        activeGlossary.id, 
        values.term, 
        values.definition, 
        values.category || 'General'
      );
      
      if (newTerm) {
        setIsNewTermDialogOpen(false);
        toast.success("Term added successfully");
      }
    } catch (error) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
    } finally {
      setIsLoading(false);
    }
  };

  const totalLoading = isLoading || isGlossaryLoading || isTermsLoading;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Private Dictionaries</h2>
          <p className="text-gray-600 mb-6">
            Manage dictionaries specific to your organization.
          </p>
        </div>
        
        <Button onClick={() => setIsNewGlossaryDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Dictionary
        </Button>
        
        <GlossaryCreator
          isOpen={isNewGlossaryDialogOpen}
          isLoading={totalLoading}
          onOpenChange={setIsNewGlossaryDialogOpen}
          onCreateGlossary={handleCreateGlossary}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <GlossaryList
            glossaries={glossaries}
            selectedGlossaryId={activeGlossary?.id || null}
            isLoading={totalLoading}
            onSelectGlossary={handleSelectGlossary}
            onCreateGlossary={() => setIsNewGlossaryDialogOpen(true)}
          />
        </div>

        <div className="lg:col-span-3">
          <TermList
            activeGlossary={activeGlossary}
            terms={terms}
            searchTerm={searchTerm}
            isLoading={totalLoading}
            onSearchChange={setSearchTerm}
            onAddTermClick={() => setIsNewTermDialogOpen(true)}
          />
          
          {activeGlossary && (
            <TermEditor
              isOpen={isNewTermDialogOpen}
              isLoading={totalLoading}
              onOpenChange={setIsNewTermDialogOpen}
              onAddTerm={handleAddTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateDictionariesSection;

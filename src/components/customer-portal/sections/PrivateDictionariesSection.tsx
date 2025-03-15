
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

// Import the components
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
  const [isGlossaryDialogOpen, setIsGlossaryDialogOpen] = useState(false);
  const [editingGlossary, setEditingGlossary] = useState<Glossary | null>(null);
  const [isTermDialogOpen, setIsTermDialogOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
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
    updateGlossary,
    deleteGlossary,
    isLoading: isGlossaryLoading
  } = useGlossaryList(organizationId);

  const {
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading: isTermsLoading
  } = useGlossaryTerms(activeGlossary?.id);

  // Handle glossary selection
  const handleSelectGlossary = (glossaryId: string) => {
    const selected = glossaries.find(g => g.id === glossaryId);
    if (selected) {
      setActiveGlossary(selected);
    }
  };

  // Handle new glossary dialog
  const handleNewGlossaryClick = () => {
    setEditingGlossary(null);
    setIsGlossaryDialogOpen(true);
  };

  // Handle edit glossary
  const handleEditGlossaryClick = (glossary: Glossary) => {
    setEditingGlossary(glossary);
    setIsGlossaryDialogOpen(true);
  };

  // Create new glossary
  const handleCreateGlossary = async (values: GlossaryFormValues) => {
    setIsLoading(true);
    try {
      const newGlossary = await createGlossary(values.name, values.description);
      if (newGlossary) {
        setIsGlossaryDialogOpen(false);
        toast.success("Dictionary created successfully");
      }
    } catch (error) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create dictionary");
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing glossary
  const handleUpdateGlossary = async (glossaryId: string, values: GlossaryFormValues) => {
    setIsLoading(true);
    try {
      const updated = await updateGlossary(glossaryId, {
        name: values.name,
        description: values.description
      });
      
      if (updated) {
        setIsGlossaryDialogOpen(false);
        setEditingGlossary(null);
        toast.success("Dictionary updated successfully");
      }
    } catch (error) {
      console.error("Error updating glossary:", error);
      toast.error("Failed to update dictionary");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete glossary
  const handleDeleteGlossary = async (glossaryId: string) => {
    setIsLoading(true);
    try {
      await deleteGlossary(glossaryId);
      toast.success("Dictionary deleted successfully");
    } catch (error) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete dictionary");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new term to glossary
  const handleAddTerm = async (values: TermFormValues) => {
    if (!activeGlossary?.id) {
      toast.error("No dictionary selected");
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
        setIsTermDialogOpen(false);
        toast.success("Term added successfully");
      }
    } catch (error) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing term
  const handleUpdateTerm = async (termId: string, values: TermFormValues) => {
    setIsLoading(true);
    try {
      const updated = await updateTerm(termId, {
        term: values.term,
        definition: values.definition,
        category: values.category || undefined
      });
      
      if (updated) {
        setIsTermDialogOpen(false);
        setEditingTerm(null);
        toast.success("Term updated successfully");
      }
    } catch (error) {
      console.error("Error updating term:", error);
      toast.error("Failed to update term");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit term button click
  const handleEditTermClick = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setIsTermDialogOpen(true);
  };

  // Handle delete term
  const handleDeleteTerm = async (termId: string) => {
    setIsLoading(true);
    try {
      await deleteTerm(termId);
      toast.success("Term deleted successfully");
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add new term button click
  const handleAddTermClick = () => {
    setEditingTerm(null);
    setIsTermDialogOpen(true);
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
        
        <Button onClick={handleNewGlossaryClick}>
          <Plus className="mr-2 h-4 w-4" />
          New Dictionary
        </Button>
        
        <GlossaryCreator
          isOpen={isGlossaryDialogOpen}
          isLoading={totalLoading}
          editingGlossary={editingGlossary}
          onOpenChange={setIsGlossaryDialogOpen}
          onCreateGlossary={handleCreateGlossary}
          onUpdateGlossary={handleUpdateGlossary}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <GlossaryList
            glossaries={glossaries}
            selectedGlossaryId={activeGlossary?.id || null}
            isLoading={totalLoading}
            onSelectGlossary={handleSelectGlossary}
            onCreateGlossary={handleNewGlossaryClick}
            onEditGlossary={handleEditGlossaryClick}
            onDeleteGlossary={handleDeleteGlossary}
          />
        </div>

        <div className="lg:col-span-3">
          <TermList
            activeGlossary={activeGlossary}
            terms={terms}
            searchTerm={searchTerm}
            isLoading={totalLoading}
            onSearchChange={setSearchTerm}
            onEditTerm={handleEditTermClick}
            onDeleteTerm={handleDeleteTerm}
            onAddTermClick={handleAddTermClick}
          />
          
          {activeGlossary && (
            <TermEditor
              isOpen={isTermDialogOpen}
              isLoading={totalLoading}
              editingTerm={editingTerm}
              onOpenChange={setIsTermDialogOpen}
              onAddTerm={handleAddTerm}
              onUpdateTerm={handleUpdateTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateDictionariesSection;

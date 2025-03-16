
import { useState } from 'react';
import { Glossary } from '@/types/organization';
import { GlossaryTerm } from '@/types/glossary';
import { toast } from 'sonner';
import { useGlossaryList } from '@/hooks/glossary/useGlossaryList';
import { useGlossaryTerms } from '@/hooks/glossary/useGlossaryTerms';

interface GlossaryFormValues {
  name: string;
  description: string;
}

interface TermFormValues {
  term: string;
  definition: string;
  category: string;
}

export const usePrivateDictionaries = (organizationId: string | undefined) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGlossaryDialogOpen, setIsGlossaryDialogOpen] = useState(false);
  const [editingGlossary, setEditingGlossary] = useState<Glossary | null>(null);
  const [isTermDialogOpen, setIsTermDialogOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);

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
    try {
      const newGlossary = await createGlossary(values.name, values.description);
      if (newGlossary) {
        setIsGlossaryDialogOpen(false);
        toast.success("Dictionary created successfully");
      }
    } catch (error) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create dictionary");
    }
  };

  // Update existing glossary
  const handleUpdateGlossary = async (glossaryId: string, values: GlossaryFormValues) => {
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
    }
  };

  // Handle delete glossary
  const handleDeleteGlossary = async (glossaryId: string) => {
    try {
      await deleteGlossary(glossaryId);
      toast.success("Dictionary deleted successfully");
    } catch (error) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete dictionary");
    }
  };

  // Add new term to glossary
  const handleAddTerm = async (values: TermFormValues) => {
    if (!activeGlossary?.id) {
      toast.error("No dictionary selected");
      return;
    }
    
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
    }
  };

  // Update an existing term
  const handleUpdateTerm = async (termId: string, values: TermFormValues) => {
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
    }
  };

  // Handle edit term button click
  const handleEditTermClick = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setIsTermDialogOpen(true);
  };

  // Handle delete term
  const handleDeleteTerm = async (termId: string) => {
    try {
      await deleteTerm(termId);
      toast.success("Term deleted successfully");
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    }
  };

  // Handle add new term button click
  const handleAddTermClick = () => {
    setEditingTerm(null);
    setIsTermDialogOpen(true);
  };

  return {
    glossaries,
    activeGlossary,
    terms,
    searchTerm,
    setSearchTerm,
    isGlossaryDialogOpen,
    setIsGlossaryDialogOpen,
    editingGlossary,
    isTermDialogOpen,
    setIsTermDialogOpen,
    editingTerm,
    isGlossaryLoading,
    isTermsLoading,
    handleSelectGlossary,
    handleNewGlossaryClick,
    handleEditGlossaryClick,
    handleCreateGlossary,
    handleUpdateGlossary,
    handleDeleteGlossary,
    handleAddTerm,
    handleUpdateTerm,
    handleEditTermClick,
    handleDeleteTerm,
    handleAddTermClick
  };
};

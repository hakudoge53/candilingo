
import { useState } from 'react';
import { Glossary } from '@/types/organization';
import { GlossaryTerm } from '@/types/glossary';
import { useGlossaryList } from '@/hooks/glossary/useGlossaryList';
import { useGlossaryTerms } from '@/hooks/glossary/useGlossaryTerms';
import { useGlossaryOperations, GlossaryFormValues } from './useGlossaryOperations';
import { useTermOperations, TermFormValues } from './useTermOperations';

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

  // Use the glossary operations hook
  const {
    handleSelectGlossary,
    handleEditGlossaryClick,
    handleCreateGlossary,
    handleUpdateGlossary,
    handleDeleteGlossary
  } = useGlossaryOperations(
    organizationId,
    glossaries,
    activeGlossary,
    setActiveGlossary,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    setIsGlossaryDialogOpen,
    setEditingGlossary
  );

  // Use the term operations hook
  const {
    handleEditTermClick,
    handleAddTermClick,
    handleAddTerm,
    handleUpdateTerm,
    handleDeleteTerm
  } = useTermOperations(
    activeGlossary,
    addTerm,
    updateTerm,
    deleteTerm,
    setIsTermDialogOpen,
    setEditingTerm
  );

  // Handle new glossary dialog
  const handleNewGlossaryClick = () => {
    setEditingGlossary(null);
    setIsGlossaryDialogOpen(true);
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

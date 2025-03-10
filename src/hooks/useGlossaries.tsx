
import { useState, useEffect } from 'react';
import { Glossary, GlossaryTerm } from '@/types/organization';
import { useGlossaryList } from './glossary/useGlossaryList';
import { useGlossaryTerms } from './glossary/useGlossaryTerms';

// This is a facade hook that combines the functionality of the more focused hooks
// while maintaining the same API for backward compatibility
export const useGlossaries = (organizationId?: string) => {
  const {
    glossaries,
    activeGlossary,
    setActiveGlossary,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    isLoading: isGlossaryLoading,
    error: glossaryError,
    refetch: refetchGlossaries
  } = useGlossaryList(organizationId);

  const {
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading: isTermsLoading,
    error: termsError,
    refetchTerms
  } = useGlossaryTerms(activeGlossary?.id);

  // Combine loading states
  const isLoading = isGlossaryLoading || isTermsLoading;
  
  // Combine errors
  const error = glossaryError || termsError;

  return {
    glossaries,
    activeGlossary,
    setActiveGlossary,
    terms,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading,
    error,
    refetch: refetchGlossaries,
    refetchTerms: () => activeGlossary && refetchTerms(activeGlossary.id)
  };
};

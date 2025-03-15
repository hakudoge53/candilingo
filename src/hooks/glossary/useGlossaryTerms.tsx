
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GlossaryTerm } from '@/types/organization';
import { useAuth } from '../useAuth';
import { UseGlossaryTermsReturn } from './types';

export const useGlossaryTerms = (glossaryId?: string): UseGlossaryTermsReturn => {
  const { isLoggedIn } = useAuth();
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch terms for a glossary
  const fetchTerms = async (currentGlossaryId: string) => {
    if (!isLoggedIn || !currentGlossaryId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .eq('glossary_id', currentGlossaryId)
        .order('term', { ascending: true });
      
      if (error) throw error;
      
      setTerms(data);
    } catch (error: any) {
      console.error("Error fetching terms:", error);
      setError(error.message);
      toast.error("Failed to load glossary terms");
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new term
  const addTerm = async (glossaryId: string, term: string, definition: string, category?: string) => {
    if (!isLoggedIn || !glossaryId) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .insert([{ 
          glossary_id: glossaryId,
          term,
          definition,
          category
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      setTerms(prev => [...prev, data]);
      
      toast.success("Term added successfully");
      return data;
    } catch (error: any) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a term
  const updateTerm = async (termId: string, updates: Partial<GlossaryTerm>) => {
    if (!isLoggedIn) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .update(updates)
        .eq('id', termId)
        .select()
        .single();
      
      if (error) throw error;
      
      setTerms(prev => 
        prev.map(term => 
          term.id === termId ? data : term
        )
      );
      
      toast.success("Term updated successfully");
      return data;
    } catch (error: any) {
      console.error("Error updating term:", error);
      toast.error("Failed to update term");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a term
  const deleteTerm = async (termId: string) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('glossary_terms')
        .delete()
        .eq('id', termId);
      
      if (error) throw error;
      
      setTerms(prev => prev.filter(term => term.id !== termId));
      
      toast.success("Term deleted successfully");
    } catch (error: any) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    } finally {
      setIsLoading(false);
    }
  };

  // Load terms when glossary ID changes
  useEffect(() => {
    if (glossaryId) {
      fetchTerms(glossaryId);
    } else {
      setTerms([]);
    }
  }, [glossaryId]);

  return {
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading,
    error,
    refetchTerms: fetchTerms
  };
};

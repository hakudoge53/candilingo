
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Glossary, GlossaryTerm } from '@/types/organization';
import { toast } from 'sonner';

export interface UseGlossariesReturn {
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  createGlossary: (name: string, description?: string) => Promise<Glossary | null>;
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>;
  deleteGlossary: (glossaryId: string) => Promise<void>;
  terms: GlossaryTerm[];
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>;
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>;
  deleteTerm: (termId: string) => Promise<void>;
  isLoading: boolean;
  isLoadingTerms: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refetchTerms: (glossaryId?: string) => Promise<void>;
}

export const useGlossaries = (organizationId: string | undefined): UseGlossariesReturn => {
  const [glossaries, setGlossaries] = useState<Glossary[]>([]);
  const [activeGlossary, setActiveGlossary] = useState<Glossary | null>(null);
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTerms, setIsLoadingTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch glossaries for the organization
  const fetchGlossaries = async () => {
    if (!organizationId) {
      setGlossaries([]);
      setActiveGlossary(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .select('*')
        .eq('organization_id', organizationId)
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      setGlossaries(data);
      
      // Set active glossary to first one if none is selected
      if (data.length > 0 && (!activeGlossary || !data.find(g => g.id === activeGlossary.id))) {
        setActiveGlossary(data[0]);
      }
    } catch (error: any) {
      console.error("Error fetching glossaries:", error);
      setError(error.message);
      toast.error("Failed to load glossaries");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch terms for the active glossary
  const fetchTerms = async (glossaryId?: string) => {
    const targetGlossaryId = glossaryId || activeGlossary?.id;
    
    if (!targetGlossaryId) {
      setTerms([]);
      return;
    }
    
    setIsLoadingTerms(true);
    
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .eq('glossary_id', targetGlossaryId)
        .order('term', { ascending: true });
      
      if (error) throw error;
      
      setTerms(data);
    } catch (error: any) {
      console.error("Error fetching terms:", error);
      toast.error("Failed to load glossary terms");
    } finally {
      setIsLoadingTerms(false);
    }
  };

  // Create a new glossary
  const createGlossary = async (name: string, description?: string): Promise<Glossary | null> => {
    if (!organizationId) return null;
    
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .insert({
          name,
          description,
          organization_id: organizationId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newGlossary = data as Glossary;
      
      setGlossaries(prev => [...prev, newGlossary]);
      setActiveGlossary(newGlossary);
      
      toast.success("Glossary created successfully");
      return newGlossary;
    } catch (error: any) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create glossary");
      return null;
    }
  };

  // Update an existing glossary
  const updateGlossary = async (glossaryId: string, updates: Partial<Glossary>): Promise<Glossary | null> => {
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .update(updates)
        .eq('id', glossaryId)
        .select()
        .single();
      
      if (error) throw error;
      
      const updatedGlossary = data as Glossary;
      
      // Update in state
      setGlossaries(prev => 
        prev.map(g => g.id === glossaryId ? updatedGlossary : g)
      );
      
      // Update active glossary if it's the one being edited
      if (activeGlossary?.id === glossaryId) {
        setActiveGlossary(updatedGlossary);
      }
      
      toast.success("Glossary updated successfully");
      return updatedGlossary;
    } catch (error: any) {
      console.error("Error updating glossary:", error);
      toast.error("Failed to update glossary");
      return null;
    }
  };

  // Delete a glossary
  const deleteGlossary = async (glossaryId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('glossaries')
        .delete()
        .eq('id', glossaryId);
      
      if (error) throw error;
      
      // Remove from state
      const updatedGlossaries = glossaries.filter(g => g.id !== glossaryId);
      setGlossaries(updatedGlossaries);
      
      // If the active glossary was deleted, set a new active glossary
      if (activeGlossary?.id === glossaryId) {
        setActiveGlossary(updatedGlossaries.length > 0 ? updatedGlossaries[0] : null);
      }
      
      toast.success("Glossary deleted successfully");
    } catch (error: any) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete glossary");
    }
  };

  // Add a new term to a glossary
  const addTerm = async (glossaryId: string, term: string, definition: string, category?: string): Promise<GlossaryTerm | null> => {
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .insert({
          glossary_id: glossaryId,
          term,
          definition,
          category
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newTerm = data as GlossaryTerm;
      
      // Add to state if it belongs to the active glossary
      if (activeGlossary?.id === glossaryId) {
        setTerms(prev => [...prev, newTerm]);
      }
      
      toast.success("Term added successfully");
      return newTerm;
    } catch (error: any) {
      console.error("Error adding term:", error);
      toast.error("Failed to add term");
      return null;
    }
  };

  // Update an existing term
  const updateTerm = async (termId: string, updates: Partial<GlossaryTerm>): Promise<GlossaryTerm | null> => {
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .update(updates)
        .eq('id', termId)
        .select()
        .single();
      
      if (error) throw error;
      
      const updatedTerm = data as GlossaryTerm;
      
      // Update in state
      setTerms(prev => 
        prev.map(t => t.id === termId ? updatedTerm : t)
      );
      
      toast.success("Term updated successfully");
      return updatedTerm;
    } catch (error: any) {
      console.error("Error updating term:", error);
      toast.error("Failed to update term");
      return null;
    }
  };

  // Delete a term
  const deleteTerm = async (termId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('glossary_terms')
        .delete()
        .eq('id', termId);
      
      if (error) throw error;
      
      // Remove from state
      setTerms(prev => prev.filter(t => t.id !== termId));
      
      toast.success("Term deleted successfully");
    } catch (error: any) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    }
  };

  // Load glossaries when organization ID changes
  useEffect(() => {
    fetchGlossaries();
  }, [organizationId]);

  // Load terms when active glossary changes
  useEffect(() => {
    if (activeGlossary) {
      fetchTerms(activeGlossary.id);
    } else {
      setTerms([]);
    }
  }, [activeGlossary]);

  return {
    glossaries,
    activeGlossary,
    setActiveGlossary,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading,
    isLoadingTerms,
    error,
    refetch: fetchGlossaries,
    refetchTerms: fetchTerms
  };
};

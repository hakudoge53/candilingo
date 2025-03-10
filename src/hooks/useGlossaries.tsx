
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Glossary, GlossaryTerm } from '@/types/organization';
import { useAuth } from './useAuth';

export const useGlossaries = (organizationId?: string) => {
  const { isLoggedIn } = useAuth();
  const [glossaries, setGlossaries] = useState<Glossary[]>([]);
  const [activeGlossary, setActiveGlossary] = useState<Glossary | null>(null);
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch glossaries for organization
  const fetchGlossaries = async () => {
    if (!isLoggedIn || !organizationId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setGlossaries(data);
      
      // Set active glossary to first one by default if none is selected
      if (data.length > 0 && !activeGlossary) {
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

  // Create a new glossary
  const createGlossary = async (name: string, description?: string) => {
    if (!isLoggedIn || !organizationId) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .insert([{ 
          organization_id: organizationId,
          name,
          description
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      setGlossaries(prev => [data, ...prev]);
      setActiveGlossary(data);
      
      toast.success("Glossary created successfully");
      return data;
    } catch (error: any) {
      console.error("Error creating glossary:", error);
      toast.error("Failed to create glossary");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a glossary
  const updateGlossary = async (glossaryId: string, updates: Partial<Glossary>) => {
    if (!isLoggedIn) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .update(updates)
        .eq('id', glossaryId)
        .select()
        .single();
      
      if (error) throw error;
      
      setGlossaries(prev => 
        prev.map(glossary => 
          glossary.id === glossaryId ? data : glossary
        )
      );
      
      if (activeGlossary?.id === glossaryId) {
        setActiveGlossary(data);
      }
      
      toast.success("Glossary updated successfully");
      return data;
    } catch (error: any) {
      console.error("Error updating glossary:", error);
      toast.error("Failed to update glossary");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a glossary
  const deleteGlossary = async (glossaryId: string) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('glossaries')
        .delete()
        .eq('id', glossaryId);
      
      if (error) throw error;
      
      setGlossaries(prev => prev.filter(glossary => glossary.id !== glossaryId));
      
      if (activeGlossary?.id === glossaryId) {
        setActiveGlossary(glossaries.length > 1 ? glossaries[0] : null);
      }
      
      toast.success("Glossary deleted successfully");
    } catch (error: any) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete glossary");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch terms for active glossary
  const fetchTerms = async (glossaryId: string) => {
    if (!isLoggedIn || !glossaryId) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .eq('glossary_id', glossaryId)
        .order('term', { ascending: true });
      
      if (error) throw error;
      
      setTerms(data);
    } catch (error: any) {
      console.error("Error fetching terms:", error);
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

  // Load glossaries when organization ID changes
  useEffect(() => {
    if (organizationId) {
      fetchGlossaries();
    } else {
      setGlossaries([]);
      setActiveGlossary(null);
      setTerms([]);
    }
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
    terms,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading,
    error,
    refetch: fetchGlossaries,
    refetchTerms: () => activeGlossary && fetchTerms(activeGlossary.id)
  };
};

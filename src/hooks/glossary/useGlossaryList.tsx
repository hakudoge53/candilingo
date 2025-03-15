
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Glossary } from '@/types/organization';
import { useAuth } from '../useAuth';
import { UseGlossaryListReturn } from './types';

export const useGlossaryList = (organizationId?: string): UseGlossaryListReturn => {
  const { isLoggedIn } = useAuth();
  const [glossaries, setGlossaries] = useState<Glossary[]>([]);
  const [activeGlossary, setActiveGlossary] = useState<Glossary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all glossaries for an organization
  const fetchGlossaries = async () => {
    if (!isLoggedIn || !organizationId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('glossaries')
        .select('*')
        .eq('organization_id', organizationId)
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      setGlossaries(data || []);
      
      // Set the first glossary as active if we don't have an active one
      if (data.length > 0 && !activeGlossary) {
        setActiveGlossary(data[0]);
      } else if (activeGlossary) {
        // Make sure the active glossary is still in the list
        const stillExists = data.some(g => g.id === activeGlossary.id);
        if (!stillExists && data.length > 0) {
          setActiveGlossary(data[0]);
        } else if (!stillExists) {
          setActiveGlossary(null);
        }
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
  const createGlossary = async (name: string, description?: string): Promise<Glossary | null> => {
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
      
      setGlossaries(prev => [...prev, data]);
      
      // If this is the first glossary, set it as active
      if (glossaries.length === 0) {
        setActiveGlossary(data);
      }
      
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

  // Update an existing glossary
  const updateGlossary = async (glossaryId: string, updates: Partial<Glossary>): Promise<Glossary | null> => {
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
      
      // Update active glossary if it's the one being edited
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
  const deleteGlossary = async (glossaryId: string): Promise<void> => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('glossaries')
        .delete()
        .eq('id', glossaryId);
      
      if (error) throw error;
      
      // Remove from the state
      setGlossaries(prev => prev.filter(glossary => glossary.id !== glossaryId));
      
      // If the active glossary is deleted, set the first available one as active
      if (activeGlossary?.id === glossaryId) {
        const remaining = glossaries.filter(g => g.id !== glossaryId);
        setActiveGlossary(remaining.length > 0 ? remaining[0] : null);
      }
      
      toast.success("Glossary deleted successfully");
    } catch (error: any) {
      console.error("Error deleting glossary:", error);
      toast.error("Failed to delete glossary");
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
    }
  }, [organizationId]);

  return {
    glossaries,
    activeGlossary,
    setActiveGlossary,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    isLoading,
    error,
    refetch: fetchGlossaries
  };
};

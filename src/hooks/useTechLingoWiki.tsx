
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface TechLingoTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  difficulty?: string;
  created_at: string;
  updated_at?: string;
}

// Function to fetch tech lingo terms from Supabase
const fetchTechLingoTerms = async (): Promise<TechLingoTerm[]> => {
  const { data, error } = await supabase
    .from('techlingo_terms')
    .select('*')
    .order('term', { ascending: true });

  if (error) {
    console.error("Error fetching tech lingo terms:", error);
    throw new Error(error.message);
  }

  return data as TechLingoTerm[];
};

// Function to add a new term
const addTechLingoTerm = async (newTerm: Omit<TechLingoTerm, 'id' | 'created_at' | 'updated_at'>): Promise<TechLingoTerm> => {
  const { data, error } = await supabase
    .from('techlingo_terms')
    .insert([newTerm])
    .select()
    .single();

  if (error) {
    console.error("Error adding tech lingo term:", error);
    throw new Error(error.message);
  }

  return data as TechLingoTerm;
};

// Function to update an existing term
const updateTechLingoTerm = async ({ id, ...updatedTerm }: Partial<TechLingoTerm> & { id: string }): Promise<TechLingoTerm> => {
  const { data, error } = await supabase
    .from('techlingo_terms')
    .update(updatedTerm)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("Error updating tech lingo term:", error);
    throw new Error(error.message);
  }

  return data as TechLingoTerm;
};

// Function to delete a term
const deleteTechLingoTerm = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('techlingo_terms')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting tech lingo term:", error);
    throw new Error(error.message);
  }
};

export const useTechLingoWiki = () => {
  const queryClient = useQueryClient();

  // Fetch terms with React Query
  const { 
    data: terms = [], 
    isLoading, 
    error,
    refetch
  } = useQuery({
    queryKey: ['techLingoTerms'],
    queryFn: fetchTechLingoTerms,
  });

  // Add term mutation
  const addTermMutation = useMutation({
    mutationFn: addTechLingoTerm,
    onSuccess: () => {
      toast.success("Term added successfully");
      queryClient.invalidateQueries({ queryKey: ['techLingoTerms'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to add term: ${error.message}`);
    }
  });

  // Update term mutation
  const updateTermMutation = useMutation({
    mutationFn: updateTechLingoTerm,
    onSuccess: () => {
      toast.success("Term updated successfully");
      queryClient.invalidateQueries({ queryKey: ['techLingoTerms'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update term: ${error.message}`);
    }
  });

  // Delete term mutation
  const deleteTermMutation = useMutation({
    mutationFn: deleteTechLingoTerm,
    onSuccess: () => {
      toast.success("Term deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['techLingoTerms'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete term: ${error.message}`);
    }
  });

  // Helper function to get terms by category
  const getTermsByCategory = () => {
    const categories: Record<string, TechLingoTerm[]> = {};
    
    terms.forEach(term => {
      const category = term.category || 'General';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(term);
    });
    
    return categories;
  };

  // Helper function to search terms
  const searchTerms = (query: string) => {
    if (!query.trim()) return terms;
    
    const lowerQuery = query.toLowerCase();
    return terms.filter(term => 
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      (term.category && term.category.toLowerCase().includes(lowerQuery))
    );
  };

  // Helper function to get all available categories
  const getCategories = () => {
    const categorySet = new Set<string>();
    terms.forEach(term => {
      categorySet.add(term.category || 'General');
    });
    return Array.from(categorySet).sort();
  };

  // Helper function to get all available difficulty levels
  const getDifficultyLevels = () => {
    const difficultySet = new Set<string>();
    terms.forEach(term => {
      difficultySet.add(term.difficulty || 'Beginner');
    });
    return Array.from(difficultySet).sort();
  };

  // Filter terms by difficulty
  const filterByDifficulty = (difficulty: string) => {
    if (!difficulty) return terms;
    return terms.filter(term => term.difficulty === difficulty);
  };

  return {
    terms,
    isLoading,
    error,
    refreshTerms: refetch,
    addTerm: (term: string, definition: string, category?: string, difficulty?: string) => 
      addTermMutation.mutate({ term, definition, category, difficulty }),
    updateTerm: (id: string, term: string, definition: string, category?: string, difficulty?: string) => 
      updateTermMutation.mutate({ id, term, definition, category, difficulty }),
    deleteTerm: (id: string) => deleteTermMutation.mutate(id),
    getTermsByCategory,
    searchTerms,
    getCategories,
    getDifficultyLevels,
    filterByDifficulty,
    isAdding: addTermMutation.isPending,
    isUpdating: updateTermMutation.isPending,
    isDeleting: deleteTermMutation.isPending
  };
};

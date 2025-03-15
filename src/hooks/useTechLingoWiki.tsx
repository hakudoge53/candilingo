
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TechLingoTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  difficulty?: string;
  created_at: string;
}

export const useTechLingoWiki = () => {
  const [terms, setTerms] = useState<TechLingoTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tech lingo terms
  const fetchTerms = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // We need to handle the table name properly. If the table doesn't exist yet,
      // we'll return an empty array and show a toast message.
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .limit(100);
      
      if (error) {
        console.error("Error fetching tech lingo terms:", error);
        setError(error.message);
        return;
      }
      
      // Map the data to our interface
      const techLingoTerms: TechLingoTerm[] = (data || []).map((item: any) => ({
        id: item.id,
        term: item.term || '',
        definition: item.definition || '',
        category: item.category || 'General',
        difficulty: item.difficulty || 'Beginner',
        created_at: item.created_at
      }));
      
      setTerms(techLingoTerms);
    } catch (error: any) {
      console.error("Error in fetchTerms:", error);
      setError(error.message);
      toast.error("Failed to load tech lingo terms");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch terms on component mount
  useEffect(() => {
    fetchTerms();
  }, []);

  return {
    terms,
    isLoading,
    error,
    refreshTerms: fetchTerms
  };
};

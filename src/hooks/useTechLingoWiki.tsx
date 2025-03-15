
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TechLingoWikiTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  source_url?: string;
  created_at: string;
  updated_at: string;
}

export const useTechLingoWiki = (searchTerm?: string) => {
  const [terms, setTerms] = useState<TechLingoWikiTerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('techlingo_terms')
          .select('*')
          .order('term', { ascending: true });

        if (searchTerm) {
          query = query.ilike('term', `%${searchTerm}%`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        
        // Cast the data to the correct type
        const typedData = data as unknown as TechLingoWikiTerm[];
        setTerms(typedData || []);
      } catch (err: any) {
        console.error('Error fetching TechLingo terms:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, [searchTerm]);

  return { terms, isLoading, error };
};

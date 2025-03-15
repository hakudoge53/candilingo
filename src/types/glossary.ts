
export interface GlossaryTerm {
  id?: string;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  glossary_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Re-export the Glossary type from the organization types
export { Glossary } from '@/types/organization';

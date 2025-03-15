
export interface GlossaryTerm {
  id: string; // Make id required to match the organization definition
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  glossary_id: string; // Make this required as well
  created_at?: string;
  updated_at?: string;
}

// Re-export the Glossary type from the organization types with proper syntax
export type { Glossary } from '@/types/organization';

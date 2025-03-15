
import { Glossary, GlossaryTerm } from '@/types/organization';

// Re-export the types with proper 'export type' syntax to fix the TS1205 error
export type { Glossary, GlossaryTerm } from '@/types/organization';

// Common interfaces for the glossary hooks
export interface UseGlossaryListReturn {
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  createGlossary: (name: string, description?: string) => Promise<Glossary | null>;
  updateGlossary: (glossaryId: string, updates: Partial<Glossary>) => Promise<Glossary | null>;
  deleteGlossary: (glossaryId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGlossaryTermsReturn {
  terms: GlossaryTerm[];
  addTerm: (glossaryId: string, term: string, definition: string, category?: string) => Promise<GlossaryTerm | null>;
  updateTerm: (termId: string, updates: Partial<GlossaryTerm>) => Promise<GlossaryTerm | null>;
  deleteTerm: (termId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetchTerms: (glossaryId: string) => Promise<void>;
}

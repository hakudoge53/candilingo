
// Export types from this central location
// This is just an optional file to re-export types from the main types file
// to maintain consistency in the organization folder structure
export type { 
  Organization, 
  OrganizationMember, 
  UserRole,
  Glossary,
  GlossaryTerm,
} from '@/types/organization';

// Export these as regular exports since they're not types but values
export { 
  ROLE_LABELS,
  ROLE_DESCRIPTIONS
} from '@/types/organization';

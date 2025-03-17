
export interface Glossary {
  id: string;
  name: string;
  description?: string;
  organization_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  url?: string;
  glossary_id: string;
  created_at?: string;
  updated_at?: string;
}

// Role labels and descriptions for the organization
export const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  manager: 'Manager',
  team_lead: 'Team Lead',
  employee: 'Employee',
  consultant: 'Consultant',
  owner: 'Owner'
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  super_admin: 'Full access to all features and settings.',
  admin: 'Full access to organization settings and user management.',
  manager: 'Manage teams and projects, limited administrative access.',
  team_lead: 'Lead a team and manage team members.',
  employee: 'Regular member with standard access.',
  consultant: 'External contributor with limited access.',
  owner: 'Organization owner with full control'
};

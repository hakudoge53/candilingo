
export type UserRole = 'admin' | 'manager' | 'team_lead' | 'employee' | 'consultant' | 'owner' | 'super_admin';

export type MemberStatus = 'active' | 'pending' | 'declined' | 'inactive';

export interface Organization {
  id: string;
  name: string;
  role: UserRole;
  member_count: number;
  created_at?: string;
  active?: boolean;
  created_by?: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  invited_email: string | null;
  invited_name: string | null;
  role: UserRole;
  status: MemberStatus;
  invitation_token: string | null;
  created_at?: string;
  user: {
    id?: string;
    name: string | null;
    email: string;
    avatar_url?: string | null;
  };
}

// Add Glossary and GlossaryTerm interfaces
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
  relatedTerms?: string[]; // Explicitly add relatedTerms property
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

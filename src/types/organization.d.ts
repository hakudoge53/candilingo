
// Organization types
export interface Organization {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  active: boolean;
}

// Define literal types for member statuses
export type MemberStatus = 'active' | 'pending' | 'declined';

// Define user roles
export type UserRole = 'admin' | 'manager' | 'team_lead' | 'employee' | 'consultant';

// Organization member type
export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
  invitation_token?: string | null;
  invited_email?: string | null;
  invited_name?: string | null;
  user?: {
    name?: string;
    email?: string;
    membership_tier?: string;
    status?: string;
  };
}

// Glossary types
export interface Glossary {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface GlossaryTerm {
  id: string;
  glossary_id: string;
  term: string;
  definition: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

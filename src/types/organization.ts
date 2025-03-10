
import { User } from '@/hooks/useAuth';

export type UserRole = 'admin' | 'manager' | 'team_lead' | 'employee' | 'consultant';

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  active: boolean;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  invited_email?: string;
  invited_name?: string;
  invitation_token?: string;
  status: 'pending' | 'active' | 'declined';
  created_at: string;
  updated_at: string;
  // Joined data
  user?: User;
}

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

export const ROLE_LABELS: Record<UserRole, string> = {
  'admin': 'Admin',
  'manager': 'Manager',
  'team_lead': 'Team Lead',
  'employee': 'Employee',
  'consultant': 'Consultant'
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  'admin': 'Full access to manage organizations, members, and all glossaries.',
  'manager': 'Can manage glossaries and invite members, but cannot delete the organization.',
  'team_lead': 'Can manage team glossary terms and view all organizational data.',
  'employee': 'Can view and use all glossaries within the organization.',
  'consultant': 'Limited access to specific glossaries for temporary collaboration.'
};

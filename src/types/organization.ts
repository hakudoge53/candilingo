
import { User } from '@/hooks/useAuth';

// Use the same UserRole and MemberStatus types as defined in organization.d.ts
export type UserRole = 'owner' | 'admin' | 'member';
export type MemberStatus = 'pending' | 'active' | 'inactive';

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
  status: MemberStatus;
  created_at: string;
  updated_at: string;
  invited_email: string | null;
  invited_name: string | null;
  invitation_token: string | null;
  user: {
    name: string;
    email: string;
    membership_tier?: string;
    status?: string;
  } | null;
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
  'owner': 'Owner',
  'admin': 'Admin',
  'member': 'Member'
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  'owner': 'Full access to manage organizations, members, and all glossaries.',
  'admin': 'Can manage glossaries and invite members, but cannot delete the organization.',
  'member': 'Can view and use all glossaries within the organization.'
};

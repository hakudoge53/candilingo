
export type { GlossaryTerm } from '@/types/glossary';

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'employee';
  status: 'pending' | 'active' | 'inactive';
  invited_email?: string;
  invited_name?: string;
  invitation_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  active: boolean;
}

export interface Glossary {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationInvitation {
  id: string;
  organization_id: string;
  invited_email: string;
  invited_name?: string;
  role: 'owner' | 'admin' | 'employee';
  invitation_token: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

export type UserRole = 'owner' | 'admin' | 'employee';
export type MemberStatus = 'pending' | 'active' | 'inactive';

export const ROLE_LABELS: Record<string, string> = {
  'owner': 'Owner',
  'admin': 'Administrator',
  'employee': 'Employee'
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  'owner': 'Full access to all organization settings and billing. Can add/remove members and change roles.',
  'admin': 'Can manage glossaries and members, but cannot change billing or delete the organization.',
  'employee': 'Can use glossaries and add terms, but cannot modify organization settings.'
};

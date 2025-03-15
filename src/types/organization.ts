
export type { GlossaryTerm } from '@/types/glossary';

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  status: MemberStatus;
  invited_email?: string | null;
  invited_name?: string | null;
  invitation_token?: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
    email: string;
    membership_tier?: string;
    status?: string;
  } | null;
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
  role: UserRole;
  invitation_token: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

export type UserRole = 'owner' | 'admin' | 'member' | 'manager' | 'team_lead' | 'employee' | 'consultant';
export type MemberStatus = 'pending' | 'active' | 'inactive';

export const ROLE_LABELS: Record<string, string> = {
  'owner': 'Owner',
  'admin': 'Administrator',
  'member': 'Member',
  'manager': 'Manager',
  'team_lead': 'Team Lead',
  'employee': 'Employee',
  'consultant': 'Consultant'
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  'owner': 'Full access to all organization settings and billing. Can add/remove members and change roles.',
  'admin': 'Can manage glossaries and members, but cannot change billing or delete the organization.',
  'member': 'Standard member access to all shared resources.',
  'manager': 'Can manage team members and their access levels.',
  'team_lead': 'Can lead projects and manage team assignments.',
  'employee': 'Can use glossaries and add terms, but cannot modify organization settings.',
  'consultant': 'Limited access for external collaborators.'
};

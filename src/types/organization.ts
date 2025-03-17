
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
    avatar_url?: string | null;
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

// User roles based on Supabase database enum
export type UserRole = 'super_admin' | 'owner' | 'admin' | 'manager' | 'team_lead' | 'employee' | 'consultant';
export type MemberStatus = 'pending' | 'active' | 'inactive';

export const ROLE_LABELS: Record<string, string> = {
  'super_admin': 'Super Admin',
  'owner': 'Business Owner',
  'admin': 'Administrator',
  'manager': 'Manager',
  'team_lead': 'Team Lead',
  'employee': 'Employee',
  'consultant': 'Consultant'
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  'super_admin': 'Full access to all organizations and system settings. Candilingo administrator only.',
  'owner': 'Full access to organization settings and billing. Can add/remove members and change roles.',
  'admin': 'Administrative access to organization settings and resources.',
  'manager': 'Can manage organization resources, members, and team assignments, but cannot change billing.',
  'team_lead': 'Can lead projects and manage team assignments within assigned areas.',
  'employee': 'Standard member access to shared resources without administrative privileges.',
  'consultant': 'Limited access to specific resources as an external collaborator.'
};

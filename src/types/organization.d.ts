
export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  invited_email: string | null;
  invited_name: string | null;
  role: UserRole;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
  invitation_token: string | null;
  user: {
    name: string;
    email: string;
    membership_tier?: string;
    status?: string;
  } | null;
}

export type UserRole =
  | 'owner'
  | 'admin'
  | 'member'
  | 'manager'
  | 'team_lead'
  | 'employee'
  | 'consultant';

export type MemberStatus =
  | 'pending'
  | 'active'
  | 'inactive';

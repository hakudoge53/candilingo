export type UserRole = 'admin' | 'manager' | 'team_lead' | 'employee' | 'consultant' | 'owner';

export type MemberStatus = 'active' | 'pending' | 'declined' | 'inactive';

export interface Organization {
  id: string;
  name: string;
  role: UserRole;
  member_count: number;
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
  user: {
    id?: string;
    name: string | null;
    email: string;
    avatar_url?: string | null;
  };
}

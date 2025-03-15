
import { Organization, OrganizationMember, UserRole } from '@/types/organization';

export interface OrganizationInvitation {
  id: string;
  organization_id: string;
  invited_email: string;
  invited_name: string | null;
  role: UserRole;
  status: string;
  created_at: string;
}

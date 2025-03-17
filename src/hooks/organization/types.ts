
import { Organization, OrganizationMember, UserRole } from '@/types/organization';

// Define UserSettings interface with active_organization_id
export interface UserSettings {
  id?: string;
  user_id: string; // Required as it's needed for database operations
  highlight_enabled?: boolean;
  highlight_color?: string;
  created_at?: string;
  updated_at?: string;
  active_organization_id?: string;
}

// Export common interfaces used by organization hooks
export interface UseOrganizationsFetchReturn {
  organizations: Organization[];
  fetchOrganizations: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface UseActiveOrganizationReturn {
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => Promise<void>;
  error: string | null;
}

export interface UseOrganizationCreateReturn {
  createOrganization: (name: string) => Promise<Organization | null>;
  isLoading: boolean;
  error: string | null;
}

export interface UseOrganizationListReturn {
  organizations: Organization[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  createNewOrganization: (name: string) => Promise<Organization | null>;
  organizationsLoading: boolean;
}

export interface UseOrganizationOperationsReturn {
  updateOrganization: (id: string, name: string) => Promise<boolean>;
  deleteOrganization: (id: string) => Promise<boolean>;
  leaveOrganization: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

// Team-related interfaces
export interface Team {
  id: string;
  name: string;
  description?: string;
  organization_id: string;
  created_at?: string;
  updated_at?: string;
  member_count?: number;
}

export interface TeamMember {
  id: string;
  team_id: string;
  member_id: string;
  is_team_manager: boolean;
  created_at?: string;
  updated_at?: string;
  member?: OrganizationMember | {
    id: string;
    organization_id: string;
    user_id: string;
    invited_email: string | null;
    invited_name: string | null;
    role: UserRole;
    status: string; // Using string instead of MemberStatus for database compatibility
    invitation_token: string | null;
    created_at?: string;
    updated_at?: string;
    user?: {
      id?: string;
      name: string | null;
      email: string;
      avatar_url?: string | null;
    };
  };
}

// License-related interfaces
export interface OrganizationLicense {
  id: string;
  organization_id: string;
  total_licenses: number;
  used_licenses: number;
  license_type: string;
  created_at?: string;
  updated_at?: string;
}

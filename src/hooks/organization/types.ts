
import { Organization, OrganizationMember, UserRole, MemberStatus } from '@/types/organization';

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
  activeOrganizationId: string | null; // Added this property to match the implementation
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

// Define a type for the user object that might be an error
export interface UserData {
  id?: string;
  name: string | null;
  email: string;
  avatar_url?: string | null;
}

// Interface for error response from Supabase
export interface SelectQueryError {
  error: true;
  [key: string]: any;
}

// Updated TeamMember interface to handle Supabase query results more flexibly
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
    status: string | MemberStatus; // Using both string and MemberStatus for database compatibility
    invitation_token: string | null;
    created_at?: string;
    updated_at?: string;
    user?: UserData | SelectQueryError;
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

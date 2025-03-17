
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

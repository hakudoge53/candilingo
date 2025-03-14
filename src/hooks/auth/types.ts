
export interface User {
  id: string;
  name: string;
  email: string;
  membership_tier?: string;
  status?: string;
  preferred_language?: string;
  extension_settings?: Record<string, any>;
  // Remove hasOrganization field
}

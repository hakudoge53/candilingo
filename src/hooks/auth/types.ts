
export interface User {
  id: string;
  email: string;
  name: string;
  membership_tier: string;
  preferred_language: string;
  extension_settings: Record<string, any>;
  avatar_url?: string | null;
  status?: string;
}

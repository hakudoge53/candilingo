
import { AuthSession } from '@supabase/supabase-js';

export interface AuthSessionData {
  session: AuthSession | null;
  user: User | null;
}

export interface UserMetadata {
  name?: string;
  avatar_url?: string;
  organization_id?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  email_verified?: boolean;
  role?: string;
  user_metadata: UserMetadata;
  app_metadata?: {
    role?: string;
    [key: string]: any;
  };
  created_at: string;
  
  // Add these missing properties to fix TypeScript errors
  name?: string;
  avatar_url?: string;
  preferred_language?: string;
  membership_tier?: string;
  status?: string;
  extension_settings?: {
    auto_highlight?: boolean;
    tooltip_enabled?: boolean;
    style_preferences?: string;
    [key: string]: any;
  };
}

export interface AuthContextType {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
  activeUser: User | null;
}

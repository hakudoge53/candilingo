
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
}

export interface AuthContextType {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

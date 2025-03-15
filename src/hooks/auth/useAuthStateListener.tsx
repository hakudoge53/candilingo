
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User } from './types';
import { toast } from 'sonner';

interface AuthStateProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User;
  missingInformation: string[];
  handleLogout: () => Promise<void>;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setActiveUser: (user: User) => void;
  setMissingInformation: (missing: string[]) => void;
  pendingResetState: boolean;
  setPendingResetState: (pendingReset: boolean) => void;
}

export const useAuthStateListener = (authState: AuthStateProps) => {
  const { 
    setIsLoggedIn, 
    setIsLoading, 
    setActiveUser, 
    pendingResetState, 
    setPendingResetState 
  } = authState;

  // Listen for auth state changes
  useEffect(() => {
    setIsLoading(true);

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (session) {
          await handleSessionChange(session);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Handle authenticated user
    const handleSessionChange = async (session: Session | null) => {
      if (!session) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const userId = session.user.id;
        
        // Fetch the user profile data
        const { data: userData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          throw profileError;
        }
        
        // Map user data
        const user: User = {
          id: userId,
          email: session.user.email || '',
          name: userData?.name || '',
          membership_tier: userData?.membership_tier || 'Free',
          preferred_language: userData?.preferred_language || 'en',
          extension_settings: userData?.extension_settings || {},
          avatar_url: userData?.avatar_url || null
        };
        
        setActiveUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
      }
    };

    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "USER_UPDATED" && pendingResetState) {
          // Handle password reset completion
          setPendingResetState(false);
          toast.success("Password reset successfully");
          setIsLoading(false);
        }
        
        await handleSessionChange(session);
        setIsLoading(false);
      }
    );

    // Initial session check
    checkSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

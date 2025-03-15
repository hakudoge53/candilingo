
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthSession } from './useAuthSession';
import { useAuthActions } from './useAuthActions';
import { useAuthStateListener } from './useAuthStateListener';
import { User } from './types';

export function useAuth() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User>({
    id: '',
    email: '',
    name: '',
    profileId: '',
    membershipTier: 'Free',
    preferredLanguage: 'en',
    extensionSettings: {}
  });
  const [missingInformation, setMissingInformation] = useState<string[]>([]);
  const [pendingResetState, setPendingResetState] = useState(false);

  // Session management
  const { session } = useAuthSession();

  // Auth actions
  const {
    handleLogin,
    handleRegistration,
    handleForgotPassword,
    handleResetPassword
  } = useAuthActions({
    setIsLoading,
    setPendingResetState
  });

  // Auth state listener
  useAuthStateListener({
    isLoggedIn,
    isLoading,
    activeUser,
    missingInformation,
    handleLogout,
    setIsLoggedIn,
    setIsLoading,
    setActiveUser,
    pendingResetState,
    setPendingResetState
  });

  // Logout handler
  async function handleLogout() {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      
      // Reset state
      setIsLoggedIn(false);
      setActiveUser({
        id: '',
        email: '',
        name: '',
        profileId: '',
        membershipTier: 'Free',
        preferredLanguage: 'en',
        extensionSettings: {}
      });
      
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoggedIn,
    isLoading,
    activeUser,
    missingInformation,
    handleLogin,
    handleRegistration,
    handleForgotPassword,
    handleResetPassword,
    handleLogout
  };
}

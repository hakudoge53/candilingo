
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
    membership_tier: 'Free',
    preferred_language: 'en',
    extension_settings: {}
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
    handleResetPassword,
    handleLogout
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
    setPendingResetState,
    setMissingInformation
  });

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

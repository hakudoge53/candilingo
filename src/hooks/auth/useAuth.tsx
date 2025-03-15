
import { useState, useEffect } from 'react';
import { useAuthSession } from './useAuthSession';
import { useAuthStateListener } from './useAuthStateListener';
import { useAuthActions } from './useAuthActions';
import type { User } from './types';
import { supabase } from "@/integrations/supabase/client";

export type { User } from './types';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [missingInformation, setMissingInformation] = useState<string[]>([]);
  
  // Initialize the session
  const { isLoading: isSessionLoading } = useAuthSession();
  
  // Set up auth state listener
  useAuthStateListener({
    setIsLoggedIn,
    setActiveUser,
    setMissingInformation
  });
  
  // Get auth actions
  const { isLoading: isActionLoading, handleLogout } = useAuthActions();
  
  useEffect(() => {
    // Log auth status for debugging
    console.log("Auth state:", { 
      isLoggedIn, 
      activeUser: activeUser ? `${activeUser.id} (${activeUser.email})` : null,
      isLoading: isSessionLoading || isActionLoading 
    });
  }, [isLoggedIn, activeUser, isSessionLoading, isActionLoading]);
  
  return {
    isLoggedIn,
    isLoading: isSessionLoading || isActionLoading,
    activeUser,
    missingInformation,
    handleLogout
  };
};

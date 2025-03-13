
import { useState } from 'react';
import { useAuthSession } from './useAuthSession';
import { useAuthStateListener } from './useAuthStateListener';
import { useAuthActions } from './useAuthActions';
import type { User } from './types';

export type { User } from './types';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [missingInformation, setMissingInformation] = useState<string[]>([]);
  
  // Initialize the session
  const { isLoading } = useAuthSession();
  
  // Set up auth state listener
  useAuthStateListener({
    setIsLoggedIn,
    setActiveUser,
    setMissingInformation
  });
  
  // Get auth actions
  const { isLoading: isActionLoading, handleLogout, createDefaultOrganization } = useAuthActions();
  
  // Wrapper for createDefaultOrganization that uses the current user
  const createOrgForCurrentUser = async (name: string = "My Organization") => {
    return createDefaultOrganization(activeUser?.id, name);
  };
  
  return {
    isLoggedIn,
    isLoading: isLoading || isActionLoading,
    activeUser,
    missingInformation,
    handleLogout,
    createDefaultOrganization: createOrgForCurrentUser
  };
};

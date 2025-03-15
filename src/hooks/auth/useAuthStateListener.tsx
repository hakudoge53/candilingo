
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SessionCallback = (event: 'SIGNED_IN' | 'SIGNED_OUT', session: any) => void;

export const useAuthStateListener = (callback?: SessionCallback) => {
  const [initialized, setInitialized] = useState(false);
  
  // Handle auth state change from storage events (e.g. for multiple tabs)
  const handleStorageAuthChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === 'supabase.auth.token') {
        // Parse the auth token data if it exists
        const authData = event.newValue ? JSON.parse(event.newValue) : null;
        
        // Check if user is logged in based on presence of token
        const eventType = authData?.currentSession ? 'SIGNED_IN' : 'SIGNED_OUT';
        const session = authData?.currentSession || null;
        
        // Call the provided callback with the new auth state
        if (callback) {
          callback(eventType, session);
        }
      }
    },
    [callback]
  );
  
  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Convert event string to expected format
        const formattedEvent = event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' 
          ? 'SIGNED_IN' 
          : 'SIGNED_OUT';
        
        // Call the provided callback with the new auth state
        if (callback) {
          callback(formattedEvent, session);
        }
      }
    );
    
    // Check initial session
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If session exists, user is logged in
      if (session) {
        // Extract user claims if any are available
        const userClaims = session.user.app_metadata || {};
        
        if (callback) {
          callback('SIGNED_IN', session);
        }
      } else if (callback) {
        callback('SIGNED_OUT', null);
      }
      
      // Mark initialization as complete
      setInitialized(true);
    };
    
    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', handleStorageAuthChange);
    
    // Check initial session
    checkInitialSession();
    
    // Clean up subscription and event listener when component unmounts
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageAuthChange);
    };
  }, [callback, handleStorageAuthChange]);
  
  return { initialized };
};

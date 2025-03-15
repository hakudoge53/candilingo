
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from './types';

export interface AuthSession {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User | null;
  missingInformation: string[];
  session: any; // The actual Supabase session
}

export const useAuthSession = (): AuthSession => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [missingInformation, setMissingInformation] = useState<string[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data.session) {
          setSession(data.session);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    isLoggedIn,
    isLoading,
    activeUser,
    missingInformation,
    session
  };
};

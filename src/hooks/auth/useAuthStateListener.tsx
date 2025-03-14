
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from './types';

interface AuthStateProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setActiveUser: (user: User | null) => void;
  setMissingInformation: (missing: string[]) => void;
}

export const useAuthStateListener = ({
  setIsLoggedIn,
  setActiveUser,
  setMissingInformation
}: AuthStateProps) => {
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session) {
            setIsLoggedIn(true);
            
            try {
              // Fetch user profile data
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (profileError) {
                console.error("Profile fetch error:", profileError);
                setMissingInformation(['profile']);
              }
              
              if (profileData) {
                setActiveUser({
                  id: session.user.id,
                  name: profileData.name || session.user.email?.split('@')[0] || 'User',
                  email: profileData.email || session.user.email || '',
                  membership_tier: profileData.membership_tier,
                  status: profileData.status,
                  preferred_language: profileData.preferred_language,
                  extension_settings: profileData.extension_settings as Record<string, any> || {},
                });
              } else {
                // Fallback if profile not found
                setActiveUser({
                  id: session.user.id,
                  name: session.user.email?.split('@')[0] || 'User',
                  email: session.user.email || '',
                });
              }
            } catch (error) {
              console.error("Profile processing error:", error);
              setActiveUser({
                id: session.user.id,
                name: session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
              });
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
          setActiveUser(null);
        }
      }
    );

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [setIsLoggedIn, setActiveUser, setMissingInformation]);
};

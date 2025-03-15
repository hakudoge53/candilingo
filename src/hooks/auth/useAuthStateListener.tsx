import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from './types';
import { toast } from "sonner";

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
    console.log("Setting up auth state listener");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session ? "Session exists" : "No session");
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session) {
            console.log("User signed in:", session.user.id);
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
          console.log("User signed out");
          setIsLoggedIn(false);
          setActiveUser(null);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("Token refreshed");
        } else if (event === 'USER_DELETED') {
          console.log("User deleted");
          setIsLoggedIn(false);
          setActiveUser(null);
        } else if (event === 'INITIAL_SESSION') {
          console.log("Initial session event");
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("Password recovery event");
        } else if (event === 'MFA_CHALLENGE_VERIFIED') {
          console.log("MFA challenge verified event");
        } else {
          // Handle any other events not explicitly covered
          console.log(`Unhandled auth event: ${event}`);
        }
      }
    );

    // Check initial session on component mount
    const checkInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Initial session check:", data?.session ? "Session exists" : "No session", error);
      
      if (error) {
        console.error("Initial session error:", error);
        return;
      }
      
      if (data.session) {
        console.log("Initial session user:", data.session.user.id);
        setIsLoggedIn(true);
      }
    };
    
    checkInitialSession();

    // Clean up subscription
    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, [setIsLoggedIn, setActiveUser, setMissingInformation]);
};

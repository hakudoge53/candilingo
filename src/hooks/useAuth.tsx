
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type User = {
  id?: string;
  name: string;
  email: string;
  membership_tier?: string;
  status?: string;
  preferred_language?: string;
  extension_settings?: Record<string, any>;
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          setIsLoggedIn(true);
          
          try {
            // Fetch user profile data
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .maybeSingle();
            
            if (profileError) {
              console.error("Profile fetch error:", profileError);
            }
            
            if (profileData) {
              setActiveUser({
                id: data.session.user.id,
                name: profileData.name || data.session.user.email?.split('@')[0] || 'User',
                email: profileData.email || data.session.user.email || '',
                membership_tier: profileData.membership_tier,
                status: profileData.status,
                preferred_language: profileData.preferred_language,
                extension_settings: profileData.extension_settings as Record<string, any> || {}
              });
            } else {
              // Fallback if profile not found
              setActiveUser({
                id: data.session.user.id,
                name: data.session.user.email?.split('@')[0] || 'User',
                email: data.session.user.email || '',
              });
            }
          } catch (profileError) {
            console.error("Profile processing error:", profileError);
            // Set basic user info even if profile fetching fails
            setActiveUser({
              id: data.session.user.id,
              name: data.session.user.email?.split('@')[0] || 'User',
              email: data.session.user.email || '',
            });
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        try {
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error("Profile fetch error on auth state change:", profileError);
          }
          
          if (profileData) {
            setActiveUser({
              id: session.user.id,
              name: profileData.name || session.user.email?.split('@')[0] || 'User',
              email: profileData.email || session.user.email || '',
              membership_tier: profileData.membership_tier,
              status: profileData.status,
              preferred_language: profileData.preferred_language,
              extension_settings: profileData.extension_settings as Record<string, any> || {}
            });
          } else {
            setActiveUser({
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
            });
          }
        } catch (error) {
          console.error("Profile processing error on auth state change:", error);
          setActiveUser({
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setActiveUser(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery
        const newPassword = prompt('What would you like your new password to be?');
        if (newPassword) {
          const { error } = await supabase.auth.updateUser({ 
            password: newPassword 
          });
          
          if (error) {
            toast.error('Error updating password: ' + error.message);
          } else {
            toast.success('Password updated successfully!');
            // Force refresh to apply new session
            window.location.reload();
          }
        }
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.info("You have been logged out.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    activeUser,
    handleLogout
  };
};

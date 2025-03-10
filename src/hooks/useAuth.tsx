
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type User = {
  name: string;
  email: string;
  membership_tier?: string;
  status?: string;
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session) {
        setIsLoggedIn(true);
        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        if (profileData) {
          setActiveUser({
            name: profileData.name || data.session.user.email?.split('@')[0] || 'User',
            email: profileData.email || data.session.user.email || '',
            membership_tier: profileData.membership_tier,
            status: profileData.status
          });
        } else {
          // Fallback if profile not found
          setActiveUser({
            name: data.session.user.email?.split('@')[0] || 'User',
            email: data.session.user.email || '',
          });
        }
      }
      setIsLoading(false);
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          setActiveUser({
            name: profileData.name || session.user.email?.split('@')[0] || 'User',
            email: profileData.email || session.user.email || '',
            membership_tier: profileData.membership_tier,
            status: profileData.status
          });
        } else {
          setActiveUser({
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setActiveUser(null);
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


import { useEffect } from 'react';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useAuthStateListener = () => {
  const { toast } = useToast();
  const { 
    setIsLoggedIn, 
    setIsLoading,
    setActiveUser, 
    pendingResetState, 
    setPendingResetState
  } = useAuth();
  
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      console.log("Auth state change detected:", event, session ? "session exists" : "no session");
      
      // Always update loading state
      setIsLoading(false);
      
      // For most auth events, we need to update the logged-in state
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
        setIsLoggedIn(!!session);
      }
      
      // Specific event handling
      if (event === 'SIGNED_IN') {
        console.log("User signed in");
        if (session?.user?.id) {
          updateUserProfileWithSession(session);
        }
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
      } 
      else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        setActiveUser(null);
        toast({
          title: "Signed out",
          description: "Come back soon!",
        });
      } 
      else if (event === 'PASSWORD_RECOVERY') {
        console.log("Password recovery initiated");
        setPendingResetState(true);
        toast({
          title: "Password Reset",
          description: "Enter your new password below.",
        });
      } 
      else if (event === 'TOKEN_REFRESHED') {
        console.log("Token refreshed");
      } 
      else if (event === 'MFA_CHALLENGE_VERIFIED') {
        console.log("MFA verified");
      }
      else if (event === 'USER_DELETED') {
        console.log("User deleted");
        setActiveUser(null);
        setIsLoggedIn(false);
        toast({
          title: "Account Deleted",
          description: "Your account has been successfully deleted.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setIsLoggedIn, setIsLoading, setActiveUser, toast, setPendingResetState]);
  
  // Helper function to fetch the user's profile
  const updateUserProfileWithSession = async (session: Session) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      setActiveUser(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
};


import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from './types';

interface AuthStateListenerProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setActiveUser: (user: User | null) => void;
  setMissingInformation: (missingInfo: string[]) => void;
}

export const useAuthStateListener = ({
  setIsLoggedIn,
  setActiveUser,
  setMissingInformation
}: AuthStateListenerProps) => {
  
  useEffect(() => {
    // Check for URL hash error parameters
    const handleHashParams = () => {
      const hash = window.location.hash;
      if (hash.includes('error=')) {
        const params = new URLSearchParams(hash.substring(1));
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        
        if (error === 'access_denied' && params.get('error_code') === 'otp_expired') {
          toast.error("Email confirmation link has expired. Please request a new one.");
          // Clear the hash from the URL
          window.history.replaceState(null, '', window.location.pathname);
          
          // Redirect to customer portal after a delay
          setTimeout(() => {
            window.location.href = '/customer-portal';
          }, 2000);
        } else if (error) {
          toast.error(errorDescription || "Authentication error occurred");
          window.history.replaceState(null, '', window.location.pathname);
          
          // Redirect to customer portal for any auth error
          setTimeout(() => {
            window.location.href = '/customer-portal';
          }, 2000);
        }
      }
    };
    
    // Call once on mount
    handleHashParams();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const missingInfo: string[] = [];
        
        // Show email confirmation success notification
        if (window.location.hash.includes('type=signup')) {
          toast.success("Email confirmed successfully! You are now logged in.");
          window.history.replaceState(null, '', window.location.pathname);
        }
        
        try {
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error("Profile fetch error on auth state change:", profileError);
            missingInfo.push('profile');
          }
          
          if (missingInfo.length > 0) {
            setMissingInformation(missingInfo);
            // Remove organization warning
          }
          
          setIsLoggedIn(true);
          
          if (profileData) {
            setActiveUser({
              id: session.user.id,
              name: profileData.name || session.user.email?.split('@')[0] || 'User',
              email: profileData.email || session.user.email || '',
              membership_tier: profileData.membership_tier,
              status: profileData.status,
              preferred_language: profileData.preferred_language,
              extension_settings: profileData.extension_settings as Record<string, any> || {},
              // Remove hasOrganization field
            });
          } else {
            setActiveUser({
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              // Remove hasOrganization field
            });
          }
        } catch (error) {
          console.error("Profile processing error on auth state change:", error);
          setActiveUser({
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            // Remove hasOrganization field
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setActiveUser(null);
        setMissingInformation([]);
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery
        console.log("PASSWORD_RECOVERY event triggered");
        
        // Use the current domain for redirection
        const redirectUrl = window.location.origin + '/customer-portal';
        
        const newPassword = prompt('What would you like your new password to be?');
        if (newPassword) {
          try {
            const { error } = await supabase.auth.updateUser({ 
              password: newPassword 
            });
            
            if (error) {
              toast.error('Error updating password: ' + error.message);
            } else {
              toast.success('Password updated successfully!');
              // Redirect to customer portal with the current origin
              window.location.href = redirectUrl;
            }
          } catch (err) {
            console.error("Password update error:", err);
            toast.error("An error occurred while updating the password. Please try again.");
          }
        }
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setIsLoggedIn, setActiveUser, setMissingInformation]);
};

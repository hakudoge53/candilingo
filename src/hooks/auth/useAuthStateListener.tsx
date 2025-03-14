
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
        } else if (error) {
          toast.error(errorDescription || "Authentication error occurred");
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };
    
    // Call once on mount
    handleHashParams();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const missingInfo: string[] = [];
        
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
          
          // Check if user has an organization
          const { data: orgData, error: orgError } = await supabase
            .from('organization_members')
            .select('organization_id')
            .eq('user_id', session.user.id)
            .limit(1);
          
          const hasOrganization = orgData && orgData.length > 0;
          if (!hasOrganization) {
            missingInfo.push('organization');
          }
          
          if (missingInfo.length > 0) {
            setMissingInformation(missingInfo);
            toast.warning(`Please complete your ${missingInfo.join(' and ')} information`);
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
              hasOrganization: hasOrganization
            });
          } else {
            setActiveUser({
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              hasOrganization: hasOrganization
            });
          }
        } catch (error) {
          console.error("Profile processing error on auth state change:", error);
          setActiveUser({
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            hasOrganization: false
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setActiveUser(null);
        setMissingInformation([]);
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery
        console.log("PASSWORD_RECOVERY event triggered");
        
        // Get the current URL for proper redirection after password update
        const currentUrl = window.location.href;
        // Use the base URL (without path) for the redirect
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        
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
              // Redirect to customer portal with absolute URL
              window.location.href = `${baseUrl}/customer-portal`;
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

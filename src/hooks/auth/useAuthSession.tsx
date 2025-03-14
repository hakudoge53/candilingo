
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from './types';

export interface AuthSession {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User | null;
  missingInformation: string[];
}

export const useAuthSession = (): AuthSession => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [missingInformation, setMissingInformation] = useState<string[]>([]);

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
          // Check if the user has all required information before setting isLoggedIn to true
          const missingInfo: string[] = [];
          
          try {
            // Fetch user profile data
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .maybeSingle();
            
            if (profileError) {
              console.error("Profile fetch error:", profileError);
              missingInfo.push('profile');
            }
            
            if (missingInfo.length > 0) {
              setMissingInformation(missingInfo);
              // Don't show organization warnings anymore
            }
            
            setIsLoggedIn(true);
            
            if (profileData) {
              setActiveUser({
                id: data.session.user.id,
                name: profileData.name || data.session.user.email?.split('@')[0] || 'User',
                email: profileData.email || data.session.user.email || '',
                membership_tier: profileData.membership_tier,
                status: profileData.status,
                preferred_language: profileData.preferred_language,
                extension_settings: profileData.extension_settings as Record<string, any> || {},
                // Remove hasOrganization field
              });
            } else {
              // Fallback if profile not found
              setActiveUser({
                id: data.session.user.id,
                name: data.session.user.email?.split('@')[0] || 'User',
                email: data.session.user.email || '',
                // Remove hasOrganization field
              });
            }
          } catch (profileError) {
            console.error("Profile processing error:", profileError);
            // Set basic user info even if profile fetching fails
            setActiveUser({
              id: data.session.user.id,
              name: data.session.user.email?.split('@')[0] || 'User',
              email: data.session.user.email || '',
              // Remove hasOrganization field
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
    
  }, []);

  return {
    isLoggedIn,
    isLoading,
    activeUser,
    missingInformation
  };
};

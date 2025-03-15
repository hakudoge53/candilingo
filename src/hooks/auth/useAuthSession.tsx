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

  const handleUserData = (userId: string, profileData: any) => {
    setActiveUser({
      id: userId,
      name: profileData?.name || '',
      email: profileData?.email || '',
      membership_tier: profileData?.membership_tier || 'Free',
      preferred_language: profileData?.preferred_language || 'en',
      extension_settings: profileData?.extension_settings || {},
      avatar_url: profileData?.avatar_url || null,
      status: profileData?.status || 'Active'
    });
  };

  useEffect(() => {
    let isMounted = true;
    
    const checkSession = async () => {
      try {
        setIsLoading(true);
        console.log("Checking session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          if (isMounted) setIsLoading(false);
          return;
        }
        
        console.log("Session check result:", data.session ? "Session exists" : "No session");
        
        if (data.session && isMounted) {
          console.log("Session user:", data.session.user.id);
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
            
            if (missingInfo.length > 0 && isMounted) {
              console.log("Missing information:", missingInfo);
              setMissingInformation(missingInfo);
            }
            
            if (isMounted) setIsLoggedIn(true);
            
            if (profileData && isMounted) {
              console.log("Profile data found:", profileData.id);
              handleUserData(data.session.user.id, profileData);
            } else if (isMounted) {
              // Fallback if profile not found
              console.log("No profile data, using fallback user info");
              handleUserData(data.session.user.id, {
                id: data.session.user.id,
                name: data.session.user.email?.split('@')[0] || 'User',
                email: data.session.user.email || '',
              });
            }
          } catch (profileError) {
            console.error("Profile processing error:", profileError);
            if (isMounted) {
              // Set basic user info even if profile fetching fails
              handleUserData(data.session.user.id, {
                id: data.session.user.id,
                name: data.session.user.email?.split('@')[0] || 'User',
                email: data.session.user.email || '',
              });
            }
          }
        } else if (isMounted) {
          console.log("No active session found");
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    checkSession();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    isLoggedIn,
    isLoading,
    activeUser,
    missingInformation
  };
};

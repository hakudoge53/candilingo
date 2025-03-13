
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
  hasOrganization?: boolean;
};

export const useAuth = () => {
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
            
            // Check if user has an organization
            const { data: orgData, error: orgError } = await supabase
              .from('organization_members')
              .select('organization_id')
              .eq('user_id', data.session.user.id)
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
                id: data.session.user.id,
                name: profileData.name || data.session.user.email?.split('@')[0] || 'User',
                email: profileData.email || data.session.user.email || '',
                membership_tier: profileData.membership_tier,
                status: profileData.status,
                preferred_language: profileData.preferred_language,
                extension_settings: profileData.extension_settings as Record<string, any> || {},
                hasOrganization: hasOrganization
              });
            } else {
              // Fallback if profile not found
              setActiveUser({
                id: data.session.user.id,
                name: data.session.user.email?.split('@')[0] || 'User',
                email: data.session.user.email || '',
                hasOrganization: hasOrganization
              });
            }
          } catch (profileError) {
            console.error("Profile processing error:", profileError);
            // Set basic user info even if profile fetching fails
            setActiveUser({
              id: data.session.user.id,
              name: data.session.user.email?.split('@')[0] || 'User',
              email: data.session.user.email || '',
              hasOrganization: false
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
        const newPassword = prompt('What would you like your new password to be?');
        if (newPassword) {
          const { error } = await supabase.auth.updateUser({ 
            password: newPassword 
          });
          
          if (error) {
            toast.error('Error updating password: ' + error.message);
          } else {
            toast.success('Password updated successfully!');
            // Redirect to customer portal
            window.location.href = '/customer-portal';
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

  const createDefaultOrganization = async (name: string = "My Organization") => {
    if (!activeUser?.id) {
      toast.error("You must be logged in to create an organization");
      return null;
    }
    
    try {
      setIsLoading(true);
      
      // Create a new organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([{ name, created_by: activeUser.id }])
        .select()
        .single();
      
      if (orgError) {
        throw orgError;
      }
      
      // Create membership for user as admin
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: orgData.id,
          user_id: activeUser.id,
          role: 'admin',
          status: 'active'
        }]);
      
      if (memberError) {
        throw memberError;
      }
      
      toast.success("Default organization created successfully");
      setActiveUser(prev => prev ? {...prev, hasOrganization: true} : null);
      return orgData;
    } catch (error: any) {
      console.error("Error creating default organization:", error);
      toast.error("Failed to create organization: " + error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    activeUser,
    missingInformation,
    handleLogout,
    createDefaultOrganization
  };
};

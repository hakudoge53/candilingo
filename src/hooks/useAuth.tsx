import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Type definitions for context
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'github') => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// User type definition
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  preferred_language: string | null;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  activeUser: null,
  login: async () => {},
  loginWithProvider: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  // Setup storage bucket for avatars
  const setupStorageBucket = async () => {
    try {
      const { data, error } = await supabase.storage.getBucket('avatars');
      
      if (error && error.message.includes('The resource was not found')) {
        // Bucket doesn't exist, create it
        await supabase.storage.createBucket('avatars', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 5
        });
        
        // Set public policy for avatars
        await supabase.storage.from('avatars').createSignedUrl('dummy-file', 60);
      }
    } catch (error) {
      console.error("Error setting up storage bucket:", error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Check current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (sessionData.session) {
          setIsLoggedIn(true);
          
          // Get user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching user profile:", profileError);
          } else if (profileData) {
            setActiveUser({
              id: profileData.id,
              email: profileData.email || sessionData.session.user.email || '',
              name: profileData.name || '',
              avatar_url: profileData.avatar_url,
              preferred_language: profileData.preferred_language
            });
          }
          
          // Setup storage bucket
          await setupStorageBucket();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsLoggedIn(false);
        setActiveUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.info("Auth state changed:", event, session ? true : false);
      
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        
        try {
          // Get user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching user profile:", profileError);
          } else if (profileData) {
            setActiveUser({
              id: profileData.id,
              email: profileData.email || session.user.email || '',
              name: profileData.name || '',
              avatar_url: profileData.avatar_url,
              preferred_language: profileData.preferred_language
            });
          }
          
          // Setup storage bucket
          await setupStorageBucket();
          
          console.info("Login successful:", session.user.id);
        } catch (error) {
          console.error("Error handling sign-in:", error);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setActiveUser(null);
      }
    });
    
    initAuth();
    
    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      console.info("Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        // Success is handled by the auth listener
        toast.success("Login successful");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  // Social login function
  const loginWithProvider = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Social login error:", error);
      toast.error(error.message || "Login failed");
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        toast.success("Registration successful! Please check your email to confirm your account.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // The auth listener will handle the state update
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed");
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset password email");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      isLoading,
      activeUser,
      login,
      loginWithProvider,
      register,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};


import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContextType, User } from './types';

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isLoggedIn: false,
  activeUser: null,
  handleLogout: async () => {},
  missingInformation: false
});

// Provider component that wraps app and makes auth available
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [missingInformation, setMissingInformation] = useState<boolean>(false);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setError(new Error(error.message));
          return;
        }
        
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          setIsLoggedIn(true);
          
          // Set active user from session
          setActiveUser({
            id: data.session.user.id,
            email: data.session.user.email || '',
            name: data.session.user.user_metadata?.name || '',
            role: data.session.user.user_metadata?.role || 'user',
            user_metadata: data.session.user.user_metadata || {},
            created_at: data.session.user.created_at || '',
          });
        }
      } catch (err) {
        console.error("Session check error:", err);
        setError(new Error('Failed to check authentication status'));
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event, !!newSession);
        
        if (event === 'SIGNED_IN' && newSession) {
          setSession(newSession);
          setUser(newSession.user);
          setIsLoggedIn(true);
          
          // Set active user from session
          setActiveUser({
            id: newSession.user.id,
            email: newSession.user.email || '',
            name: newSession.user.user_metadata?.name || '',
            role: newSession.user.user_metadata?.role || 'user',
            user_metadata: newSession.user.user_metadata || {},
            created_at: newSession.user.created_at || '',
          });
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setIsLoggedIn(false);
          setActiveUser(null);
        } else if (event === 'TOKEN_REFRESHED' && newSession) {
          setSession(newSession);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast.error(error.message);
        return;
      }
      
      toast.success("Logged out successfully");
      setSession(null);
      setUser(null);
      setIsLoggedIn(false);
      setActiveUser(null);
      
      // Optional: Redirect to home page or login page
      // window.location.href = '/';
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Value to share across app
  const value = {
    session,
    user,
    isLoading,
    error,
    isLoggedIn,
    activeUser,
    handleLogout,
    missingInformation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

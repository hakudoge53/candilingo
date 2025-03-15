
import { useContext, createContext } from 'react';
import { AuthContextType, User } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isLoggedIn: false,
  activeUser: null,
  handleLogout: async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  },
  missingInformation: false
});

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

// Export the AuthProvider from the index file
export { AuthContext };
export type { User };

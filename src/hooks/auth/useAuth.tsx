
import { useContext, createContext } from 'react';
import { AuthContextType, User } from './types';

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isLoggedIn: false,
  activeUser: null
});

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

// Export the AuthProvider from the index file
export { AuthContext };
export type { User };

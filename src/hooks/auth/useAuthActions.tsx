
import { UseAuthActionsProps } from './types';
import { useLogin } from './useLogin';
import { useRegistration } from './useRegistration';
import { usePasswordReset } from './usePasswordReset';
import { useLogout } from './useLogout';

export const useAuthActions = ({
  setIsLoading,
  setPendingResetState
}: UseAuthActionsProps) => {
  // Use more focused hooks
  const { handleLogin } = useLogin({ setIsLoading });
  const { handleRegistration } = useRegistration({ setIsLoading });
  const { handleForgotPassword, handleResetPassword } = usePasswordReset({ 
    setIsLoading, 
    setPendingResetState 
  });
  const { handleLogout } = useLogout({ setIsLoading });

  return {
    handleLogin,
    handleRegistration,
    handleForgotPassword,
    handleResetPassword,
    handleLogout
  };
};

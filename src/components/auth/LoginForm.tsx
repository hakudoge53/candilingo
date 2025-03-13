
import React, { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LoginFormFields, { LoginFormValues } from './LoginFormFields';
import ResetPasswordForm from './ResetPasswordForm';
import LoginSuccess from './LoginSuccess';

interface LoginFormProps {
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ setIsLoading }: LoginFormProps) => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Handle login submission
  const onLoginSubmit = useCallback(async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setLoginSuccess(true);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  // You can also sign in with the test credentials
  const handleTestLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "test@candilingo.com",
        password: "password123",
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setLoginSuccess(true);
      toast.success("Logged in with test account!");
    } catch (error) {
      console.error("Test login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  // Handle password reset submission
  const onResetSubmit = useCallback(async (values: { email: string }) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/CustomerPortal`,
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setResetEmailSent(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const navigateToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleResetModeToggle = () => {
    setIsResetMode(true);
  };

  const handleBackToLogin = () => {
    setIsResetMode(false);
    setResetEmailSent(false);
  };

  // Render the appropriate component based on state
  if (loginSuccess) {
    return <LoginSuccess navigateToDashboard={navigateToDashboard} />;
  }

  if (isResetMode) {
    return (
      <ResetPasswordForm 
        onResetSubmit={onResetSubmit} 
        onBack={handleBackToLogin} 
        resetEmailSent={resetEmailSent} 
      />
    );
  }

  return (
    <LoginFormFields 
      onLoginSubmit={onLoginSubmit} 
      onForgotPassword={handleResetModeToggle} 
      handleTestLogin={handleTestLogin} 
    />
  );
};

export default LoginForm;

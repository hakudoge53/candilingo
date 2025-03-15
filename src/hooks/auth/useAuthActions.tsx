
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoginFormValues, ResetPasswordFormValues } from './types';

export interface UseAuthActionsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPendingResetState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthActions = ({
  setIsLoading,
  setPendingResetState
}: UseAuthActionsProps) => {
  // Login handler
  const handleLogin = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      console.log("Attempting login with email:", values.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        console.error("Login error:", error);
        toast.error(error.message);
        return;
      }
      
      console.log("Login successful:", data.user?.id);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Registration handler
  const handleRegistration = async (values: any) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            // Include any other profile data
          }
        }
      });
      
      if (error) {
        console.error("Registration error:", error);
        toast.error(error.message);
        return;
      }
      
      if (data.user && !data.session) {
        // Email confirmation is required
        toast.info("Registration successful! Please check your email to confirm your account.");
      } else {
        toast.success("Registration successful!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = async (values: ResetPasswordFormValues) => {
    try {
      setIsLoading(true);
      
      const redirectUrl = `${window.location.origin}/customer-portal`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        console.error("Password reset error:", error);
        toast.error(error.message);
        return;
      }
      
      toast.success("Password reset instructions sent to your email");
      
      if (setPendingResetState) {
        setPendingResetState(true);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password handler
  const handleResetPassword = async (values: { password: string }) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });
      
      if (error) {
        console.error("Password update error:", error);
        toast.error(error.message);
        return;
      }
      
      toast.success("Password updated successfully");
      
      if (setPendingResetState) {
        setPendingResetState(false);
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
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

  return {
    handleLogin,
    handleRegistration,
    handleForgotPassword,
    handleResetPassword,
    handleLogout
  };
};

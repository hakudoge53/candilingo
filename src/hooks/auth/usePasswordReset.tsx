
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ResetPasswordFormValues } from './types';

export interface UsePasswordResetProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPendingResetState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePasswordReset = ({
  setIsLoading,
  setPendingResetState
}: UsePasswordResetProps) => {
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

  return { handleForgotPassword, handleResetPassword };
};

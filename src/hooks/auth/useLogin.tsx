
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoginFormValues } from './types';

export interface UseLoginProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogin = ({ setIsLoading }: UseLoginProps) => {
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

  return { handleLogin };
};


import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UseRegistrationProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRegistration = ({ setIsLoading }: UseRegistrationProps) => {
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

  return { handleRegistration };
};


import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UseLogoutProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogout = ({ setIsLoading }: UseLogoutProps) => {
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

  return { handleLogout };
};

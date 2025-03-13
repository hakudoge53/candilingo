
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReferralCode {
  id: string;
  code: string;
  description: string | null;
  duration_months: number;
  is_active: boolean;
}

export const useReferralCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<ReferralCode | null>(null);

  const validateReferralCode = async (code: string) => {
    if (!code) {
      toast.error("Please enter a referral code");
      return null;
    }

    setIsLoading(true);
    
    try {
      // Query the referral_codes table to check if the code exists and is active
      const { data, error } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          toast.error("Invalid referral code. Please try again.");
        } else {
          toast.error("Error validating referral code. Please try again.");
          console.error("Error validating referral code:", error);
        }
        return null;
      }
      
      if (!data) {
        toast.error("Invalid referral code. Please try again.");
        return null;
      }
      
      setReferralCode(data);
      toast.success(`Referral code applied! You'll get ${data.duration_months} months free.`);
      return data;
    } catch (error) {
      console.error("Error in validateReferralCode:", error);
      toast.error("An unexpected error occurred. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const applyReferralCode = async (code: string, userId: string) => {
    const referral = await validateReferralCode(code);
    
    if (!referral) return false;
    
    try {
      setIsLoading(true);
      
      // Calculate expiry date based on duration_months
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + referral.duration_months);
      
      // Insert into referral_usage table
      const { error } = await supabase
        .from('referral_usage')
        .insert({
          referral_code_id: referral.id,
          user_id: userId,
          expires_at: expiresAt.toISOString()
        });
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error("You've already used this referral code.");
        } else {
          toast.error("Error applying referral code. Please try again.");
          console.error("Error applying referral code:", error);
        }
        return false;
      }
      
      // Increment usage_count
      await supabase
        .from('referral_codes')
        .update({ usage_count: referral.usage_count + 1 })
        .eq('id', referral.id);
      
      toast.success(`Referral code applied! You'll get ${referral.duration_months} months free.`);
      return true;
    } catch (error) {
      console.error("Error in applyReferralCode:", error);
      toast.error("An unexpected error occurred. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    validateReferralCode,
    applyReferralCode,
    isLoading,
    referralCode
  };
};

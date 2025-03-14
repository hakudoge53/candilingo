
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from '@/hooks/auth/types';
import { useLocation } from 'react-router-dom';

export const useReferralManagement = (activeUser: User | null) => {
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [activeReferral, setActiveReferral] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    // Check for referral code in URL params
    const urlParams = new URLSearchParams(location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
    }
  }, [location]);

  useEffect(() => {
    const fetchActiveReferral = async () => {
      if (!activeUser?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('referral_usage')
          .select(`
            id,
            expires_at,
            referral_codes:referral_code_id (
              code,
              duration_months,
              description
            )
          `)
          .eq('user_id', activeUser.id)
          .order('expires_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (data) {
          setActiveReferral(data);
        }
      } catch (error) {
        console.error("Error fetching referral:", error);
      }
    };
    
    if (activeUser?.id) {
      fetchActiveReferral();
    }
  }, [activeUser]);

  const applyReferralCode = async () => {
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    if (!activeUser?.id) {
      toast.error("You must be logged in to apply a referral code");
      return;
    }

    setIsApplyingCode(true);
    
    try {
      // Validate and apply the referral code directly
      const { data: referralData, error: referralError } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('code', referralCode.toUpperCase())
        .eq('is_active', true)
        .single();
        
      if (referralError || !referralData) {
        toast.error("Invalid referral code. Please try again.");
        setIsApplyingCode(false);
        return;
      }
      
      // Check if user has already used this code
      const { data: existingUsage, error: usageError } = await supabase
        .from('referral_usage')
        .select('*')
        .eq('user_id', activeUser.id)
        .eq('referral_code_id', referralData.id)
        .maybeSingle();
        
      if (existingUsage) {
        toast.error("You've already used this referral code");
        setIsApplyingCode(false);
        return;
      }
      
      // Calculate expiry date
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + referralData.duration_months);
      
      // Apply the referral code
      const { error: applyError } = await supabase
        .from('referral_usage')
        .insert({
          referral_code_id: referralData.id,
          user_id: activeUser.id,
          expires_at: expiresAt.toISOString()
        });
        
      if (applyError) {
        toast.error("Error applying referral code. Please try again.");
        console.error("Error applying referral code:", applyError);
        setIsApplyingCode(false);
        return;
      }
      
      // Update usage count
      await supabase
        .from('referral_codes')
        .update({ usage_count: (referralData.usage_count || 0) + 1 })
        .eq('id', referralData.id);
        
      // Update user profile
      await supabase
        .from('profiles')
        .update({ 
          membership_tier: 'Pro',
          status: 'Active'
        })
        .eq('id', activeUser.id);
      
      // Refresh the page to show the updated status
      toast.success(`Referral code applied! You'll get ${referralData.duration_months} months free.`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error applying referral code:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsApplyingCode(false);
    }
  };

  return {
    referralCode,
    setReferralCode,
    isApplyingCode,
    activeReferral,
    applyReferralCode
  };
};

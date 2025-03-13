
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { useLocation } from 'react-router-dom';

// Import new components
import PortalHeader from '@/components/customer-portal/PortalHeader';
import InstallationGuide from '@/components/customer-portal/InstallationGuide';
import ReferralProgram from '@/components/customer-portal/ReferralProgram';

const CustomerPortal = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [activeReferral, setActiveReferral] = useState<any>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const { redirectToCheckout, isLoading: isCheckoutLoading } = useStripeCheckout();
  const location = useLocation();
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading || isCheckoutLoading;

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
      if (!isLoggedIn || !activeUser?.id) return;
      
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
    
    fetchActiveReferral();
  }, [isLoggedIn, activeUser]);

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

  const handleWebExtensionCheckout = async (browser: string) => {
    try {
      setLocalLoading(true);
      await redirectToCheckout({
        priceId: 'price_1R15yGLRETKD7zlDSrCkpFFt', // Pro plan price ID
        productName: 'Candilingo Web Extension',
        cancelUrl: 'https://candilingo.com/customer-portal'
      });
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PortalHeader />
          
          {showLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {!isLoggedIn ? (
                <div className="max-w-md mx-auto">
                  <AuthContainer setIsLoading={setLocalLoading} />
                </div>
              ) : (
                <div className="space-y-6">
                  {activeUser && (
                    <UserProfile 
                      user={activeUser} 
                      onLogout={handleLogout} 
                      isLoading={localLoading} 
                    />
                  )}

                  <InstallationGuide 
                    handleWebExtensionCheckout={handleWebExtensionCheckout} 
                  />

                  <ReferralProgram
                    referralCode={referralCode}
                    setReferralCode={setReferralCode}
                    isApplyingCode={isApplyingCode}
                    applyReferralCode={applyReferralCode}
                    activeReferral={activeReferral}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerPortal;

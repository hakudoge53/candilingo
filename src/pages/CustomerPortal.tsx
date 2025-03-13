
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
import LoginDialog from '@/components/auth/LoginDialog';

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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading || isCheckoutLoading;

  // Check for referral code in URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const refCode = queryParams.get('ref');
    
    if (refCode) {
      setReferralCode(refCode);
      
      // Auto-apply if user is logged in
      if (isLoggedIn && activeUser?.id) {
        applyReferralCode(refCode);
      } else if (!isLoading && !isLoggedIn) {
        // Show login dialog if there's a referral code but user is not logged in
        setShowLoginDialog(true);
      }
    }
  }, [isLoggedIn, isLoading, activeUser]);

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

  const applyReferralCode = async (code: string = referralCode) => {
    if (!code.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    if (!activeUser?.id) {
      // If user is not logged in, show login dialog
      setShowLoginDialog(true);
      return;
    }

    setIsApplyingCode(true);
    
    try {
      // Start checkout with referral code
      await redirectToCheckout({
        productId: 'prod_referral',
        couponId: code.toUpperCase(),
      });
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
                    applyReferralCode={() => applyReferralCode()}
                    activeReferral={activeReferral}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Login Dialog for voucher users */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        setIsOpen={setShowLoginDialog} 
        setIsLoading={setLocalLoading}
        title="Sign in to Apply Voucher"
        description="Sign in or create an account to apply your voucher code."
      />
      
      <Footer />
    </div>
  );
};

export default CustomerPortal;

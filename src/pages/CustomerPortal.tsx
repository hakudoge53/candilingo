
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

// Import components
import PortalHeader from '@/components/customer-portal/PortalHeader';
import InstallationGuide from '@/components/customer-portal/InstallationGuide';
import ReferralProgram from '@/components/customer-portal/ReferralProgram';
import ReferralCodeDialog from '@/components/customer-portal/ReferralCodeDialog';

const CustomerPortal = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [activeReferral, setActiveReferral] = useState<any>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const { redirectToCheckout, isLoading: isCheckoutLoading } = useStripeCheckout();
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false);
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading || isCheckoutLoading;

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

    if (!isLoggedIn) {
      // Open dialog to prompt login/signup if not logged in
      setIsReferralDialogOpen(true);
      return;
    }

    setIsApplyingCode(true);
    
    try {
      // Use the edge function to validate and apply the code
      const { data, error } = await supabase.functions.invoke('validate-referral', {
        body: { code: referralCode.trim() }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.success) {
        toast.success(data.message);
        // Refresh active referral
        const { data: referralData } = await supabase
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
          
        if (referralData) {
          setActiveReferral(referralData);
        }
        setReferralCode("");
      } else {
        toast.error(data.error || "Failed to apply referral code");
      }
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

  const handleReferralSuccess = () => {
    setIsReferralDialogOpen(false);
    toast.success("Referral code applied successfully!");
    // Refresh the page or fetch updated referral data
    window.location.reload();
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

      {/* Referral code dialog for non-logged in users */}
      <ReferralCodeDialog 
        isOpen={isReferralDialogOpen}
        onClose={() => setIsReferralDialogOpen(false)}
        onSuccess={handleReferralSuccess}
      />
    </div>
  );
};

export default CustomerPortal;

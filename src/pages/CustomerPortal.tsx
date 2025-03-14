
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/auth/useAuth';
import PortalHeader from '@/components/customer-portal/PortalHeader';
import CustomerPortalContent from '@/components/customer-portal/CustomerPortalContent';
import { useReferralManagement } from '@/hooks/customer-portal/useReferralManagement';
import { useWebExtensionCheckout } from '@/hooks/customer-portal/useWebExtensionCheckout';

const CustomerPortal = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const { 
    handleWebExtensionCheckout, 
    localLoading, 
    setLocalLoading, 
    isCheckoutLoading 
  } = useWebExtensionCheckout();
  
  const {
    referralCode,
    setReferralCode,
    isApplyingCode,
    activeReferral,
    applyReferralCode
  } = useReferralManagement(activeUser);
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading || isCheckoutLoading;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <PortalHeader />
          
          <CustomerPortalContent
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            activeUser={activeUser}
            handleLogout={handleLogout}
            localLoading={localLoading}
            setLocalLoading={setLocalLoading}
            referralCode={referralCode}
            setReferralCode={setReferralCode}
            isApplyingCode={isApplyingCode}
            applyReferralCode={applyReferralCode}
            activeReferral={activeReferral}
            handleWebExtensionCheckout={handleWebExtensionCheckout}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerPortal;

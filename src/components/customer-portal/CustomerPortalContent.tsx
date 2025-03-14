
import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import UserProfile from '@/components/profile/UserProfile';
import InstallationGuide from '@/components/customer-portal/InstallationGuide';
import ReferralProgram from '@/components/customer-portal/ReferralProgram';
import AuthContainer from '@/components/auth/AuthContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface CustomerPortalContentProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User | null;
  handleLogout: () => Promise<void>;
  localLoading: boolean;
  setLocalLoading: (loading: boolean) => void;
  referralCode: string;
  setReferralCode: (code: string) => void;
  isApplyingCode: boolean;
  applyReferralCode: () => Promise<void>;
  activeReferral: any;
  handleWebExtensionCheckout: (browser: string) => Promise<void>;
}

const CustomerPortalContent = ({
  isLoggedIn,
  isLoading,
  activeUser,
  handleLogout,
  localLoading,
  setLocalLoading,
  referralCode,
  setReferralCode,
  isApplyingCode,
  applyReferralCode,
  activeReferral,
  handleWebExtensionCheckout
}: CustomerPortalContentProps) => {
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading;
  
  if (showLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <AuthContainer setIsLoading={setLocalLoading} />
      </div>
    );
  }

  return (
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
  );
};

export default CustomerPortalContent;

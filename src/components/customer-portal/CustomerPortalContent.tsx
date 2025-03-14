
import React from 'react';
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CheckoutManager from './CheckoutManager';
import ReferralCodeManager from './ReferralCodeManager';

interface CustomerPortalContentProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: any;
  localLoading: boolean;
  setLocalLoading: (loading: boolean) => void;
  handleLogout: () => void;
}

const CustomerPortalContent = ({
  isLoggedIn,
  isLoading,
  activeUser,
  localLoading,
  setLocalLoading,
  handleLogout
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

      <CheckoutManager setLocalLoading={setLocalLoading} />
      
      <ReferralCodeManager 
        userId={activeUser?.id}
        isLoading={localLoading}
        setLocalLoading={setLocalLoading}
      />
    </div>
  );
};

export default CustomerPortalContent;

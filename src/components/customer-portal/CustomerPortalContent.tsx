
import React, { useEffect, useState } from 'react';
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CheckoutManager from './CheckoutManager';
import ReferralCodeManager from './ReferralCodeManager';
import { User } from '@/hooks/auth/types';
import { toast } from 'sonner';

export interface CustomerPortalContentProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User | null;
  localLoading: boolean;
  setLocalLoading: (loading: boolean) => void;
  handleLogout: () => Promise<void>;
}

const CustomerPortalContent: React.FC<CustomerPortalContentProps> = ({
  isLoggedIn,
  isLoading,
  activeUser,
  localLoading,
  setLocalLoading,
  handleLogout
}) => {
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading;
  const [loadingDuration, setLoadingDuration] = useState<number>(0);
  const [showLoadingError, setShowLoadingError] = useState<boolean>(false);

  useEffect(() => {
    // Log component state for debugging
    console.log("CustomerPortalContent state:", {
      isLoggedIn,
      isLoading,
      hasActiveUser: !!activeUser,
      localLoading
    });
    
    let timerInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    
    if (showLoading) {
      // Start a timer to track how long loading is taking
      const startTime = Date.now();
      timerInterval = setInterval(() => {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        setLoadingDuration(duration);
        
        // If loading takes more than 15 seconds, show error state
        if (duration > 15 && isLoggedIn && !activeUser) {
          setShowLoadingError(true);
          clearInterval(timerInterval);
        }
      }, 1000);
      
      // Add a timeout to notify the user if loading takes too long
      timeoutId = setTimeout(() => {
        if (isLoggedIn && !activeUser) {
          toast.info("Still trying to load your profile...");
        } else {
          toast.info("Still loading... This may take a moment.");
        }
      }, 5000);
    } else {
      setLoadingDuration(0);
      setShowLoadingError(false);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoggedIn, isLoading, activeUser, localLoading, showLoading]);

  const handlePageRefresh = () => {
    window.location.reload();
  };

  if (showLoading) {
    // Show loading state
    if (showLoadingError) {
      return (
        <div className="flex items-center justify-center pt-10">
          <LoadingSpinner 
            message="There was an issue loading your profile." 
            errorOccurred={true}
            onRetry={handlePageRefresh}
          />
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center pt-10">
        <LoadingSpinner message={
          isLoading ? "Loading your profile..." : "Processing your request..."
        } />
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

  // Safety check - should not reach here without an active user if logged in
  if (!activeUser) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner 
          message="There was an issue loading your profile." 
          errorOccurred={true}
          onRetry={handlePageRefresh}
        />
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

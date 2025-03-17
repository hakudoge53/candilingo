
import React, { useEffect, useState } from 'react';
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { User } from '@/hooks/auth/types';
import { toast } from 'sonner';
import PortalSections from './PortalSections';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

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
  const [hasLoadingTimedOut, setHasLoadingTimedOut] = useState(false);

  useEffect(() => {
    // Log component state for debugging
    console.log("CustomerPortalContent state:", {
      isLoggedIn,
      isLoading,
      hasActiveUser: !!activeUser,
      localLoading
    });
    
    // Reset timeout state when loading state changes
    if (!showLoading) {
      setHasLoadingTimedOut(false);
      return;
    }
    
    // Add a timeout to notify the user if loading takes too long
    let timeoutId: NodeJS.Timeout;
    
    if (showLoading) {
      timeoutId = setTimeout(() => {
        toast.info("Still loading... This may take a moment.");
        setHasLoadingTimedOut(true);
      }, 5000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoggedIn, isLoading, activeUser, localLoading, showLoading]);

  if (showLoading) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 gap-4">
        <LoadingSpinner message={
          isLoading ? "Loading your profile..." : "Processing your request..."
        } />
        
        {hasLoadingTimedOut && (
          <div className="text-center">
            <p className="text-gray-500 mb-3">This is taking longer than expected.</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Refresh Page
            </Button>
          </div>
        )}
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
        <p className="text-red-500 mb-4">There was an issue loading your profile. Your session may have expired or there was a problem connecting to the server.</p>
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={() => window.location.reload()}
            variant="default"
          >
            Refresh Page
          </Button>
          <Button 
            onClick={() => handleLogout()}
            variant="outline"
          >
            Log Out
          </Button>
        </div>
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

      {activeUser && (
        <PortalSections
          user={activeUser}
          setLocalLoading={setLocalLoading}
        />
      )}
    </div>
  );
};

export default CustomerPortalContent;

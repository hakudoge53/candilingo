
import React, { useEffect } from 'react';
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { User } from '@/hooks/auth/types';
import { toast } from 'sonner';
import PortalSections from './PortalSections';

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

  useEffect(() => {
    // Log component state for debugging
    console.log("CustomerPortalContent state:", {
      isLoggedIn,
      isLoading,
      hasActiveUser: !!activeUser,
      localLoading
    });
    
    // Add a timeout to notify the user if loading takes too long
    let timeoutId: NodeJS.Timeout;
    
    if (showLoading) {
      timeoutId = setTimeout(() => {
        toast.info("Still loading... This may take a moment.");
      }, 5000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoggedIn, isLoading, activeUser, localLoading]);

  if (showLoading) {
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
        <p className="text-red-500 mb-4">There was an issue loading your profile.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-candilingo-purple text-white rounded hover:bg-candilingo-lightpurple"
        >
          Refresh Page
        </button>
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

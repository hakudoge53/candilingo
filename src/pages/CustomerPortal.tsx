
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';

const CustomerPortal = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const [localLoading, setLocalLoading] = React.useState(false);
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-techlex-blue text-center">Customer Portal</h1>
          
          {showLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {!isLoggedIn ? (
                <AuthContainer setIsLoading={setLocalLoading} />
              ) : (
                activeUser && <UserProfile 
                  user={activeUser} 
                  onLogout={handleLogout} 
                  isLoading={localLoading} 
                />
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


import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLocation } from 'react-router-dom';
import PortalHeader from '@/components/customer-portal/PortalHeader';
import CustomerPortalContent from '@/components/customer-portal/CustomerPortalContent';

interface CustomerPortalProps {}

const CustomerPortal: React.FC<CustomerPortalProps> = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check for URL parameters that might need processing
    const urlParams = new URLSearchParams(location.search);
    // Add any parameter handling logic here if needed

    // Update page title
    document.title = "Customer Portal | Candilingo";
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-candilingo-purple/5 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 max-w-full">
        <div className="mx-auto w-full max-w-6xl">
          <PortalHeader />
          
          <CustomerPortalContent
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            activeUser={activeUser}
            localLoading={localLoading}
            setLocalLoading={setLocalLoading}
            handleLogout={handleLogout}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerPortal;

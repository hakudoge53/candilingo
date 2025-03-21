
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/auth/useAuth';
import Dashboard from '@/components/dashboard/Dashboard';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase, ensureUserSettingsTableStructure, initializeApp } from "@/integrations/supabase/client";
import { useOrganization } from '@/hooks/organization/useOrganization';

const DashboardPage = () => {
  const { isLoggedIn, isLoading, activeUser } = useAuth();
  const { activeOrganization, isLoading: isOrgLoading } = useOrganization();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Please log in to access the dashboard");
        // Save the intended destination for redirecting after login
        navigate('/customer-portal', { 
          state: { 
            from: location.pathname,
            message: "Please log in to access the dashboard" 
          } 
        });
      } else {
        // Initialize the app (ensure tables and columns exist)
        await initializeApp();
      }
    };

    checkSession();
    
    // Update document title
    document.title = "Dashboard | Candilingo";
  }, [navigate, location.pathname]);

  if (isLoading || isOrgLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner message="Loading your dashboard..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/customer-portal" state={{ from: location.pathname }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;


import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from '@/components/dashboard/Dashboard';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

const DashboardPage = () => {
  const { isLoggedIn, isLoading, activeUser } = useAuth();
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
      }
    };

    checkSession();
    
    // Update document title
    document.title = "Dashboard | Candilingo";
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;

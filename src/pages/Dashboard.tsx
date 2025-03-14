
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from '@/components/dashboard/Dashboard';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

const DashboardPage = () => {
  const { isLoggedIn, isLoading, activeUser } = useAuth();
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Please log in to access the dashboard");
        navigate('/customer-portal');
      }
    };

    checkSession();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/customer-portal" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;

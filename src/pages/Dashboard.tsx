
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from '@/components/dashboard/Dashboard';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { isLoggedIn, isLoading, activeUser } = useAuth();

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
    return <Navigate to="/portal" />;
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

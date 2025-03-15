
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import CustomerPortal from './pages/CustomerPortal';
import Glossary from './pages/Glossary';
import NotFound from './pages/NotFound';
import Portal from './pages/Portal';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster } from './components/ui/toaster';
import PaymentSuccess from './pages/PaymentSuccess';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

function App() {
  // Handle URL parameters and errors
  useEffect(() => {
    console.log("App mounted, checking for auth redirects and errors");
    
    // Check for canceled payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('canceled') === 'true') {
      console.log("Payment canceled redirect");
      window.location.href = '/customer-portal';
    }

    // Check for email confirmation success
    const confirmationSuccess = urlParams.get('confirmed') === 'true';
    if (confirmationSuccess) {
      console.log("Email confirmation success");
      toast.success("Email confirmed successfully! You can now log in.");
    }

    // Check for hash errors (typically auth related)
    const hash = window.location.hash;
    console.log("Current URL hash:", hash);
    
    if (hash.includes('error=')) {
      const hashParams = new URLSearchParams(hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      
      console.log("Auth error detected:", { error, errorDescription, hash });
      
      if (error === 'access_denied' && hashParams.get('error_code') === 'otp_expired') {
        toast.error("Email confirmation link has expired. Please request a new one.");
        
        // Redirect to customer portal
        setTimeout(() => {
          window.location.href = '/customer-portal';
        }, 2000);
        
        // Clear the hash from the URL
        window.history.replaceState(null, '', window.location.pathname);
      } else if (error) {
        toast.error(errorDescription || "Authentication error occurred");
        window.history.replaceState(null, '', window.location.pathname);
        
        // Redirect to customer portal for any auth error
        setTimeout(() => {
          window.location.href = '/customer-portal';
        }, 2000);
      }
    }
    
    // Check for signup success via hash type parameter
    if (hash.includes('type=signup')) {
      console.log("Signup success detected");
      toast.success("Email confirmation successful! You are now logged in.");
      window.history.replaceState(null, '', window.location.pathname);
      
      // Redirect to dashboard after signup
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    }
    
    // Check for successful auth callback via 'access_token' in hash
    if (hash.includes('access_token=')) {
      console.log("Auth callback detected with access token");
      toast.success("Authentication successful!");
      
      // Give a moment for Supabase to process the session
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
      
      // Clean up the URL by removing the hash
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Check for recovery token (password reset)
    if (hash.includes('type=recovery')) {
      console.log("Password recovery flow detected");
      toast.info("Please enter a new password");
      // The recovery flow will be handled by Supabase's built-in mechanisms
    }
    
    // Initial session check
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Initial App session check:", data?.session ? "Session exists" : "No session");
      if (error) {
        console.error("Session check error:", error);
      }
    };
    
    checkSession();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/glossary/:id?" element={<Glossary />} />
        <Route path="/customer-portal" element={<CustomerPortal />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-canceled" element={<Navigate to="/customer-portal" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SonnerToaster position="top-right" />
      <Toaster />
    </Router>
  );
}

export default App;

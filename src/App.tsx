
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

function App() {
  // Check for URL parameters that indicate issues
  useEffect(() => {
    // Check for canceled payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('canceled') === 'true') {
      window.location.href = 'https://candilingo.com/customer-portal';
    }

    // Check for hash errors (typically auth related)
    const hash = window.location.hash;
    if (hash.includes('error=')) {
      const hashParams = new URLSearchParams(hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      
      if (error === 'access_denied' && hashParams.get('error_code') === 'otp_expired') {
        toast.error("Email confirmation link has expired. Please request a new one.");
        // Clear the hash from the URL
        window.history.replaceState(null, '', window.location.pathname);
      } else if (error) {
        toast.error(errorDescription || "Authentication error occurred");
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
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
        <Route path="/payment-canceled" element={<Navigate to="https://candilingo.com/customer-portal" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SonnerToaster position="top-right" />
      <Toaster />
    </Router>
  );
}

export default App;


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

function App() {
  // Check for URL parameters that indicate a canceled payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('canceled') === 'true') {
      window.location.href = 'https://candilingo.com/customer-portal';
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

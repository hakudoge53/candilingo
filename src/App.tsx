
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import CustomerPortal from './pages/CustomerPortal';
import Glossary from './pages/Glossary';
import NotFound from './pages/NotFound';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster } from './components/ui/toaster';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/glossary/:id?" element={<Glossary />} />
        <Route path="/customer-portal" element={<CustomerPortal />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SonnerToaster position="top-right" />
      <Toaster />
    </Router>
  );
}

export default App;

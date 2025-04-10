
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from './hooks/auth/useAuth';
import { initializeApp } from './integrations/supabase/client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { Helmet } from 'react-helmet';

// Pages
import Index from './pages/Index';
import Portal from './pages/Portal';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import CustomerPortal from './pages/CustomerPortal';
import PaymentSuccess from './pages/PaymentSuccess';
import Glossary from './pages/Glossary';
import TechLingoWiki from './pages/TechLingoWiki';
import HowItWorks from './pages/HowItWorks';
import Blog from './pages/Blog';
import Documentation from './pages/Documentation';

// Styles
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeApp();
      } catch (error) {
        console.error("Failed to initialize app:", error);
      } finally {
        setIsInitializing(false);
      }
    };
    
    initialize();
  }, []);
  
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Initializing application..." />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="candilingo-theme">
        <AuthProvider>
          <Helmet>
            <title>Candilingo - AI-Powered Keyword Highlighter for Recruiters</title>
            <meta name="description" content="Instantly highlight key terms on LinkedIn, Teamtailor & PDFs to improve hiring speed and quality." />
            <meta property="og:image" content="/lovable-uploads/66e41db1-fbcd-4b45-afd1-8fb8944915b4.png" />
          </Helmet>
          <Router>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portal" element={<Portal />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customer-portal/*" element={<CustomerPortal />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/wiki" element={<TechLingoWiki />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Router>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

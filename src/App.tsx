
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';

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
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="candilingo-theme">
        <Router>
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
        </Router>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

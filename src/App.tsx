
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Glossary from "./pages/Glossary";
import CustomerPortal from "./pages/CustomerPortal";
import Dashboard from "./pages/Dashboard";
import MarketingIntegrations from "./pages/MarketingIntegrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component that checks for admin access
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, activeUser, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
  }
  
  if (!isLoggedIn || activeUser?.membership_tier !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/portal" element={<CustomerPortal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route 
            path="/marketing" 
            element={
              <AdminRoute>
                <MarketingIntegrations />
              </AdminRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

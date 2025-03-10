
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoogleAnalyticsSetup from "@/components/marketing/GoogleAnalyticsSetup";
import GoogleAdsSetup from "@/components/marketing/GoogleAdsSetup";
import CRMIntegration from "@/components/marketing/CRMIntegration";
import SocialMediaIntegration from "@/components/marketing/SocialMediaIntegration";
import ZapierIntegration from "@/components/marketing/ZapierIntegration";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const MarketingIntegrations = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const { toast: uiToast } = useToast();
  const { isLoggedIn, activeUser, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and an admin
    if (!isLoading) {
      if (!isLoggedIn) {
        toast.error("You need to be logged in to access this page");
        navigate("/");
        return;
      }
      
      // Assuming 'admin' is the role/membership tier for admin access
      if (activeUser?.membership_tier !== 'admin') {
        toast.error("You don't have permission to access this page");
        navigate("/");
        return;
      }
    }
  }, [isLoggedIn, activeUser, isLoading, navigate]);

  // Show nothing while checking authentication
  if (isLoading || !isLoggedIn || activeUser?.membership_tier !== 'admin') {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-techlex-blue">Marketing Integrations</h1>
          <p className="text-gray-600 mb-8">Connect TechLex EU with your marketing tools and CRM systems.</p>
          
          <Tabs 
            defaultValue="analytics" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="bg-white rounded-lg p-1 shadow-sm mb-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="ads">Google Ads</TabsTrigger>
                <TabsTrigger value="crm">CRM Systems</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="zapier">Zapier</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <TabsContent value="analytics" className="animate-fade-in">
                <GoogleAnalyticsSetup />
              </TabsContent>
              
              <TabsContent value="ads" className="animate-fade-in">
                <GoogleAdsSetup />
              </TabsContent>
              
              <TabsContent value="crm" className="animate-fade-in">
                <CRMIntegration />
              </TabsContent>
              
              <TabsContent value="social" className="animate-fade-in">
                <SocialMediaIntegration />
              </TabsContent>
              
              <TabsContent value="zapier" className="animate-fade-in">
                <ZapierIntegration />
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Marketing Integration Benefits</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                <span className="ml-2">Track conversion rates from marketing campaigns</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                <span className="ml-2">Sync leads and contacts with your CRM automatically</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                <span className="ml-2">Measure the ROI of your recruitment technology investment</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                <span className="ml-2">Automate marketing workflows with Zapier integration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};

export default MarketingIntegrations;

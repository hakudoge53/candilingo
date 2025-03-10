
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Share2 } from "lucide-react";

// Import section components
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      
      {/* New Marketing Integrations section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-10 border border-blue-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-techlex-blue bg-opacity-10 p-2 rounded-lg mr-3">
                    <BrainCircuit className="w-6 h-6 text-techlex-blue" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Marketing & CRM Integrations</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Connect TechLex EU with your favorite marketing tools and CRM systems. Track conversions, sync customer data, and measure ROI with our easy-to-use integrations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">Google Analytics</div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">Google Ads</div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">HubSpot</div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">Salesforce</div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">Zapier</div>
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">Social Media</div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Link to="/marketing">
                  <Button className="bg-techlex-blue hover:bg-techlex-blue/90 px-6 py-6 h-auto">
                    <Share2 className="w-5 h-5 mr-2" />
                    Explore Marketing Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

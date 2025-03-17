
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import section components
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import { Button } from '@/components/ui/button';
import NewsletterSignupBar from '@/components/NewsletterSignupBar';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleShowVideo = () => {
    setShowVideo(true);
    // Smooth scroll to video section
    setTimeout(() => {
      const videoSection = document.getElementById('video-section');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Helmet>
        <title>Candilingo - AI-Powered Keyword Highlighter for Recruiters</title>
        <meta name="description" content="Instantly highlight key terms on LinkedIn, Teamtailor & PDFs to improve hiring speed and quality." />
        <meta property="og:title" content="Candilingo - AI-Powered Keyword Highlighter for Recruiters" />
        <meta property="og:description" content="Instantly highlight key terms on LinkedIn, Teamtailor & PDFs to improve hiring speed and quality." />
        <meta property="og:image" content="/lovable-uploads/66e41db1-fbcd-4b45-afd1-8fb8944915b4.png" />
        <meta property="og:url" content="https://candilingo.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/lovable-uploads/66e41db1-fbcd-4b45-afd1-8fb8944915b4.png" type="image/png" />
      </Helmet>
      <Navbar />
      <NewsletterSignupBar />
      <HeroSection onShowVideo={handleShowVideo} />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Video section - only shows when activated */}
          {showVideo && (
            <section id="video-section" className="py-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6 text-candilingo-pink">See Candilingo in Action</h2>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* This is a placeholder for the actual video embed */}
                    <div className="text-center p-8">
                      <p className="text-gray-500 mb-2">Video placeholder</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowVideo(false)}
                    className="mx-auto"
                  >
                    Close Video
                  </Button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

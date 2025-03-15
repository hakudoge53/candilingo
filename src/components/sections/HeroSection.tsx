
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";
import { MailIcon, Play } from "lucide-react";

const HeroSection = ({ onShowVideo }: { onShowVideo?: () => void }) => {
  const [email, setEmail] = useState('');
  const [confirmedLicenses, setConfirmedLicenses] = useState(1); // Starting with 1 confirmed license
  const [seatsRemaining, setSeatsRemaining] = useState(200 - 1); // Calculate remaining seats

  useEffect(() => {
    // This is where we would fetch the actual confirmed licenses count
    // For now, we're using a static value
    setSeatsRemaining(200 - confirmedLicenses);
  }, [confirmedLicenses]);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    toast.success('Thank you for subscribing to our newsletter! We\'ll keep you updated on our progress.');
    setEmail('');
  };

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="lg:pr-10 animate-fade-in">
            <div className="mb-8 flex items-center">
              <img 
                src="/public/lovable-uploads/dd4d9cc8-eaa4-43df-bc05-3b8a88297f00.png" 
                alt="Candilingo Logo" 
                className="h-16"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-candilingo-pink bg-opacity-20 text-candilingo-pink rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Browser Extension
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-candilingo-purple">AI-Powered Keyword </span>
              <span className="text-candilingo-pink">Highlighter</span>
              <span className="text-candilingo-purple"> for Recruiters</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Instantly highlight key terms on LinkedIn, Teamtailor & PDFs to improve hiring speed and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                variant="purple" 
                className="text-lg py-6 px-8 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Try for Free
              </Button>
              <Button 
                variant="outline-pink" 
                className="flex items-center gap-2 text-lg py-6 px-8 font-semibold"
                onClick={onShowVideo}
              >
                <Play className="h-5 w-5" />
                See It in Action
              </Button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-700 text-sm">
                <strong>Early Access Campaign:</strong> First 200 seats will get 50% discount on their first year! 
                Currently {confirmedLicenses} license confirmed, only {seatsRemaining} seats remaining with discount!
              </p>
            </div>
          </div>
          
          <div className="lg:pl-10 animate-fade-in-slow">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
              <HeroImageSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

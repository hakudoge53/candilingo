
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";
import { MailIcon, Play } from "lucide-react";
import { Link } from 'react-router-dom';

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
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-indigo-50 via-cyan-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="lg:pr-10 animate-fade-in">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-candilingo-pink bg-opacity-20 text-candilingo-pink rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Browser Extension
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-candilingo-purple via-candilingo-teal to-candilingo-pink bg-clip-text text-transparent">
              Keyword scanning and instant definitions for Recruiters
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Instantly highlight key terms on LinkedIn, ATS-systems & PDFs to <span className="underline decoration-candilingo-pink decoration-2 font-semibold">improve the candidate experience</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/portal">
                <Button 
                  variant="purple" 
                  className="text-lg py-6 px-8 font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Try for Free
                </Button>
              </Link>
              <Button 
                variant="outline-pink" 
                className="flex items-center gap-2 text-lg py-6 px-8 font-semibold"
                onClick={onShowVideo}
              >
                <Play className="h-5 w-5" />
                See It in Action
              </Button>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6 shadow-sm">
              <p className="text-amber-700 text-sm">
                <strong>Early Access Campaign:</strong> First 200 seats will get 50% discount on their first year! 
                Currently {confirmedLicenses} license confirmed, only {seatsRemaining} seats remaining with discount!
              </p>
            </div>
          </div>
          
          <div className="lg:pl-10 animate-fade-in-slow">
            <div className="relative aspect-auto bg-gradient-to-br from-white to-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-candilingo-purple/5 via-candilingo-teal/5 to-candilingo-pink/5 mix-blend-overlay"></div>
              <HeroImageSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

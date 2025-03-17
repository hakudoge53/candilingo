
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";
import { MailIcon, Play } from "lucide-react";
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = ({ onShowVideo }: { onShowVideo?: () => void }) => {
  const [email, setEmail] = useState('');
  const [confirmedLicenses, setConfirmedLicenses] = useState(1); // Starting with 1 confirmed license
  const [seatsRemaining, setSeatsRemaining] = useState(200 - 1); // Calculate remaining seats
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const isMobile = useIsMobile();

  // Array of phrases to cycle through
  const highlightedPhrases = [
    "improve the candidate experience",
    "ask relevant questions",
    "improve onboarding",
    "make sourcing effective",
    "make interviews efficient",
    "place more candidates",
    "improve customer relationships",
    "shorten placement cycle",
    "sell more"
  ];

  useEffect(() => {
    // This is where we would fetch the actual confirmed licenses count
    // For now, we're using a static value
    setSeatsRemaining(200 - confirmedLicenses);
  }, [confirmedLicenses]);

  useEffect(() => {
    // Set up timer to cycle through the phrases
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % highlightedPhrases.length);
    }, 3000); // Change every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
    <section className="pt-16 sm:pt-20 md:pt-28 pb-12 md:pb-16 bg-gradient-to-br from-indigo-50 via-cyan-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className="lg:pr-6 animate-fade-in">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-candilingo-pink bg-opacity-20 text-candilingo-pink rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Browser Extension
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-candilingo-purple">
              Keyword scanning and instant definitions for Recruiters
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Instantly highlight key terms on LinkedIn, ATS-systems & PDFs to <span className="inline-block underline decoration-candilingo-pink decoration-2 font-semibold text-candilingo-pink transition-colors duration-500">{highlightedPhrases[currentTextIndex]}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
              <Link to="/portal" className="w-full sm:w-auto">
                <Button 
                  variant="purple" 
                  className="text-base md:text-lg py-5 md:py-6 px-6 md:px-8 font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full"
                >
                  Try for Free
                </Button>
              </Link>
              <Button 
                className="flex items-center justify-center gap-2 text-base md:text-lg py-5 md:py-6 px-6 md:px-8 font-semibold bg-white text-candilingo-pink border border-candilingo-pink hover:bg-candilingo-pink/10 transition-colors w-full sm:w-auto"
                onClick={onShowVideo}
              >
                <Play className="h-4 w-4 md:h-5 md:w-5" />
                See It in Action
              </Button>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 md:p-4 mb-6 shadow-sm">
              <p className="text-amber-700 text-xs sm:text-sm">
                <strong>Early Access Campaign:</strong> First 200 seats will get 50% discount on their first year! 
                Currently {confirmedLicenses} license confirmed, only {seatsRemaining} seats remaining with discount!
              </p>
            </div>
          </div>
          
          <div className="lg:pl-6 animate-fade-in-slow">
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

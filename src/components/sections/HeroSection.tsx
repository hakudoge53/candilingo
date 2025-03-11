
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";
import { MailIcon, Play } from "lucide-react";

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [confirmedLicenses, setConfirmedLicenses] = useState(1); // Starting with 1 confirmed license
  const [seatsRemaining, setSeatsRemaining] = useState(200 - 1); // Calculate remaining seats
  const [showVideo, setShowVideo] = useState(false);

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
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-techlex-blue bg-opacity-10 text-techlex-blue rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Browser Extension
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-techlex-blue">
              AI-Powered Keyword Highlighter for Recruiters
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Instantly highlight key terms on LinkedIn, Teamtailor & PDFs to improve hiring speed and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-primary text-lg py-6 px-8 font-semibold">
                Try for Free
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-lg py-6 px-8 font-semibold"
                onClick={() => setShowVideo(true)}
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
            {/* Placeholder for video/demo section */}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
              {showVideo ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* This is a placeholder for the actual video embed */}
                  <div className="text-center p-8">
                    <p className="text-gray-500 mb-2">Video placeholder</p>
                    <p className="text-sm text-gray-400">Dimensions: 1280x720px</p>
                  </div>
                </div>
              ) : (
                <HeroImageSection />
              )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              See how HighlightHire transforms your recruitment process
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

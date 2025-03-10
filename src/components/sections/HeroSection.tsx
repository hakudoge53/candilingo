import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";
import { MailIcon } from "lucide-react";

const HeroSection = () => {
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
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-techlex-blue bg-opacity-10 text-techlex-blue rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Browser Extension
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Decode Tech Jargon with <span className="text-techlex-blue">TechLex EU</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Instantly understand tech terms in CVs, PDFs, and web content. Perfect for recruiters to speed up candidate evaluation.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 mb-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
              />
              <Button type="submit" className="btn-primary whitespace-nowrap">
                <MailIcon className="w-4 h-4 mr-2" />
                Newsletter
              </Button>
            </form>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-700 text-sm">
                <strong>Early Access Campaign:</strong> First 200 seats will get 50% discount on their first year! 
                Currently {confirmedLicenses} license confirmed, only {seatsRemaining} seats remaining with discount!
              </p>
            </div>
          </div>
          
          <div className="lg:pl-10 animate-fade-in-slow">
            <HeroImageSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [seatsRemaining, setSeatsRemaining] = useState(200);

  useEffect(() => {
    // This is where we would fetch the actual remaining seats count
    // For now, we're using a static value
  }, []);

  const handleEarlyAccessRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    toast.success('Thank you for your interest! We\'ll be in touch soon about confirming your spot.');
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
            <form onSubmit={handleEarlyAccessRequest} className="flex flex-col sm:flex-row gap-3 mb-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
              />
              <Button type="submit" className="btn-primary whitespace-nowrap">
                Request Early Access
              </Button>
            </form>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-700 text-sm">
                <strong>Early Access Campaign:</strong> We need 200 confirmed seats to start development. 
                Currently {seatsRemaining} seats remaining to reach our goal!
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

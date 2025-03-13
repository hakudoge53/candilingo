
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import HeroImageSection from "@/components/HeroImageSection";
import { MailIcon, Play, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const HeroSection = ({ onShowVideo }: { onShowVideo?: () => void }) => {
  const [email, setEmail] = useState('');
  const [confirmedLicenses, setConfirmedLicenses] = useState(1); // Starting with 1 confirmed license
  const [seatsRemaining, setSeatsRemaining] = useState(200 - 1); // Calculate remaining seats
  const [showInstallGuide, setShowInstallGuide] = useState(false);

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
              <span className="px-3 py-1 bg-candilingo-coral bg-opacity-10 text-candilingo-coral rounded-full text-sm font-medium">
                Early Access
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                Browser Extension
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-candilingo-purple">
              AI-Powered Keyword Highlighter for Recruiters
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
                variant="outline-purple" 
                className="flex items-center gap-2 text-lg py-6 px-8 font-semibold"
                onClick={onShowVideo}
              >
                <Play className="h-5 w-5" />
                See It in Action
              </Button>
              <Dialog open={showInstallGuide} onOpenChange={setShowInstallGuide}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline-teal" 
                    className="flex items-center gap-2 text-lg py-6 px-8 font-semibold"
                  >
                    <Download className="h-5 w-5" />
                    Installation Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-candilingo-purple">Candilingo Installation Guide</DialogTitle>
                    <DialogDescription>
                      Follow these simple steps to install the Candilingo extension
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="bg-gray-50 p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4 text-candilingo-purple">Chrome Installation</h3>
                      <ol className="list-decimal list-inside space-y-3">
                        <li>Download the extension from the Chrome Web Store</li>
                        <li>Click "Add to Chrome" in the top right</li>
                        <li>Confirm by clicking "Add extension" in the popup</li>
                        <li>Once installed, you'll see the Candilingo icon in your toolbar</li>
                        <li>Click the icon and login with your Candilingo account</li>
                      </ol>
                      <Button variant="purple" className="mt-4">
                        Get Chrome Extension
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4 text-candilingo-purple">Firefox Installation</h3>
                      <ol className="list-decimal list-inside space-y-3">
                        <li>Visit the Firefox Add-ons page for Candilingo</li>
                        <li>Click "Add to Firefox"</li>
                        <li>Confirm by clicking "Add" in the confirmation dialog</li>
                        <li>Grant the requested permissions</li>
                        <li>The Candilingo icon will appear in your toolbar</li>
                      </ol>
                      <Button variant="purple" className="mt-4">
                        Get Firefox Add-on
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4 text-candilingo-purple">Edge Installation</h3>
                      <ol className="list-decimal list-inside space-y-3">
                        <li>Open the Edge Add-ons page for Candilingo</li>
                        <li>Click "Get" and then "Add extension"</li>
                        <li>The extension will install automatically</li>
                        <li>The Candilingo icon will appear in your toolbar</li>
                      </ol>
                      <Button variant="purple" className="mt-4">
                        Get Edge Add-on
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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

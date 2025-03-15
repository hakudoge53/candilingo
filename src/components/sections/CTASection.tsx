import { useState, useEffect } from 'react';
import CTAContent from './CTAContent';
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/ContactDialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check } from "lucide-react";

const CTASection = () => {
  const [seatsRemaining, setSeatsRemaining] = useState(200);
  const [confirmedLicenses, setConfirmedLicenses] = useState(1);
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  
  useEffect(() => {
    setSeatsRemaining(200 - confirmedLicenses);
  }, [confirmedLicenses]);

  const handleApplyCode = () => {
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    setIsApplyingCode(true);
    setTimeout(() => {
      toast.success("Referral code applied! You'll get 3 months free when you sign up.");
      setIsApplyingCode(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-candilingo-coral opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-candilingo-lightpurple opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-candilingo-pink opacity-10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-candilingo-purple">Ready to Transform Your Technical Recruitment?</h2>
              <p className="text-md text-gray-600 max-w-2xl mx-auto">
                Start your free trial today and see how Candilingo can help your technical recruitment process. No credit card required to get started.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-5 max-w-2xl mx-auto">
                <p className="text-candilingo-coral font-medium text-center">
                  <span className="block text-md font-bold mb-1">Early Access Campaign: Get 50% off for the first year as an early bird.</span>
                  <span className="block text-sm">All plans include a 1-month free trial!</span>
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">Instant setup - no installation needed</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">Works with LinkedIn, PDFs, and ATS-systems</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">No credit card required for trial</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">Enterprise customers: Contact us for custom solutions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="flex flex-row gap-3 justify-center">
                <Button 
                  variant="purple"
                  className="text-sm py-2 px-4 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Start Your Free Trial
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline-coral" className="text-sm py-2 px-4">
                      Have a referral code?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply Referral Code</DialogTitle>
                      <DialogDescription>
                        Enter your referral code to get 3 months completely free, no credit card required.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="referral-code">Referral Code</Label>
                        <Input 
                          id="referral-code" 
                          placeholder="Enter your referral code" 
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Examples: WELCOME2024, EARLYBIRD, CANDILINGO
                      </p>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="purple" 
                        onClick={handleApplyCode}
                        disabled={isApplyingCode}
                      >
                        {isApplyingCode ? "Applying..." : "Apply Code"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <ContactDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

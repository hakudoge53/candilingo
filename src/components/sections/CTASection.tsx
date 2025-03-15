
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
    // This is where we would fetch the actual confirmed licenses count
    // For now, we're using a static value
    setSeatsRemaining(200 - confirmedLicenses);
  }, [confirmedLicenses]);

  const handleApplyCode = () => {
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    setIsApplyingCode(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Referral code applied! You'll get 3 months free when you sign up.");
      setIsApplyingCode(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-candilingo-coral opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-candilingo-lightpurple opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-40 w-20 h-20 bg-candilingo-pink opacity-10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-candilingo-purple">Ready to Transform Your Technical Recruitment?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Start your free trial today and see how Candilingo can help your technical recruitment process. No credit card required to get started.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 my-8 max-w-3xl mx-auto">
                <p className="text-candilingo-coral font-medium text-center">
                  <span className="block text-lg font-bold mb-2">Early Access Campaign: Get 50% off for the first year as an early bird.</span>
                  <span className="block">All plans include a 1-month free trial!</span>
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">Instant setup - no installation needed</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">Works with LinkedIn, PDFs, and ATS-systems</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">No credit card required for trial</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">Enterprise customers: Contact us for custom solutions</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button 
                  variant="purple"
                  className="w-full sm:w-auto text-lg py-6 px-8 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Start Your Free Trial
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline-coral" className="w-full sm:w-auto">
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

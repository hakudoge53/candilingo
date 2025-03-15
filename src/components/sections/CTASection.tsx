
import { useState, useEffect } from 'react';
import CTAContent from './CTAContent';
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/ContactDialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-candilingo-coral opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-candilingo-lightpurple opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <CTAContent seatsRemaining={seatsRemaining} />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-candilingo-purple">Check the Cost</h3>
                <p className="text-gray-600 mb-4">
                  Our transparent pricing helps you understand exactly what you'll pay based on your team size and needs.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Base price:</span>
                    <span className="font-medium">$15/month per user</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Early access discount:</span>
                    <span className="font-medium text-green-600">-50%</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2">
                    <span>Your price:</span>
                    <span className="text-candilingo-purple">$7.50/month per user</span>
                  </div>
                </div>
              </div>
            
              <div className="mt-6 flex flex-wrap gap-4">
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

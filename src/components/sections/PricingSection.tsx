
import PricingCard from "@/components/PricingCard";
import ROICalculator from "@/components/ROICalculator";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const PricingSection = () => {
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);

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
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-candilingo-purple">
            Simple, Clear Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Choose the plan that fits your team's needs. Pricing is per account.
          </p>
          <p className="text-md text-candilingo-purple font-medium">
            Start with a 1-month free trial. No billing until your trial ends.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline-teal" className="mt-4">
                Have a referral code? Get 3 months free!
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
                  Your free period will be applied automatically when you create an account.
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            name="Starter"
            originalPrice="€29"
            price="€14.50"
            description="Perfect for individual recruiters"
            features={[
              { text: "Unlimited term definitions", included: true },
              { text: "PDF & web page support", included: true },
              { text: "Basic term highlighting", included: true },
              { text: "Single language support", included: true },
              { text: "Custom glossaries (1)", included: true },
              { text: "Team sharing features", included: false },
              { text: "API access", included: false },
              { text: "Offline reader (Coming soon)", included: false },
              { text: "AI summaries (Coming soon)", included: false },
            ]}
            ctaText="Start Free Trial"
            className="animate-fade-in"
            stripePriceId="price_1R15uyLRETKD7zlDuGxrO9ol"
            couponId="50_PERCENT_OFF"
            trialPeriod={true}
          />
          <PricingCard
            name="Pro"
            originalPrice="€79"
            price="€39.50"
            description="Ideal for growing agencies"
            features={[
              { text: "Unlimited term definitions", included: true },
              { text: "PDF & web page support", included: true },
              { text: "Advanced term highlighting", included: true },
              { text: "Multi-language support", included: true },
              { text: "Custom glossaries (5)", included: true },
              { text: "Team sharing features", included: true },
              { text: "API access", included: false },
              { text: "Offline reader (Coming soon)", included: true },
              { text: "AI summaries (Coming soon)", included: true },
            ]}
            popular={true}
            ctaText="Start Free Trial"
            className="animate-fade-in-slow"
            stripePriceId="price_1R15yGLRETKD7zlDSrCkpFFt"
            couponId="50_PERCENT_OFF"
            trialPeriod={true}
          />
          <div className="border rounded-xl p-6 bg-white shadow-md flex flex-col h-full animate-fade-in-slower">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-candilingo-purple">Enterprise</h3>
              <p className="text-3xl font-bold my-4 text-candilingo-purple">Custom</p>
              <p className="text-gray-600 mb-6">For large agencies with advanced needs</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited term definitions",
                  "PDF & web page support",
                  "Advanced term highlighting",
                  "Multi-language support",
                  "Unlimited custom glossaries",
                  "Team sharing & admin features",
                  "On-the-job learning & Onboarding",
                  "API access & integrations",
                  "Offline reader (Coming soon)",
                  "AI summaries (Coming soon)",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-candilingo-purple mt-0.5 flex-shrink-0" />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              onClick={() => window.location.href = 'mailto:enterprise@candilingo.com'}
              className="mt-auto w-full"
              variant="purple"
            >
              Contact Enterprise Sales
            </Button>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-candilingo-purple">Check the cost</h3>
          <ROICalculator className="animate-fade-in" />
          <p className="text-center mt-4 text-sm text-gray-500">
            See how Candilingo can save your team time and money compared to your recruitment fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

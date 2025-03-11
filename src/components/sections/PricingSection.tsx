import PricingCard from "@/components/PricingCard";
import ROICalculator from "@/components/ROICalculator";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Clear Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Choose the plan that fits your team's needs. Pricing is per account.
          </p>
          <p className="text-md text-techlex-blue font-medium">
            Start with a 1-month free trial. No billing until your trial ends.
          </p>
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
              { text: "AI-powered summaries", included: true },
              { text: "Company insights", included: true },
              { text: "Custom glossaries (5)", included: true },
              { text: "Team sharing features", included: true },
              { text: "API access", included: false },
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
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-3xl font-bold my-4">Custom</p>
              <p className="text-gray-600 mb-6">For large agencies with advanced needs</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited term definitions",
                  "PDF & web page support",
                  "Advanced term highlighting",
                  "Multi-language support",
                  "AI-powered summaries",
                  "Company insights",
                  "Unlimited custom glossaries",
                  "Team sharing & admin features",
                  "On-the-job learning & Onboarding",
                  "API access & integrations",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-techlex-blue mt-0.5 flex-shrink-0" />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              onClick={() => window.location.href = 'mailto:enterprise@highlighthire.com'}
              className="mt-auto w-full bg-techlex-blue hover:bg-techlex-blue/90"
            >
              Contact Enterprise Sales
            </Button>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Check the cost</h3>
          <ROICalculator className="animate-fade-in" />
          <p className="text-center mt-4 text-sm text-gray-500">
            See how HighlightHire can save your team time and money compared to your recruitment fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import PricingCard from "@/components/PricingCard";
import ROICalculator from "@/components/ROICalculator";

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Clear Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your team's needs. Pricing is per account.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            name="Starter"
            originalPrice="€29"
            price="€14.5"
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
            ctaText="Get 50% Off Early Access"
            className="animate-fade-in"
          />
          <PricingCard
            name="Pro"
            originalPrice="€79"
            price="€39.5"
            description="Ideal for growing agencies"
            features={[
              { text: "Unlimited term definitions", included: true },
              { text: "PDF & web page support", included: true },
              { text: "Advanced term highlighting", included: true },
              { text: "Multi-language support", included: true },
              { text: "Custom glossaries (5)", included: true },
              { text: "Team sharing features", included: true },
              { text: "API access", included: false },
            ]}
            popular={true}
            ctaText="Get 50% Off Early Access"
            className="animate-fade-in-slow"
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            description="For large agencies with advanced needs"
            features={[
              { text: "Unlimited term definitions", included: true },
              { text: "PDF & web page support", included: true },
              { text: "Advanced term highlighting", included: true },
              { text: "Multi-language support", included: true },
              { text: "Unlimited custom glossaries", included: true },
              { text: "Team sharing & admin features", included: true },
              { text: "API access & integrations", included: true },
            ]}
            ctaText="Contact Sales"
            className="animate-fade-in-slower"
          />
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Check the cost</h3>
          <ROICalculator className="animate-fade-in" />
          <p className="text-center mt-4 text-sm text-gray-500">
            See how TechLex EU can save your team time and money compared to your recruitment fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

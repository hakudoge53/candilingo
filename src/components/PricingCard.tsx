import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon, Loader2 } from "lucide-react";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { toast } from "sonner";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText?: string;
  className?: string;
  stripePriceId?: string;
  stripeProductId?: string;
  couponId?: string;
  trialPeriod?: boolean;
}

const PricingCard = ({
  name,
  price,
  originalPrice,
  description,
  features,
  popular = false,
  ctaText = "Get 50% Off",
  stripePriceId,
  stripeProductId,
  couponId,
  trialPeriod = false,
  className,
}: PricingCardProps) => {
  const { redirectToCheckout, isLoading } = useStripeCheckout();

  const handleSubscribe = () => {
    if (name === "Enterprise") {
      // For Enterprise plan, use a custom price
      redirectToCheckout({
        productName: "Enterprise Plan",
        customPrice: 199, // Custom price for enterprise
        couponId,
        trialPeriod
      });
    } else if (stripePriceId) {
      // If a specific price ID is provided, use it
      redirectToCheckout({
        priceId: stripePriceId,
        productName: name,
        couponId,
        trialPeriod
      });
    } else if (stripeProductId) {
      // If a product ID is provided, let the backend find the price
      redirectToCheckout({
        productId: stripeProductId,
        productName: name,
        couponId,
        trialPeriod
      });
    } else {
      toast.error("No price configuration found for this plan");
    }
  };

  return (
    <div
      className={cn(
        "relative bg-white rounded-xl border transition-all duration-200 animate-fade-in",
        popular
          ? "shadow-xl border-candilingo-blue scale-105 z-10"
          : "shadow-md border-gray-200 hover:shadow-lg",
        className
      )}
    >
      {popular && (
        <Badge
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-candilingo-blue text-white border-0 font-medium"
          variant="outline"
        >
          Most Popular
        </Badge>
      )}

      <div className="p-6 md:p-8">
        <h3 className="font-bold text-xl mb-2 font-montserrat">{name}</h3>
        <p className="text-candilingo-midgray mb-5">{description}</p>
        
        <div className="mb-6">
          {originalPrice && price !== "Custom" ? (
            <div className="flex items-center">
              <span className="text-xl text-candilingo-midgray line-through mr-2">{originalPrice}</span>
              <span className="text-3xl font-bold text-candilingo-blue">{price}</span>
              {price !== "Custom" && <span className="text-candilingo-midgray ml-1">/month</span>}
            </div>
          ) : (
            <>
              <span className="text-3xl font-bold text-candilingo-blue">{price}</span>
              {price !== "Custom" && <span className="text-candilingo-midgray ml-1">/month</span>}
            </>
          )}
          
          {trialPeriod && (
            <div className="mt-2 text-sm text-candilingo-blue font-medium">
              1-month free trial, billed after trial ends
            </div>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={cn("flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5", 
                feature.included ? "bg-candilingo-blue text-white" : "bg-candilingo-gray")}>
                {feature.included && <CheckIcon className="w-3 h-3" />}
              </span>
              <span className={cn("ml-2", !feature.included && "text-candilingo-midgray")}>{feature.text}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className={popular ? "btn-primary w-full" : "btn-secondary w-full"}
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            ctaText
          )}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;

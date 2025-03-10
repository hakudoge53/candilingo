
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  originalPrice?: string; // Added for showing the original price
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText?: string;
  className?: string;
}

const PricingCard = ({
  name,
  price,
  originalPrice,
  description,
  features,
  popular = false,
  ctaText = "Get 50% Off",
  className,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative bg-white rounded-xl border transition-all duration-200",
        popular
          ? "shadow-xl border-techlex-blue scale-105 z-10"
          : "shadow-md border-gray-200 hover:shadow-lg",
        className
      )}
    >
      {popular && (
        <Badge
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-techlex-blue text-white border-0 font-medium"
          variant="outline"
        >
          Most Popular
        </Badge>
      )}

      <div className="p-6 md:p-8">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <p className="text-gray-600 mb-5">{description}</p>
        
        <div className="mb-6">
          {originalPrice && price !== "Custom" ? (
            <div className="flex items-center">
              <span className="text-xl text-gray-500 line-through mr-2">{originalPrice}</span>
              <span className="text-3xl font-bold text-techlex-blue">{price}</span>
              {price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
            </div>
          ) : (
            <>
              <span className="text-3xl font-bold">{price}</span>
              {price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
            </>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={cn("flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5", 
                feature.included ? "bg-techlex-blue text-white" : "bg-gray-200")}>
                {feature.included && <CheckIcon className="w-3 h-3" />}
              </span>
              <span className={cn("ml-2", !feature.included && "text-gray-400")}>{feature.text}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className={popular ? "btn-primary w-full" : "btn-secondary w-full"}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;

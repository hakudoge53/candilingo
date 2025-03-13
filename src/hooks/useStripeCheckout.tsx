
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type CheckoutOptions = {
  priceId?: string;
  productId?: string;
  productName?: string;
  customPrice?: number;
  couponId?: string;
  trialPeriod?: boolean;
  cancelUrl?: string;
}

export const useStripeCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const redirectToCheckout = async (options: CheckoutOptions) => {
    setIsLoading(true);
    
    try {
      // If no cancelUrl is provided, default to current origin + /payment-canceled
      if (!options.cancelUrl) {
        options.cancelUrl = `${window.location.origin}/payment-canceled`;
      }
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: options
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    redirectToCheckout,
    isLoading
  };
};

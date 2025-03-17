
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from '@/hooks/auth/useAuth';

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
  const { isLoggedIn, activeUser } = useAuth();

  const redirectToCheckout = async (options: CheckoutOptions) => {
    setIsLoading(true);
    
    try {
      // First check if user is logged in
      if (!isLoggedIn || !activeUser) {
        throw new Error('You must be logged in to make a purchase');
      }
      
      // If no cancelUrl is provided, default to current origin + /payment-canceled
      if (!options.cancelUrl) {
        options.cancelUrl = `${window.location.origin}/payment-canceled`;
      }
      
      console.log(`Starting checkout process for ${options.productName || 'product'}`);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          ...options,
          userId: activeUser.id,
          userEmail: activeUser.email
        }
      });
      
      if (error) {
        console.error('Checkout function error:', error);
        throw new Error(`Checkout error: ${error.message}`);
      }
      
      if (!data?.url) {
        console.error('No checkout URL returned:', data);
        throw new Error('Failed to create checkout session');
      }
      
      console.log(`Redirecting to Stripe checkout: ${data.url.substring(0, 50)}...`);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    redirectToCheckout,
    isLoading
  };
};

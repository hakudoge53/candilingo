
import { useState } from 'react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { toast } from "sonner";

export const useWebExtensionCheckout = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const { redirectToCheckout, isLoading: isCheckoutLoading } = useStripeCheckout();

  const handleWebExtensionCheckout = async (browser: string) => {
    try {
      setLocalLoading(true);
      await redirectToCheckout({
        priceId: 'price_1R15yGLRETKD7zlDSrCkpFFt', // Pro plan price ID
        productName: 'Candilingo Web Extension',
        cancelUrl: 'https://candilingo.com/customer-portal'
      });
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    handleWebExtensionCheckout,
    localLoading,
    setLocalLoading,
    isCheckoutLoading
  };
};

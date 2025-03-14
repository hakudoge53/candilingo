
import React, { useState } from 'react';
import { toast } from "sonner";
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import InstallationGuide from '@/components/customer-portal/InstallationGuide';

export interface CheckoutManagerProps {
  setLocalLoading: (loading: boolean) => void;
}

const CheckoutManager: React.FC<CheckoutManagerProps> = ({ setLocalLoading }) => {
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

  return (
    <InstallationGuide handleWebExtensionCheckout={handleWebExtensionCheckout} />
  );
};

export default CheckoutManager;

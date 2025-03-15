
import React from 'react';
import { User } from '@/hooks/auth/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle, PlusCircle } from 'lucide-react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { toast } from 'sonner';

interface BillingSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const BillingSection: React.FC<BillingSectionProps> = ({ user, setLocalLoading }) => {
  const { redirectToCheckout } = useStripeCheckout();
  const isPremium = user.membership_tier === 'Premium' || user.membership_tier === 'Pro';

  const handleUpgrade = async () => {
    try {
      setLocalLoading(true);
      await redirectToCheckout({
        priceId: 'price_1R15yGLRETKD7zlDSrCkpFFt', // Pro plan price ID
        productName: 'Candilingo Premium Subscription',
        couponId: '50_PERCENT_OFF', // Apply 50% discount
        cancelUrl: window.location.origin + '/customer-portal'
      });
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Billing & Subscription</h2>
        <p className="text-gray-600 mb-6">
          Manage your subscription and payment information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-full ${isPremium ? 'bg-green-100' : 'bg-blue-100'}`}>
                {isPremium ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <CreditCard className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg">{user.membership_tier || 'Free'} Plan</h3>
                <p className="text-sm text-gray-500">
                  {isPremium 
                    ? 'All features included' 
                    : 'Basic features included'}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {!isPremium && (
              <Button onClick={handleUpgrade} className="w-full">
                Upgrade to Premium
              </Button>
            )}
            {isPremium && (
              <div className="w-full text-center text-sm text-gray-500">
                Thanks for being a premium subscriber!
              </div>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            {isPremium ? (
              <div className="flex items-start gap-3 border p-3 rounded-md">
                <CreditCard className="h-5 w-5 mt-0.5 text-gray-600" />
                <div>
                  <div className="font-medium">•••• •••• •••• 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/25</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No payment methods added yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BillingSection;

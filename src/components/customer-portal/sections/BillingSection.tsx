
import React from 'react';
import { User } from '@/hooks/auth/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle, PlusCircle, Shield, Gift, Clock, Wallet } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#A020F0]/10 to-[#FF69B4]/10 p-6 rounded-xl border border-[#FF69B4]/20">
        <h2 className="text-2xl font-bold mb-4 text-[#6E59A5] text-center">Billing & Subscription</h2>
        <p className="text-gray-600 mb-6 text-center">
          Manage your subscription and payment information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden border-t-4 border-t-[#9b87f5] shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-transparent">
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <Shield className="h-5 w-5 text-[#9b87f5]" />
              Current Plan
            </CardTitle>
            <CardDescription className="text-center">Your active subscription</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-5 mb-6">
              <div className={`p-3 rounded-full ${isPremium ? 'bg-gradient-to-br from-[#9b87f5] to-[#6E59A5]' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                {isPremium ? (
                  <CheckCircle className="h-7 w-7 text-white" />
                ) : (
                  <CreditCard className="h-7 w-7 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-xl text-[#6E59A5]">{user.membership_tier || 'Free'} Plan</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isPremium 
                    ? 'All features included' 
                    : 'Basic features included'}
                </p>
                {isPremium && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#9b87f5]">
                    <Clock className="h-4 w-4" />
                    <span>Renews on December 15, 2025</span>
                  </div>
                )}
              </div>
            </div>
            
            {isPremium && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">50% Early Bird Discount Applied</p>
                    <p className="text-sm text-green-600">Your discount will be applied for the first year!</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gradient-to-b from-transparent to-gray-50/50">
            {!isPremium && (
              <Button onClick={handleUpgrade} className="w-full bg-[#D946EF] hover:bg-[#A020F0] rounded-md">
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

        <Card className="overflow-hidden border-t-4 border-t-[#D946EF] shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-[#D946EF]/10 to-transparent">
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <CreditCard className="h-5 w-5 text-[#D946EF]" />
              Payment Methods
            </CardTitle>
            <CardDescription className="text-center">Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isPremium ? (
              <div className="flex items-start gap-4 border p-4 rounded-lg bg-white shadow-sm">
                <div className="p-2 bg-gradient-to-r from-[#6E59A5]/20 to-[#D946EF]/20 rounded-md">
                  <CreditCard className="h-6 w-6 text-[#6E59A5]" />
                </div>
                <div>
                  <div className="font-medium">•••• •••• •••• 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/25</div>
                  <div className="mt-2 text-xs text-[#D946EF]">Primary payment method</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                  <Wallet className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500">No payment methods added yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gradient-to-b from-transparent to-gray-50/50">
            <Button variant="outline" className="w-full border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF]/10 rounded-md">
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

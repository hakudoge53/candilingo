
import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, CheckCircle, PlusCircle, Shield, Gift, Clock, Package } from 'lucide-react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLicenses } from '@/hooks/organization/licenses/useLicenses';

interface BillingSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const BillingSection: React.FC<BillingSectionProps> = ({ user, setLocalLoading }) => {
  const { redirectToCheckout } = useStripeCheckout();
  const { licenses, isLoading: licensesLoading } = useLicenses();
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  
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
  
  const handlePurchaseLicenses = async (quantity: number) => {
    try {
      setLocalLoading(true);
      await redirectToCheckout({
        productName: `${quantity} Candilingo Licenses`,
        customPrice: quantity * 10, // $10 per license
        cancelUrl: window.location.origin + '/customer-portal'
      });
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLocalLoading(false);
      setIsUpgradeDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-candilingo-purple/10 to-candilingo-teal/10 p-6 rounded-xl border border-candilingo-teal/20">
        <h2 className="text-2xl font-bold mb-4 text-candilingo-darkpurple">Billing & Subscription</h2>
        <p className="text-gray-600 mb-6">
          Manage your subscription and payment information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden border-t-4 border-t-candilingo-teal shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-candilingo-teal/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-candilingo-teal" />
              Current Plan
            </CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-5 mb-6">
              <div className={`p-3 rounded-full ${isPremium ? 'bg-gradient-to-br from-candilingo-teal to-candilingo-purple' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                {isPremium ? (
                  <CheckCircle className="h-7 w-7 text-white" />
                ) : (
                  <CreditCard className="h-7 w-7 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-xl text-candilingo-darkpurple">{user.membership_tier || 'Free'} Plan</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isPremium 
                    ? 'All features included' 
                    : 'Basic features included'}
                </p>
                {isPremium && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-candilingo-teal">
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
              <Button onClick={() => setIsUpgradeDialogOpen(true)} variant="teal" className="w-full">
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

        <Card className="overflow-hidden border-t-4 border-t-candilingo-purple shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-candilingo-purple/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-candilingo-purple" />
              Organization Licenses
            </CardTitle>
            <CardDescription>Manage your team licenses</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {licensesLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading license information...</p>
              </div>
            ) : licenses && licenses.length > 0 ? (
              <div className="space-y-4">
                <div className="border p-4 rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Active Licenses</h4>
                    <span className="text-sm font-medium text-candilingo-purple">
                      {licenses.reduce((sum, license) => sum + license.used_licenses, 0)} / 
                      {licenses.reduce((sum, license) => sum + license.total_licenses, 0)} used
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-candilingo-purple h-2.5 rounded-full" 
                      style={{ 
                        width: 
                          licenses.reduce((sum, license) => sum + license.total_licenses, 0) > 0 
                            ? `${(licenses.reduce((sum, license) => sum + license.used_licenses, 0) / 
                              licenses.reduce((sum, license) => sum + license.total_licenses, 0)) * 100}%`
                            : '0%'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Need more licenses? Purchase additional licenses to add more team members.
                </div>
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No licenses purchased yet</p>
                <p className="text-sm text-gray-400 mb-4">Purchase licenses to invite team members</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gradient-to-b from-transparent to-gray-50/50">
            <Button onClick={() => handlePurchaseLicenses(5)} variant="outline-purple" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Purchase Licenses
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Upgrade Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Premium</DialogTitle>
            <DialogDescription>
              Get access to all Candilingo features and benefits
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Premium Benefits:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited glossary terms
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Advanced CV scanning capabilities
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Team collaboration features
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Priority support
                </li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center border-t pt-4">
              <span className="font-medium">Price:</span>
              <div className="text-right">
                <span className="line-through text-gray-400 text-sm">$29.99/month</span>
                <span className="text-lg font-bold text-candilingo-purple ml-2">$14.99/month</span>
                <p className="text-xs text-green-600">50% Early Bird Discount</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpgrade}>
              Upgrade Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingSection;

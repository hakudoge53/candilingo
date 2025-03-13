
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContainer from '@/components/auth/AuthContainer';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Copy, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

const CustomerPortal = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [activeReferral, setActiveReferral] = useState<any>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const { redirectToCheckout, isLoading: isCheckoutLoading } = useStripeCheckout();
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading || isCheckoutLoading;

  useEffect(() => {
    const fetchActiveReferral = async () => {
      if (!isLoggedIn || !activeUser?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('referral_usage')
          .select(`
            id,
            expires_at,
            referral_codes:referral_code_id (
              code,
              duration_months,
              description
            )
          `)
          .eq('user_id', activeUser.id)
          .order('expires_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (data) {
          setActiveReferral(data);
        }
      } catch (error) {
        console.error("Error fetching referral:", error);
      }
    };
    
    fetchActiveReferral();
  }, [isLoggedIn, activeUser]);

  const applyReferralCode = async () => {
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    if (!activeUser?.id) {
      toast.error("You must be logged in to apply a referral code");
      return;
    }

    setIsApplyingCode(true);
    
    try {
      // Start checkout with referral code
      await redirectToCheckout({
        productId: 'prod_referral',
        couponId: referralCode.toUpperCase(),
      });
    } catch (error) {
      console.error("Error applying referral code:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsApplyingCode(false);
    }
  };

  const handleWebExtensionCheckout = async (browser: string) => {
    try {
      setLocalLoading(true);
      await redirectToCheckout({
        priceId: 'price_1R15yGLRETKD7zlDSrCkpFFt', // Pro plan price ID
        productName: 'Candilingo Web Extension',
      });
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const copyShareableLink = () => {
    const link = `${window.location.origin}?ref=CANDILINGO`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl font-bold text-candilingo-purple">Candilingo</span>
            </div>
            <h1 className="text-3xl font-bold text-candilingo-purple">Customer <span className="text-candilingo-pink">Portal</span></h1>
          </div>
          
          {showLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {!isLoggedIn ? (
                <div className="max-w-md mx-auto">
                  <AuthContainer setIsLoading={setLocalLoading} />
                </div>
              ) : (
                <div className="space-y-6">
                  {activeUser && (
                    <UserProfile 
                      user={activeUser} 
                      onLogout={handleLogout} 
                      isLoading={localLoading} 
                    />
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-candilingo-purple">Installation Guide</CardTitle>
                      <CardDescription>Follow these simple steps to install Candilingo</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Chrome Installation</h3>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Complete the purchase process</li>
                            <li>Download the extension from the Chrome Web Store</li>
                            <li>Click "Add to Chrome" in the top right</li>
                            <li>Confirm by clicking "Add extension" in the popup</li>
                          </ol>
                          <Button 
                            variant="pink" 
                            size="sm" 
                            className="mt-3 w-full"
                            onClick={() => handleWebExtensionCheckout('chrome')}
                          >
                            Get Chrome Extension
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Firefox Installation</h3>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Complete the purchase process</li>
                            <li>Visit the Firefox Add-ons page for Candilingo</li>
                            <li>Click "Add to Firefox"</li>
                            <li>Confirm by clicking "Add" in the dialog</li>
                          </ol>
                          <Button 
                            variant="pink" 
                            size="sm" 
                            className="mt-3 w-full"
                            onClick={() => handleWebExtensionCheckout('firefox')}
                          >
                            Get Firefox Add-on
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Edge Installation</h3>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Complete the purchase process</li>
                            <li>Open the Edge Add-ons page for Candilingo</li>
                            <li>Click "Get" and then "Add extension"</li>
                            <li>The extension will install automatically</li>
                          </ol>
                          <Button 
                            variant="pink" 
                            size="sm" 
                            className="mt-3 w-full"
                            onClick={() => handleWebExtensionCheckout('edge')}
                          >
                            Get Edge Add-on
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Safari Installation</h3>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Complete the purchase process</li>
                            <li>Open Safari and go to Preferences</li>
                            <li>Go to the Extensions tab</li>
                            <li>Search for "Candilingo" and click Install</li>
                          </ol>
                          <Button 
                            variant="pink" 
                            size="sm" 
                            className="mt-3 w-full"
                            onClick={() => handleWebExtensionCheckout('safari')}
                          >
                            Get Safari Extension
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-candilingo-purple">Referral Program</CardTitle>
                      <CardDescription>Invite your colleagues and get extended free access</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {activeReferral && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="text-green-600 h-5 w-5" />
                              <h3 className="font-medium text-green-800">Active Referral Code</h3>
                            </div>
                            <p className="text-green-700 mb-1">
                              You have free access until{" "}
                              <strong>
                                {new Date(activeReferral.expires_at).toLocaleDateString()}
                              </strong>
                            </p>
                            <p className="text-green-700 text-sm">
                              Code: <Badge variant="outline" className="ml-1 bg-white">{activeReferral.referral_codes.code}</Badge>
                            </p>
                          </div>
                        )}

                        <div>
                          <h3 className="font-medium mb-2">Apply a Referral Code</h3>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter referral code"
                              value={referralCode}
                              onChange={(e) => setReferralCode(e.target.value)}
                            />
                            <Button 
                              variant="pink" 
                              onClick={applyReferralCode}
                              disabled={isApplyingCode}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <h3 className="font-medium mb-3">Share Candilingo</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Share Candilingo with your network. They'll get 3 months free access with our standard referral code.
                          </p>
                          <div className="flex items-center gap-2">
                            <Input
                              disabled
                              value={`${window.location.origin}?ref=CANDILINGO`}
                            />
                            <Button
                              variant="outline"
                              onClick={copyShareableLink}
                              className="flex items-center gap-2"
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerPortal;

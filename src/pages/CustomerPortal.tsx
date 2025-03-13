
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
import { CheckCircle, Copy } from "lucide-react";

const CustomerPortal = () => {
  const { isLoggedIn, isLoading, activeUser, handleLogout } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [activeReferral, setActiveReferral] = useState<any>(null);
  
  // Combined loading state for both auth operations and local form submissions
  const showLoading = isLoading || localLoading;

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
          .single();
        
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
      const { data, error } = await supabase.functions.invoke('validate-referral', {
        body: { code: referralCode }
      });
      
      if (error) {
        toast.error(error.message || "Error applying referral code");
        return;
      }
      
      toast.success(data.message);
      setReferralCode("");
      
      // Refresh active referral
      const { data: refreshedData } = await supabase
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
        .single();
      
      if (refreshedData) {
        setActiveReferral(refreshedData);
      }
    } catch (error) {
      console.error("Error applying referral code:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsApplyingCode(false);
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
          <h1 className="text-3xl font-bold mb-8 text-candilingo-purple text-center">Customer Portal</h1>
          
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
                              variant="purple" 
                              onClick={applyReferralCode}
                              disabled={isApplyingCode}
                            >
                              Apply
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Try using codes like: WELCOME2024, EARLYBIRD, CANDILINGO
                          </p>
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

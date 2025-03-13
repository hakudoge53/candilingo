
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";

interface ReferralProgramProps {
  referralCode: string;
  setReferralCode: (code: string) => void;
  isApplyingCode: boolean;
  applyReferralCode: () => void;
  activeReferral: any;
}

const ReferralProgram = ({ 
  referralCode, 
  setReferralCode, 
  isApplyingCode, 
  applyReferralCode, 
  activeReferral 
}: ReferralProgramProps) => {
  
  const copyShareableLink = () => {
    const link = `${window.location.origin}?ref=CANDILINGO`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard!");
  };

  return (
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
  );
};

export default ReferralProgram;

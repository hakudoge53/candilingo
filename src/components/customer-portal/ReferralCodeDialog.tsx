
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ReferralCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ReferralCodeDialog = ({ isOpen, onClose, onSuccess }: ReferralCodeDialogProps) => {
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('validate-referral', {
        body: { code: referralCode.trim() }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        toast.error(data.error || "Failed to apply referral code");
      }
    } catch (error) {
      console.error("Error applying referral code:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-candilingo-purple">Enter Referral Code</DialogTitle>
          <DialogDescription>
            Enter your Candilingo referral code to get access to premium features.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              id="referralCode"
              placeholder="Enter your referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="purple" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Apply Code"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralCodeDialog;

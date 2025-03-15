
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BasicInfoFormValues } from '@/components/auth/BasicInfoForm';
import { AdditionalInfoFormValues } from '@/components/auth/AdditionalInfoForm';

export function useInvitationRegistration(
  setIsLoading: (loading: boolean) => void,
  setRegistrationComplete: (complete: boolean) => void,
  setEmailConfirmationRequired: (required: boolean) => void
) {
  const [isInvitedUser, setIsInvitedUser] = useState<boolean>(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  
  // Check for invitation token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('invitation');
    if (token) {
      setIsInvitedUser(true);
      setInvitationToken(token);
    }
  }, []);

  // Complete registration for invited users
  const handleCompleteInvitedUserRegistration = async (
    basicInfo: BasicInfoFormValues, 
    values: AdditionalInfoFormValues
  ) => {
    if (!basicInfo || !invitationToken) return;
    
    try {
      setIsLoading(true);
      
      // Always use the current domain for the redirect
      const redirectUrl = window.location.origin + '/customer-portal';
      
      // Verify invitation token
      const { data: invitationData, error: invitationError } = await supabase
        .from('organization_members')
        .select('*')
        .eq('invitation_token', invitationToken)
        .eq('status', 'pending')
        .maybeSingle();
      
      if (invitationError || !invitationData) {
        toast.error("Invalid or expired invitation. Please request a new invitation.");
        setIsLoading(false);
        return;
      }
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: basicInfo.email,
        password: basicInfo.password,
        options: {
          data: {
            name: basicInfo.name,
            role: values.role,
            industry: values.industry,
            referral_source: values.referralSource,
            user_type: 'invited_user' // Add user type for invited users
          },
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // Update organization member with the new user ID
      if (data.user) {
        const { error: updateError } = await supabase
          .from('organization_members')
          .update({
            user_id: data.user.id,
            status: 'active'
          })
          .eq('invitation_token', invitationToken);
        
        if (updateError) {
          console.error("Error updating invitation status:", updateError);
        }
      }
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        console.log("Email confirmation required");
        setEmailConfirmationRequired(true);
        setRegistrationComplete(true);
        setIsLoading(false);
        toast.info("Registration successful! Please check your email to confirm your account.");
        return;
      }
      
      // Registration successful
      setRegistrationComplete(true);
      toast.success("Registration successful! You've been added to the organization.");
      
      // Redirect to customer portal after successful registration
      setTimeout(() => {
        window.location.href = '/customer-portal';
      }, 2000);
      
    } catch (error) {
      console.error("Invited user registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInvitedUser,
    invitationToken,
    handleCompleteInvitedUserRegistration
  };
}

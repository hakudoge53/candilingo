
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BasicInfoFormValues } from './BasicInfoForm';
import { AdditionalInfoFormValues } from './AdditionalInfoForm';

export const useRegistrationHandlers = (setIsLoading: (loading: boolean) => void) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormValues | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);
  const [autoLoginFailed, setAutoLoginFailed] = useState<boolean>(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoFormValues | null>(null);
  const [isInvitedUser, setIsInvitedUser] = useState<boolean>(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  
  // Check for invitation token in URL
  useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('invitation');
    if (token) {
      setIsInvitedUser(true);
      setInvitationToken(token);
    }
  });
  
  // Navigate to customer portal
  const navigateToCustomerPortal = () => {
    window.location.href = '/customer-portal';
  };
  
  // Handle basic info submission (step 1)
  const onBasicInfoSubmit = (values: BasicInfoFormValues) => {
    setBasicInfo(values);
    setCurrentStep(2);
  };
  
  // Handle going back to step 1
  const handleBackToBasicInfo = () => {
    setCurrentStep(1);
  };

  // Handle additional info submission (step 2)
  const onAdditionalInfoSubmit = async (values: AdditionalInfoFormValues) => {
    if (!basicInfo) return;
    
    setAdditionalInfo(values);
    
    // For business owners, move to step 3
    // For invited users, complete registration directly
    if (isInvitedUser) {
      await handleCompleteInvitedUserRegistration(values);
    } else {
      setCurrentStep(3);
    }
  };

  // Complete registration for business owners (formerly step 3 with organization)
  const handleCompleteBusinessOwnerRegistration = async () => {
    if (!basicInfo || !additionalInfo) return;
    
    try {
      setIsLoading(true);
      
      // Always use the current domain for the redirect
      const redirectUrl = window.location.origin + '/customer-portal';
      
      console.log("Using redirect URL:", redirectUrl);
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: basicInfo.email,
        password: basicInfo.password,
        options: {
          data: {
            name: basicInfo.name,
            role: additionalInfo.role,
            industry: additionalInfo.industry,
            referral_source: additionalInfo.referralSource,
            user_type: 'business_owner' // Add user type for business owners
          },
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // Check if email confirmation is required
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast.info("This email is already registered. Please sign in instead.");
        setIsLoading(false);
        return;
      }
      
      // Check if email confirmation is pending
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
      toast.success("Registration successful! Logging you in...");
      
      // Redirect to customer portal after successful registration
      setTimeout(() => {
        navigateToCustomerPortal();
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Complete registration for invited users
  const handleCompleteInvitedUserRegistration = async (values: AdditionalInfoFormValues) => {
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
        navigateToCustomerPortal();
      }, 2000);
      
    } catch (error) {
      console.error("Invited user registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    currentStep,
    registrationComplete,
    autoLoginFailed,
    emailConfirmationRequired,
    basicInfo,
    isInvitedUser,
    onBasicInfoSubmit,
    onAdditionalInfoSubmit,
    handleCompleteBusinessOwnerRegistration,
    handleBackToBasicInfo,
    navigateToCustomerPortal
  };
};

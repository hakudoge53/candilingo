
import { useState } from 'react';
import { BasicInfoFormValues } from './BasicInfoForm';
import { AdditionalInfoFormValues } from './AdditionalInfoForm';
import { useBasicRegistration } from '@/hooks/auth/useBasicRegistration';
import { useInvitationRegistration } from '@/hooks/auth/useInvitationRegistration';
import { useBusinessOwnerRegistration } from '@/hooks/auth/useBusinessOwnerRegistration';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useRegistrationHandlers = (setIsLoading: (loading: boolean) => void) => {
  // Use the more focused hooks
  const {
    currentStep,
    setCurrentStep,
    basicInfo,
    setBasicInfo,
    additionalInfo,
    setAdditionalInfo,
    registrationComplete,
    setRegistrationComplete,
    autoLoginFailed,
    emailConfirmationRequired,
    setEmailConfirmationRequired,
    navigateToCustomerPortal,
    onBasicInfoSubmit,
    handleBackToBasicInfo
  } = useBasicRegistration();

  const {
    isInvitedUser,
    invitationToken,
    handleCompleteInvitedUserRegistration
  } = useInvitationRegistration(
    setIsLoading,
    setRegistrationComplete,
    setEmailConfirmationRequired
  );

  const {
    handleCompleteBusinessOwnerRegistration: completeBusinessOwnerRegistration
  } = useBusinessOwnerRegistration(
    setIsLoading,
    setEmailConfirmationRequired,
    setRegistrationComplete
  );

  // Social login handlers
  const handleSocialLogin = async (provider: 'google' | 'linkedin_oidc') => {
    try {
      setIsLoading(true);
      
      // Use the configured site URL for redirects
      const redirectUrl = `${window.location.origin}/customer-portal`;
      
      console.log(`Starting ${provider} registration with redirect to:`, redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl
        }
      });
      
      if (error) {
        console.error(`${provider} registration error:`, error);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      console.log(`${provider} OAuth initiated, redirecting to provider`);
      // User will be redirected to the authentication provider
    } catch (error) {
      console.error(`${provider} registration error:`, error);
      toast.error(`An error occurred during ${provider} registration. Please try again.`);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    return handleSocialLogin('google');
  };

  const handleLinkedInLogin = () => {
    return handleSocialLogin('linkedin_oidc');
  };

  // Handle additional info submission (step 2)
  const onAdditionalInfoSubmit = async (values: AdditionalInfoFormValues) => {
    if (!basicInfo) return;
    
    setAdditionalInfo(values);
    
    // For business owners, move to step 3
    // For invited users, complete registration directly
    if (isInvitedUser) {
      await handleCompleteInvitedUserRegistration(basicInfo, values);
    } else {
      setCurrentStep(3);
    }
  };

  // Wrapper for the business owner registration to use the stored basic and additional info
  const handleCompleteBusinessOwnerRegistration = async () => {
    if (!basicInfo || !additionalInfo) return;
    await completeBusinessOwnerRegistration(basicInfo, additionalInfo);
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
    navigateToCustomerPortal,
    handleGoogleLogin,
    handleLinkedInLogin
  };
};

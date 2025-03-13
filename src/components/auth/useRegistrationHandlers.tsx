
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
  
  // Handle basic info submission (step 1)
  const onBasicInfoSubmit = (values: BasicInfoFormValues) => {
    setBasicInfo(values);
    setCurrentStep(2);
  };
  
  // Navigate to customer portal
  const navigateToCustomerPortal = () => {
    window.location.href = '/customer-portal';
  };
  
  // Handle going back to step 1
  const handleBackToBasicInfo = () => {
    setCurrentStep(1);
  };
  
  // Handle additional info submission and complete registration (step 2)
  const onAdditionalInfoSubmit = async (values: AdditionalInfoFormValues) => {
    if (!basicInfo) return;
    
    try {
      setIsLoading(true);
      
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
          },
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
      
      // Registration successful
      setRegistrationComplete(true);
      
      // Sign in immediately after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: basicInfo.email,
        password: basicInfo.password,
      });
      
      if (signInError) {
        console.error("Auto-login error:", signInError);
        toast.error("Registration complete, but auto-login failed. Please log in manually.");
        setAutoLoginFailed(true);
        setIsLoading(false);
        return;
      }
      
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
  
  return {
    currentStep,
    registrationComplete,
    autoLoginFailed,
    basicInfo,
    onBasicInfoSubmit,
    onAdditionalInfoSubmit,
    handleBackToBasicInfo,
    navigateToCustomerPortal
  };
};

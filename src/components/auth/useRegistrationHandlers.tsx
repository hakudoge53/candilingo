
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BasicInfoFormValues } from './BasicInfoForm';
import { AdditionalInfoFormValues } from './AdditionalInfoForm';
import { useAuth } from "@/hooks/useAuth";

export const useRegistrationHandlers = (setIsLoading: (loading: boolean) => void) => {
  const { createDefaultOrganization } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormValues | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);
  const [autoLoginFailed, setAutoLoginFailed] = useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoFormValues | null>(null);
  const [showOrganizationPrompt, setShowOrganizationPrompt] = useState<boolean>(false);
  const [orgName, setOrgName] = useState<string>("My Organization");
  
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

  // Handle going back to step 2
  const handleBackToAdditionalInfo = () => {
    setCurrentStep(2);
    setShowOrganizationPrompt(false);
  };
  
  // Handle additional info submission (step 2)
  const onAdditionalInfoSubmit = async (values: AdditionalInfoFormValues) => {
    if (!basicInfo) return;
    
    setAdditionalInfo(values);
    setCurrentStep(3);
  };

  // Handle organization creation and complete registration (step 3)
  const handleCreateOrganization = async () => {
    if (!basicInfo || !additionalInfo) return;
    if (!orgName.trim()) {
      toast.error("Organization name cannot be empty");
      return;
    }
    
    try {
      setIsLoading(true);
      
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
      
      // Sign in immediately after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: basicInfo.email,
        password: basicInfo.password,
      });
      
      if (signInError) {
        console.error("Auto-login error:", signInError);
        toast.error("Registration complete, but auto-login failed. Please log in manually.");
        setAutoLoginFailed(true);
        setRegistrationComplete(true);
        setIsLoading(false);
        return;
      }
      
      // Create organization for the user
      const result = await createDefaultOrganization(orgName);
      
      if (!result) {
        console.error("Failed to create organization");
        toast.error("Registration complete, but failed to create organization. Please try again after logging in.");
        setAutoLoginFailed(true);
        setRegistrationComplete(true);
        setIsLoading(false);
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

  const handleCancelRegistration = () => {
    // This would be used if the user cancels during the organization creation step
    setCurrentStep(2);
    setShowOrganizationPrompt(false);
  };
  
  return {
    currentStep,
    registrationComplete,
    autoLoginFailed,
    basicInfo,
    showOrganizationPrompt,
    orgName,
    setOrgName,
    onBasicInfoSubmit,
    onAdditionalInfoSubmit,
    handleCreateOrganization,
    handleBackToBasicInfo,
    handleBackToAdditionalInfo,
    handleCancelRegistration,
    navigateToCustomerPortal
  };
};

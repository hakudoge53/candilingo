
import { useState } from 'react';
import { BasicInfoFormValues } from '@/components/auth/BasicInfoForm';
import { AdditionalInfoFormValues } from '@/components/auth/AdditionalInfoForm';

export function useBasicRegistration() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormValues | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoFormValues | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);
  const [autoLoginFailed, setAutoLoginFailed] = useState<boolean>(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState<boolean>(false);

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

  return {
    currentStep,
    setCurrentStep,
    basicInfo,
    setBasicInfo,
    additionalInfo,
    setAdditionalInfo,
    registrationComplete,
    setRegistrationComplete,
    autoLoginFailed,
    setAutoLoginFailed,
    emailConfirmationRequired,
    setEmailConfirmationRequired,
    navigateToCustomerPortal,
    onBasicInfoSubmit,
    handleBackToBasicInfo
  };
}

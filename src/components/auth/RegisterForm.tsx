
import React from 'react';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import RegistrationSuccess from './RegistrationSuccess';
import { useRegistrationHandlers } from './useRegistrationHandlers';

interface RegisterFormProps {
  setIsLoading: (loading: boolean) => void;
}

const RegisterForm = ({ setIsLoading }: RegisterFormProps) => {
  const {
    currentStep,
    registrationComplete,
    autoLoginFailed,
    onBasicInfoSubmit,
    onAdditionalInfoSubmit,
    handleBackToBasicInfo,
    navigateToCustomerPortal
  } = useRegistrationHandlers(setIsLoading);

  // Render registration success
  if (registrationComplete) {
    return (
      <RegistrationSuccess 
        onNavigate={navigateToCustomerPortal} 
        autoLoginFailed={autoLoginFailed}
      />
    );
  }

  // Render step 1 - Basic info
  if (currentStep === 1) {
    return <BasicInfoForm onSubmit={onBasicInfoSubmit} />;
  }

  // Render step 2 - Additional info
  return (
    <AdditionalInfoForm 
      onSubmit={onAdditionalInfoSubmit} 
      onBack={handleBackToBasicInfo}
    />
  );
};

export default RegisterForm;

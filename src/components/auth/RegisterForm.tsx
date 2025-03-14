
import React from 'react';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import RegistrationSuccess from './RegistrationSuccess';
import OrganizationPrompt from './OrganizationPrompt';
import { useRegistrationHandlers } from './useRegistrationHandlers';

interface RegisterFormProps {
  setIsLoading: (loading: boolean) => void;
}

const RegisterForm = ({ setIsLoading }: RegisterFormProps) => {
  const {
    currentStep,
    registrationComplete,
    autoLoginFailed,
    orgName,
    setOrgName,
    onBasicInfoSubmit,
    onAdditionalInfoSubmit,
    handleCreateOrganization,
    handleBackToBasicInfo,
    handleBackToAdditionalInfo,
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
  if (currentStep === 2) {
    return (
      <AdditionalInfoForm 
        onSubmit={onAdditionalInfoSubmit} 
        onBack={handleBackToBasicInfo}
      />
    );
  }

  // Render step 3 - Organization setup
  return (
    <OrganizationPrompt 
      orgName={orgName}
      setOrgName={setOrgName}
      handleCreateOrganization={handleCreateOrganization}
      onCancel={handleBackToAdditionalInfo}
      isRegistration={true}
    />
  );
};

export default RegisterForm;

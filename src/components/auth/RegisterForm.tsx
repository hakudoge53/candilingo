
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
    emailConfirmationRequired,
    isInvitedUser,
    onBasicInfoSubmit,
    onAdditionalInfoSubmit,
    handleCompleteBusinessOwnerRegistration,
    handleBackToBasicInfo,
    navigateToCustomerPortal
  } = useRegistrationHandlers(setIsLoading);

  // Render registration success
  if (registrationComplete) {
    return (
      <RegistrationSuccess 
        onNavigate={navigateToCustomerPortal} 
        autoLoginFailed={autoLoginFailed}
        emailConfirmationRequired={emailConfirmationRequired}
      />
    );
  }

  // Render step 1 - Basic info
  if (currentStep === 1) {
    return (
      <div>
        {isInvitedUser ? (
          <div className="mb-4 bg-green-50 border border-green-200 rounded p-3">
            <p className="text-green-700 font-medium">
              You have been invited to join an organization. Please complete the registration process.
            </p>
          </div>
        ) : (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-700 font-medium">
              Business Owner Registration
            </p>
            <p className="text-sm text-gray-600 mt-1">
              This registration is for business owners. Users can only join with an invitation link.
            </p>
          </div>
        )}
        <BasicInfoForm onSubmit={onBasicInfoSubmit} />
      </div>
    );
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

  // Render step 3 - Complete business owner registration
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Step 3 of 3</p>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-candilingo-purple h-2 rounded-full w-full"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Complete Registration</h3>
        <p className="text-sm text-gray-500">
          You're almost done! Click the button below to complete your registration.
        </p>
        
        <div className="flex space-x-3 pt-4">
          <button 
            onClick={handleCompleteBusinessOwnerRegistration} 
            className="w-full py-2 px-4 bg-candilingo-purple text-white rounded hover:bg-candilingo-purple/90"
          >
            Complete Registration
          </button>
          <button 
            onClick={handleBackToBasicInfo}
            className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

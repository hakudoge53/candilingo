
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon, AlertCircle, MailIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

interface RegistrationSuccessProps {
  onNavigate: () => void;
  autoLoginFailed?: boolean;
  emailConfirmationRequired?: boolean;
}

const RegistrationSuccess = ({ 
  onNavigate, 
  autoLoginFailed = false,
  emailConfirmationRequired = false
}: RegistrationSuccessProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Use the provided callback if available, otherwise navigate directly
    if (onNavigate) {
      onNavigate();
    } else if (emailConfirmationRequired) {
      navigate('/customer-portal');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="text-center space-y-4 py-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        {emailConfirmationRequired ? (
          <MailIcon className="h-6 w-6 text-green-600" />
        ) : (
          <CheckIcon className="h-6 w-6 text-green-600" />
        )}
      </div>
      
      <h3 className="text-lg font-medium text-candilingo-purple">Registration successful!</h3>
      
      {emailConfirmationRequired ? (
        <Alert className="bg-blue-50 border-blue-200">
          <MailIcon className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-gray-700">
            Please check your email for a confirmation link to activate your account. 
            The link is valid for a limited time only.
          </AlertDescription>
        </Alert>
      ) : autoLoginFailed ? (
        <Alert className="bg-gray-50 border-gray-200">
          <AlertCircle className="h-5 w-5 text-gray-700" />
          <AlertDescription className="text-gray-700">
            Registration complete, but auto-login failed. Please log in manually.
          </AlertDescription>
        </Alert>
      ) : (
        <p className="text-sm text-gray-500">
          Your account has been created. Redirecting you to the dashboard...
        </p>
      )}
      
      <Button 
        type="button" 
        variant="purple"
        className="mt-4 w-full"
        onClick={handleNavigation}
      >
        {emailConfirmationRequired ? "Return to Login" : 
          autoLoginFailed ? "Log in manually" : "Go to Dashboard"}
      </Button>
    </div>
  );
};

export default RegistrationSuccess;

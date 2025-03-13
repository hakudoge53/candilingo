
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RegistrationSuccessProps {
  onNavigate: () => void;
  autoLoginFailed?: boolean;
}

const RegistrationSuccess = ({ onNavigate, autoLoginFailed = false }: RegistrationSuccessProps) => {
  return (
    <div className="text-center space-y-4 py-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <CheckIcon className="h-6 w-6 text-green-600" />
      </div>
      
      <h3 className="text-lg font-medium text-candilingo-purple">Registration successful!</h3>
      
      {autoLoginFailed ? (
        <Alert className="bg-gray-50 border-gray-200">
          <AlertCircle className="h-5 w-5 text-gray-700" />
          <AlertDescription className="text-gray-700">
            Registration complete, but auto-login failed. Please log in manually.
          </AlertDescription>
        </Alert>
      ) : (
        <p className="text-sm text-gray-500">
          Your account has been created. Redirecting you to the customer portal...
        </p>
      )}
      
      <Button 
        type="button" 
        variant="purple"
        className="mt-4 w-full"
        onClick={onNavigate}
      >
        {autoLoginFailed ? "Log in manually" : "Go to Customer Portal"}
      </Button>
    </div>
  );
};

export default RegistrationSuccess;

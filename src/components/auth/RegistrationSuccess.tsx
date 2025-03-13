
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface RegistrationSuccessProps {
  onNavigate: () => void;
}

const RegistrationSuccess = ({ onNavigate }: RegistrationSuccessProps) => {
  return (
    <div className="text-center space-y-4 py-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <CheckIcon className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-lg font-medium text-candilingo-purple">Registration Successful!</h3>
      <p className="text-sm text-gray-500">
        Your account has been created. Redirecting you to the customer portal...
      </p>
      <Button 
        type="button" 
        variant="purple"
        className="mt-4 w-full"
        onClick={onNavigate}
      >
        Go to Customer Portal
      </Button>
    </div>
  );
};

export default RegistrationSuccess;

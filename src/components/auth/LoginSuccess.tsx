
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginSuccessProps {
  navigateToDashboard: () => void;
}

const LoginSuccess = ({ navigateToDashboard }: LoginSuccessProps) => {
  const navigate = useNavigate();
  
  const handleNavigateToDashboard = () => {
    // Use the provided callback if available, otherwise use navigate directly
    if (navigateToDashboard) {
      navigateToDashboard();
    } else {
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="text-center space-y-4 py-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <CheckIcon className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-lg font-medium text-candilingo-purple">Welcome back!</h3>
      <p className="text-sm text-gray-500">
        You've successfully logged in to your Candilingo account.
      </p>
      <Button 
        type="button" 
        variant="purple"
        className="mt-4 w-full text-lg py-6 font-bold"
        onClick={handleNavigateToDashboard}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default LoginSuccess;

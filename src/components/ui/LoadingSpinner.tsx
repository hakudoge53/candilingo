
import React from 'react';
import { Button } from "@/components/ui/button";

interface LoadingSpinnerProps {
  message?: string;
  errorOccurred?: boolean;
  onRetry?: () => void;
}

const LoadingSpinner = ({ 
  message = "Loading...", 
  errorOccurred = false,
  onRetry
}: LoadingSpinnerProps) => {
  return (
    <div className="text-center py-8">
      {!errorOccurred ? (
        <div className="w-12 h-12 border-4 border-candilingo-purple border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      ) : (
        <div className="w-12 h-12 text-red-500 mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      )}
      <p className={`${errorOccurred ? 'text-red-600 font-medium' : 'text-gray-600'}`}>{message}</p>
      
      {errorOccurred && onRetry && (
        <Button 
          onClick={onRetry} 
          className="mt-4 bg-candilingo-purple hover:bg-candilingo-lightpurple"
        >
          Refresh Page
        </Button>
      )}
      
      {!errorOccurred && (
        <p className="text-sm text-gray-500 mt-2">This should only take a moment...</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

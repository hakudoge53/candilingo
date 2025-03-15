
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 border-4 border-candilingo-purple border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-600">{message}</p>
      <p className="text-sm text-gray-500 mt-2">This should only take a moment...</p>
    </div>
  );
};

export default LoadingSpinner;

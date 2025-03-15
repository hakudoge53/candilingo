
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left' | 'right';
}

const LoadingSpinner = ({ 
  message = "Loading...", 
  size = 'md',
  align = 'center'
}: LoadingSpinnerProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      case 'md':
      default:
        return 'w-12 h-12';
    }
  };
  
  const getAlignClasses = () => {
    switch (align) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      case 'center':
      default:
        return 'items-center text-center';
    }
  };
  
  return (
    <div className={`flex flex-col ${getAlignClasses()} py-8`}>
      <Loader2 className={`${getSizeClasses()} animate-spin text-candilingo-purple mx-auto mb-3`} />
      <p className="text-gray-600">{message}</p>
      <p className="text-sm text-gray-500 mt-2">This should only take a moment...</p>
    </div>
  );
};

export default LoadingSpinner;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error?: Error | null;
  message?: string;
  showHomeButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  error, 
  message = 'Something went wrong', 
  showHomeButton = true 
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-candilingo-purple/20 animate-fade-in">
        <div className="w-16 h-16 bg-candilingo-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-candilingo-purple" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-candilingo-darkpurple text-center">{message}</h1>
        
        {error && (
          <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-100">
            <p className="text-sm text-gray-700">
              {error.message || 'An unexpected error occurred'}
            </p>
          </div>
        )}
        
        <p className="text-gray-500 mb-8 text-center">
          We're sorry for the inconvenience. Please try again or go back to the previous page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="purple" 
            className="flex items-center gap-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          {showHomeButton && (
            <Button 
              variant="outline-purple" 
              className="flex items-center gap-2" 
              asChild
            >
              <a href="/">
                <Home className="w-4 h-4" />
                Return to Home
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

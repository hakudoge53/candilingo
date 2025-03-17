
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// This is a wrapper component to allow using hooks with the class component
const ErrorBoundaryWithNavigate: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return <ErrorBoundaryClass children={children} />;
};

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console or an error reporting service
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorDisplay error={this.state.error} reset={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

// Separate component for the error display with access to hooks
const ErrorDisplay: React.FC<{ error: Error | null; reset: () => void }> = ({ error, reset }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    reset();
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-candilingo-purple/20">
        <div className="w-16 h-16 bg-candilingo-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-candilingo-purple" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-candilingo-darkpurple text-center">Something went wrong</h1>
        
        <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-100">
          <p className="text-sm text-gray-700">
            {error?.message || 'An unexpected error occurred'}
          </p>
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          We're sorry for the inconvenience. Please try again or go back to the previous page.
        </p>
        
        <div className="flex justify-center">
          <Button 
            variant="purple" 
            className="flex items-center gap-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryWithNavigate;

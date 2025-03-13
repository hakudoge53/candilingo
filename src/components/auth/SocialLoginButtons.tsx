
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SocialLoginButtonsProps {
  className?: string;
}

const SocialLoginButtons = ({ className = '' }: SocialLoginButtonsProps) => {
  const { signInWithGoogle, signInWithLinkedIn } = useAuth();

  return (
    <div className={`space-y-3 ${className}`}>
      <Button 
        type="button" 
        variant="outline" 
        className="w-full flex items-center justify-center space-x-2" 
        onClick={signInWithGoogle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-5 h-5"
        >
          <path
            fill="#4285F4"
            d="M21.35 11.1h-9.17V13.83h5.54c-.25 1.99-1.91 3.03-3.99 3.03-2.42 0-4.47-1.89-4.47-4.36 0-2.47 2.05-4.36 4.47-4.36 1.16 0 2.2.4 3.02 1.09l1.74-1.69c-1.28-1.18-2.98-1.91-4.76-1.91C9.85 5.63 6.5 8.92 6.5 12.84c0 3.92 3.35 7.21 7.49 7.21 3.76 0 6.58-2.61 6.58-6.43 0-.83-.07-1.57-.22-2.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full flex items-center justify-center space-x-2"
        onClick={signInWithLinkedIn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-5 h-5"
        >
          <path
            fill="#0077B5"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
          />
        </svg>
        <span>Continue with LinkedIn</span>
      </Button>
    </div>
  );
};

export default SocialLoginButtons;

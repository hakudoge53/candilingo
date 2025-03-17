
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthHeaderProps {
  title: string;
  description: string;
  showSocialLogin?: boolean;
  onGoogleLogin?: () => void;
  onLinkedInLogin?: () => void;
}

const AuthHeader = ({
  title,
  description,
  showSocialLogin = false,
  onGoogleLogin,
  onLinkedInLogin
}: AuthHeaderProps) => {
  return (
    <CardHeader>
      <div className="mb-4 flex justify-center">
        <img src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" alt="Candilingo" className="h-24 w-auto" />
      </div>
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center mb-4">{description}</CardDescription>
      
      {showSocialLogin && (
        <div className="space-y-3 mt-2">
          <button
            onClick={onGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          
          <button
            onClick={onLinkedInLogin}
            className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-2 px-4 rounded-md hover:bg-[#0A66C2]/90 transition-colors"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM8.5 18.5H6V10H8.5V18.5ZM7.25 8.5C6.435 8.5 5.75 7.815 5.75 7C5.75 6.185 6.435 5.5 7.25 5.5C8.065 5.5 8.75 6.185 8.75 7C8.75 7.815 8.065 8.5 7.25 8.5ZM18.5 18.5H16V14.35C16 12.67 15 13 15 13C14 13 14 14.27 14 14.35V18.5H11.5V10H14V11C14.52 10.2 16 10 16 10C17.5 10 18.5 11.22 18.5 13.17V18.5Z" />
            </svg>
            Continue with LinkedIn
          </button>
          
          <div className="relative flex items-center justify-center mt-4 mb-2">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <div className="bg-white px-4 relative z-10 text-sm text-gray-500">or</div>
          </div>
        </div>
      )}
    </CardHeader>
  );
};

export default AuthHeader;

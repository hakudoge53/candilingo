
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <CardHeader>
      <div className="mb-4 flex justify-center">
        <img 
          src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
          alt="Candilingo" 
          className="h-8 w-auto" 
        />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;

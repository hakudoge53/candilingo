
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex justify-center mb-4">
        <img 
          src="/public/lovable-uploads/cbe6d14b-3d9f-4814-af61-b96347790cb1.png" 
          alt="Candilingo" 
          className="h-8"
        />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;

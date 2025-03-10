
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  setIsLoading: (loading: boolean) => void;
}

const AuthContainer = ({ setIsLoading }: AuthContainerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to TechLex</CardTitle>
        <CardDescription>
          Login or create an account to access exclusive features and resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <LoginForm setIsLoading={setIsLoading} />
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <RegisterForm setIsLoading={setIsLoading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthContainer;

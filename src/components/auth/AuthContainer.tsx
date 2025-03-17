
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthHeader from './AuthHeader';
import AuthTabs from './AuthTabs';
import { TabsContent } from "@/components/ui/tabs";

interface AuthContainerProps {
  setIsLoading: (loading: boolean) => void;
}

const AuthContainer = ({ setIsLoading }: AuthContainerProps) => {
  return (
    <Card>
      <AuthHeader 
        title="Welcome!" 
        description="Sign in using your email and password or social account."
      />
      <CardContent>
        <AuthTabs defaultTab="login">
          <TabsContent value="login">
            <LoginForm setIsLoading={setIsLoading} />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm setIsLoading={setIsLoading} />
          </TabsContent>
        </AuthTabs>
      </CardContent>
    </Card>
  );
};

export default AuthContainer;

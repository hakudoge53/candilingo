
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthTabsProps {
  children: React.ReactNode;
  defaultTab: string;
}

const AuthTabs = ({ children, defaultTab }: AuthTabsProps) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default AuthTabs;

import React, { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LoginFormFields, { LoginFormValues } from './LoginFormFields';
import ResetPasswordForm from './ResetPasswordForm';
import LoginSuccess from './LoginSuccess';
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ setIsLoading }: LoginFormProps) => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { activeUser, missingInformation, createDefaultOrganization } = useAuth();
  const [showOrganizationPrompt, setShowOrganizationPrompt] = useState(false);
  const [orgName, setOrgName] = useState("My Organization");

  const onLoginSubmit = useCallback(async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (missingInformation && missingInformation.includes('organization')) {
        setShowOrganizationPrompt(true);
        return;
      }
      
      setLoginSuccess(true);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, missingInformation]);

  const handleCreateOrganization = async () => {
    setIsLoading(true);
    const result = await createDefaultOrganization(orgName);
    setIsLoading(false);
    
    if (result) {
      setShowOrganizationPrompt(false);
      setLoginSuccess(true);
      toast.success("Organization created and login successful!");
    }
  };

  const handleTestLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "test@candilingo.com",
        password: "password123",
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (missingInformation && missingInformation.includes('organization')) {
        setShowOrganizationPrompt(true);
        return;
      }
      
      setLoginSuccess(true);
      toast.success("Logged in with test account!");
    } catch (error) {
      console.error("Test login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, missingInformation]);

  const onResetSubmit = useCallback(async (values: { email: string }) => {
    try {
      setIsLoading(true);
      
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      const redirectUrl = `${baseUrl}/customer-portal`;
      
      console.log("Password reset redirect URL:", redirectUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setResetEmailSent(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const navigateToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleResetModeToggle = () => {
    setIsResetMode(true);
  };

  const handleBackToLogin = () => {
    setIsResetMode(false);
    setResetEmailSent(false);
  };

  if (showOrganizationPrompt) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create Your Organization</h3>
        <p className="text-sm text-gray-500">
          You need to create an organization to continue. This will be your workspace in Candilingo.
        </p>
        <div className="space-y-2">
          <label htmlFor="orgName" className="text-sm font-medium">
            Organization Name
          </label>
          <input
            id="orgName"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter organization name"
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleCreateOrganization} variant="purple">
            Create Organization
          </Button>
          <Button 
            onClick={() => {
              setShowOrganizationPrompt(false);
              setIsLoading(false);
            }} 
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (loginSuccess) {
    return <LoginSuccess navigateToDashboard={navigateToDashboard} />;
  }

  if (isResetMode) {
    return (
      <ResetPasswordForm 
        onResetSubmit={onResetSubmit} 
        onBack={handleBackToLogin} 
        resetEmailSent={resetEmailSent} 
      />
    );
  }

  return (
    <LoginFormFields 
      onLoginSubmit={onLoginSubmit} 
      onForgotPassword={handleResetModeToggle} 
      handleTestLogin={handleTestLogin} 
    />
  );
};

export default LoginForm;

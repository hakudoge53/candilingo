
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoginFormValues } from './LoginFormFields';
import { useAuth } from "@/hooks/useAuth";

export const useAuthHandlers = (
  setIsLoading: (loading: boolean) => void,
  setLoginSuccess: (success: boolean) => void,
  setShowOrganizationPrompt: (show: boolean) => void,
  setResetEmailSent: (sent: boolean) => void
) => {
  const { missingInformation, createDefaultOrganization, activeUser } = useAuth();
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
        setIsLoading(false);
        return;
      }
      
      const { data: orgData, error: orgError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', data.user.id)
        .limit(1);
      
      const hasOrganization = orgData && orgData.length > 0;
      
      if (!hasOrganization) {
        setShowOrganizationPrompt(true);
        toast.info("Please create an organization to continue");
        setIsLoading(false);
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
  }, [setIsLoading, setShowOrganizationPrompt, setLoginSuccess]);

  const handleCreateOrganization = async () => {
    if (!orgName.trim()) {
      toast.error("Organization name cannot be empty");
      return;
    }
    
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
        setIsLoading(false);
        return;
      }
      
      const { data: orgData, error: orgError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', data.user.id)
        .limit(1);
      
      const hasOrganization = orgData && orgData.length > 0;
      
      if (!hasOrganization) {
        setShowOrganizationPrompt(true);
        toast.info("Please create an organization to continue");
        setIsLoading(false);
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
  }, [setIsLoading, setShowOrganizationPrompt, setLoginSuccess]);

  const handleSocialLogin = useCallback(async (provider: 'google' | 'linkedin_oidc') => {
    try {
      setIsLoading(true);
      
      // Always use the current origin for the redirect URL
      const redirectUrl = `${window.location.origin}/customer-portal`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl
        }
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // OAuth will redirect to the authentication provider
      // User will be logged in automatically when redirected back
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`An error occurred during ${provider} login. Please try again.`);
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const handleGoogleLogin = useCallback(() => {
    return handleSocialLogin('google');
  }, [handleSocialLogin]);

  const handleLinkedInLogin = useCallback(() => {
    return handleSocialLogin('linkedin_oidc');
  }, [handleSocialLogin]);

  const onResetSubmit = useCallback(async (values: { email: string }) => {
    try {
      setIsLoading(true);
      
      // Always use the current origin for the redirect URL
      const redirectUrl = `${window.location.origin}/customer-portal`;
      
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
  }, [setIsLoading, setResetEmailSent]);

  return {
    orgName,
    setOrgName,
    onLoginSubmit,
    handleCreateOrganization,
    handleTestLogin,
    handleGoogleLogin,
    handleLinkedInLogin,
    onResetSubmit
  };
};


import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import LoginFormFields from './LoginFormFields';
import ResetPasswordForm from './ResetPasswordForm';
import LoginSuccess from './LoginSuccess';
import OrganizationPrompt from './OrganizationPrompt';
import { useAuthHandlers } from './useAuthHandlers';

interface LoginFormProps {
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ setIsLoading }: LoginFormProps) => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showOrganizationPrompt, setShowOrganizationPrompt] = useState(false);
  
  const {
    orgName,
    setOrgName,
    onLoginSubmit,
    handleCreateOrganization,
    handleTestLogin,
    handleGoogleLogin,
    handleLinkedInLogin,
    onResetSubmit
  } = useAuthHandlers(
    setIsLoading,
    setLoginSuccess, 
    setShowOrganizationPrompt,
    setResetEmailSent
  );

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

  const handleCancelOrgPrompt = () => {
    setShowOrganizationPrompt(false);
    setIsLoading(false);
  };

  // Render based on current state
  if (showOrganizationPrompt) {
    return (
      <OrganizationPrompt
        orgName={orgName}
        setOrgName={setOrgName}
        handleCreateOrganization={handleCreateOrganization}
        onCancel={handleCancelOrgPrompt}
      />
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
      handleGoogleLogin={handleGoogleLogin}
      handleLinkedInLogin={handleLinkedInLogin}
    />
  );
};

export default LoginForm;


import React from 'react';
import LoginFormFields from './LoginFormFields';
import LoginSuccess from './LoginSuccess';
import ResetPasswordForm from './ResetPasswordForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthHandlers } from './useAuthHandlers';
import AuthHeader from './AuthHeader';
import { LoginFormValues } from '@/hooks/auth/types';

// Define schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Use the imported LoginFormValues type instead of redefining it
export type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ setIsLoading }: LoginFormProps) => {
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [showResetForm, setShowResetForm] = React.useState(false);
  const [resetEmailSent, setResetEmailSent] = React.useState(false);
  const formMethods = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit' // This ensures values are validated on submit
  });

  const { 
    onLoginSubmit, 
    handleTestLogin, 
    handleGoogleLogin, 
    handleLinkedInLogin, 
    onResetSubmit 
  } = useAuthHandlers(
    setIsLoading, 
    setLoginSuccess, 
    setResetEmailSent
  );

  // Handle form submission
  const onSubmit = async (values: LoginValues) => {
    // Now values is guaranteed to have email and password as non-optional
    await onLoginSubmit(values);
  };

  // If user is already logged in
  if (loginSuccess) {
    return <LoginSuccess navigateToDashboard={() => window.location.href = '/customer-portal'} />;
  }

  // If user wants to reset password
  if (showResetForm) {
    return (
      <ResetPasswordForm
        onSubmit={onResetSubmit}
        onBack={() => setShowResetForm(false)}
        resetEmailSent={resetEmailSent}
      />
    );
  }

  // Main login form
  return (
    <div>
      <AuthHeader 
        title="Login to Your Account" 
        description="Welcome back! Sign in using your email and password or social account." 
        showSocialLogin={true}
        onGoogleLogin={handleGoogleLogin}
        onLinkedInLogin={handleLinkedInLogin}
      />
      <LoginFormFields
        formMethods={formMethods}
        onSubmit={onSubmit}
        onClickForgotPassword={() => setShowResetForm(true)}
        onTestLogin={handleTestLogin}
      />
    </div>
  );
};

export default LoginForm;

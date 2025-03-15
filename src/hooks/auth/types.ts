
export interface User {
  id: string;
  email: string;
  name: string;
  membership_tier: string;
  preferred_language: string;
  extension_settings: Record<string, any>;
  avatar_url?: string | null;
  status?: string;
}

export interface AuthSession {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeUser: User | null;
  missingInformation: string[];
  session?: any; // Add this to fix the type error
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ResetPasswordFormValues {
  email: string;
}

export interface AuthActions {
  handleLogin: (values: LoginFormValues) => Promise<void>;
  handleRegistration: (values: any) => Promise<void>;
  handleForgotPassword: (values: ResetPasswordFormValues) => Promise<void>;
  handleResetPassword: (values: { password: string }) => Promise<void>;
  handleLogout: () => Promise<void>;
}

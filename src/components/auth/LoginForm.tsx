
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeftIcon, CheckIcon, MailIcon } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Password reset schema
const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

interface LoginFormProps {
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ setIsLoading }: LoginFormProps) => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Reset password form
  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = async (values: LoginFormValues) => {
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
      
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // You can also sign in with the test credentials
  const handleTestLogin = async () => {
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
      
      toast.success("Logged in with test account!");
    } catch (error) {
      console.error("Test login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset submission
  const onResetSubmit = async (values: ResetFormValues) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/CustomerPortal`,
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
  };

  // Reset password form component
  const renderResetPasswordForm = () => {
    if (resetEmailSent) {
      return (
        <div className="text-center space-y-4 py-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium">Check your email</h3>
          <p className="text-sm text-gray-500">
            We've sent password reset instructions to your email address.
          </p>
          <Button 
            type="button" 
            variant="outline-purple" 
            className="mt-4"
            onClick={() => {
              setIsResetMode(false);
              setResetEmailSent(false);
            }}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to login
          </Button>
        </div>
      );
    }
    
    return (
      <Form {...resetForm}>
        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium">Reset your password</h3>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>
          
          <FormField
            control={resetForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" variant="purple" className="w-full">
            Send Reset Instructions
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => setIsResetMode(false)}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to login
          </Button>
        </form>
      </Form>
    );
  };

  // Main login form component
  const renderLoginForm = () => (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={() => setIsResetMode(true)}
            className="text-sm text-candilingo-purple hover:text-candilingo-lightpurple"
          >
            Forgot password?
          </button>
        </div>
        
        <Button type="submit" variant="purple" className="w-full">
          Sign In
        </Button>
        
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        <Button type="button" variant="outline-purple" className="w-full" onClick={handleTestLogin}>
          Use Test Account
        </Button>
      </form>
    </Form>
  );

  return (
    <div>
      {isResetMode ? renderResetPasswordForm() : renderLoginForm()}
    </div>
  );
};

export default LoginForm;

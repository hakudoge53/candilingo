
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormFieldsProps {
  onLoginSubmit: (values: LoginFormValues) => Promise<void>;
  onForgotPassword: () => void;
  handleTestLogin: () => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  handleLinkedInLogin: () => Promise<void>;
}

const LoginFormFields = ({ 
  onLoginSubmit, 
  onForgotPassword, 
  handleTestLogin,
  handleGoogleLogin,
  handleLinkedInLogin
}: LoginFormFieldsProps) => {
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
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
            onClick={onForgotPassword}
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
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center space-x-2"
          >
            <FcGoogle className="h-5 w-5" />
            <span>Google</span>
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleLinkedInLogin}
            className="flex items-center justify-center space-x-2 text-[#0077b5]"
          >
            <FaLinkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </Button>
        </div>
        
        <Button type="button" variant="outline-purple" className="w-full" onClick={handleTestLogin}>
          Use Test Account
        </Button>
      </form>
    </Form>
  );
};

export default LoginFormFields;

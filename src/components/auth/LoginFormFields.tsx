
import React from 'react';
import { z } from "zod";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginValues } from './LoginForm';

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginValues>;
  handleSubmit: any;
  errors: FieldErrors<LoginValues>;
  onSubmit: (values: LoginValues) => Promise<void>;
  onClickForgotPassword: () => void;
  onTestLogin: () => Promise<void>;
}

const LoginFormFields = ({ 
  register, 
  handleSubmit, 
  errors, 
  onSubmit, 
  onClickForgotPassword, 
  onTestLogin 
}: LoginFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input 
              id="email"
              type="email" 
              placeholder="you@example.com" 
              {...register("email")} 
            />
          </FormControl>
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormControl>
            <Input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              {...register("password")} 
            />
          </FormControl>
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClickForgotPassword}
            className="text-xs text-candilingo-purple hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <Button type="submit" className="w-full bg-candilingo-purple">
          Login
        </Button>
      </form>
      
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      <div className="space-y-3">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={() => {}} // This will be handled by the parent component
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={() => {}} // This will be handled by the parent component
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            />
          </svg>
          Continue with LinkedIn
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full text-gray-700" 
          onClick={onTestLogin}
        >
          Quick Login (Test Account)
        </Button>
      </div>
    </div>
  );
};

export default LoginFormFields;


import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginValues } from './LoginForm';

interface LoginFormFieldsProps {
  formMethods: UseFormReturn<LoginValues>;
  onSubmit: (values: LoginValues) => Promise<void>;
  onClickForgotPassword: () => void;
  onTestLogin: () => Promise<void>;
}

const LoginFormFields = ({ 
  formMethods, 
  onSubmit, 
  onClickForgotPassword, 
  onTestLogin 
}: LoginFormFieldsProps) => {
  const { register, handleSubmit, formState: { errors } } = formMethods;
  
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default LoginFormFields;

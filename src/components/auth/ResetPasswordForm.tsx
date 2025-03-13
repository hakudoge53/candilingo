
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";

// Password reset schema
const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
  onResetSubmit: (values: ResetFormValues) => Promise<void>;
  onBack: () => void;
  resetEmailSent: boolean;
}

const ResetPasswordForm = ({ onResetSubmit, onBack, resetEmailSent }: ResetPasswordFormProps) => {
  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

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
          onClick={onBack}
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
          onClick={onBack}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to login
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;

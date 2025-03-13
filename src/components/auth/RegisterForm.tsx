
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIcon } from "lucide-react";

// Basic registration form schema
const basicInfoSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Additional info schema
const additionalInfoSchema = z.object({
  role: z.string().min(1, { message: "Please select your role" }),
  industry: z.string().min(1, { message: "Please select your industry" }),
  referralSource: z.string().min(1, { message: "Please tell us how you heard about us" }),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

interface RegisterFormProps {
  setIsLoading: (loading: boolean) => void;
}

const RegisterForm = ({ setIsLoading }: RegisterFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormValues | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);

  // Basic info form
  const basicInfoForm = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Additional info form
  const additionalInfoForm = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      role: "",
      industry: "",
      referralSource: "",
    },
  });

  // Handle basic info submission (step 1)
  const onBasicInfoSubmit = (values: BasicInfoFormValues) => {
    setBasicInfo(values);
    setCurrentStep(2);
  };

  // Navigate to customer portal
  const navigateToCustomerPortal = () => {
    window.location.href = '/customer-portal';
  };

  // Handle additional info submission and complete registration (step 2)
  const onAdditionalInfoSubmit = async (values: AdditionalInfoFormValues) => {
    if (!basicInfo) return;
    
    try {
      setIsLoading(true);
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: basicInfo.email,
        password: basicInfo.password,
        options: {
          data: {
            name: basicInfo.name,
            role: values.role,
            industry: values.industry,
            referral_source: values.referralSource,
          },
        },
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      // Check if email confirmation is required
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast.info("This email is already registered. Please sign in instead.");
        return;
      }
      
      toast.success("Registration successful! Logging you in...");
      setRegistrationComplete(true);
      
      // Sign in immediately after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: basicInfo.email,
        password: basicInfo.password,
      });
      
      if (signInError) {
        toast.error("Registration complete, but auto-login failed. Please log in manually.");
        return;
      }
      
      // Redirect to customer portal after successful registration
      setTimeout(() => {
        navigateToCustomerPortal();
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render registration success
  if (registrationComplete) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckIcon className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-candilingo-purple">Registration Successful!</h3>
        <p className="text-sm text-gray-500">
          Your account has been created. Redirecting you to the customer portal...
        </p>
        <Button 
          type="button" 
          variant="purple"
          className="mt-4 w-full"
          onClick={navigateToCustomerPortal}
        >
          Go to Customer Portal
        </Button>
      </div>
    );
  }

  // Render step 1 - Basic info
  if (currentStep === 1) {
    return (
      <div>
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Step 1 of 2</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-candilingo-purple h-2 rounded-full w-1/2"></div>
          </div>
        </div>
        
        <Form {...basicInfoForm}>
          <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-4">
            <FormField
              control={basicInfoForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={basicInfoForm.control}
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
              control={basicInfoForm.control}
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
            <FormField
              control={basicInfoForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-techlex-blue">
              Next Step
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  // Render step 2 - Additional info
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Step 2 of 2</p>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-candilingo-purple h-2 rounded-full w-full"></div>
        </div>
      </div>
      
      <Form {...additionalInfoForm}>
        <form onSubmit={additionalInfoForm.handleSubmit(onAdditionalInfoSubmit)} className="space-y-4">
          <FormField
            control={additionalInfoForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hr_manager">HR Manager</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="engineering_manager">Engineering Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={additionalInfoForm.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={additionalInfoForm.control}
            name="referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you hear about Candilingo?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a source" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="friend">Friend/Colleague</SelectItem>
                    <SelectItem value="event">Event/Conference</SelectItem>
                    <SelectItem value="ad">Advertisement</SelectItem>
                    <SelectItem value="article">Article/Blog</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button type="submit" className="flex-1 bg-techlex-blue">
              Complete Registration
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

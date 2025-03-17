
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BasicInfoFormValues } from '@/components/auth/BasicInfoForm';
import { AdditionalInfoFormValues } from '@/components/auth/AdditionalInfoForm';

export function useBusinessOwnerRegistration(
  setIsLoading: (loading: boolean) => void,
  setEmailConfirmationRequired: (required: boolean) => void,
  setRegistrationComplete: (complete: boolean) => void
) {
  // Complete registration for business owners
  const handleCompleteBusinessOwnerRegistration = async (
    basicInfo: BasicInfoFormValues,
    additionalInfo: AdditionalInfoFormValues
  ) => {
    if (!basicInfo || !additionalInfo) return;
    
    try {
      setIsLoading(true);
      
      // Always use the current domain for the redirect
      const redirectUrl = window.location.origin + '/customer-portal';
      
      console.log("Using redirect URL:", redirectUrl);
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: basicInfo.email,
        password: basicInfo.password,
        options: {
          data: {
            name: basicInfo.name,
            role: additionalInfo.role,
            industry: additionalInfo.industry,
            referral_source: additionalInfo.referralSource,
            company_name: additionalInfo.companyName,
            company_size: additionalInfo.companySize,
            user_type: 'business_owner' // Add user type for business owners
          },
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // Check if email confirmation is required
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast.info("This email is already registered. Please sign in instead.");
        setIsLoading(false);
        return;
      }
      
      // Check if email confirmation is pending
      if (data.user && !data.session) {
        console.log("Email confirmation required");
        setEmailConfirmationRequired(true);
        setRegistrationComplete(true);
        setIsLoading(false);
        toast.info("Registration successful! Please check your email to confirm your account.");
        return;
      }
      
      // Registration successful
      setRegistrationComplete(true);
      toast.success("Registration successful! Logging you in...");
      
      // Redirect to customer portal after successful registration
      setTimeout(() => {
        window.location.href = '/customer-portal';
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCompleteBusinessOwnerRegistration };
}

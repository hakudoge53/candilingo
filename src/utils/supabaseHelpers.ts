
import { supabase } from "@/integrations/supabase/client";

/**
 * Utility function to check if a storage bucket exists and create it if not
 * @param bucketName Name of the bucket to check/create
 * @param options Options for bucket creation
 * @returns Promise resolving to true if bucket exists or was created, false otherwise
 */
export const ensureStorageBucket = async (
  bucketName: string,
  options: {
    public?: boolean;
    fileSizeLimit?: number;
  } = { public: true, fileSizeLimit: 5242880 }
): Promise<boolean> => {
  try {
    // Check if bucket exists
    const { data, error } = await supabase.storage.getBucket(bucketName);
    
    if (error && error.message.includes('The resource was not found')) {
      // Create bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket(bucketName, options);
      
      if (createError) {
        console.error(`Error creating bucket ${bucketName}:`, createError);
        return false;
      }
      
      // Set a public policy if needed
      if (options.public) {
        try {
          await supabase.storage.from(bucketName).createSignedUrl('dummy-policy-check', 1);
        } catch (policyError) {
          console.error(`Error setting bucket policy for ${bucketName}:`, policyError);
        }
      }
      
      return true;
    }
    
    return true;
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName}:`, error);
    return false;
  }
};

/**
 * Utility function to handle common RLS policy errors
 * @param error The error object from Supabase
 * @returns A user-friendly error message
 */
export const handleRlsError = (error: any): string => {
  if (!error) return "Unknown error";
  
  const errorMessage = error.message || error.toString();
  
  if (errorMessage.includes('violates row-level security policy')) {
    return "You don't have permission to perform this action. This might be due to missing permissions or not being signed in.";
  }
  
  if (errorMessage.includes('infinite recursion detected in policy')) {
    return "There's an issue with the database security configuration. Please contact support.";
  }
  
  return errorMessage;
};

/**
 * Helper to safely cast roles for Supabase compatibility
 * @param role User role value
 * @returns Role cast for Supabase compatibility
 */
export const castRole = (role: any): any => {
  return role as any;
};


import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    console.log(`Checking if bucket ${bucketName} exists`);
    
    // Check if bucket exists
    const { data, error } = await supabase.storage.getBucket(bucketName);
    
    if (error && error.message.includes('The resource was not found')) {
      console.log(`Bucket ${bucketName} not found, creating it`);
      
      // Create bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: options.public === undefined ? true : options.public,
        fileSizeLimit: options.fileSizeLimit
      });
      
      if (createError) {
        console.error(`Error creating bucket ${bucketName}:`, createError);
        toast.error(`Failed to create storage bucket: ${createError.message}`);
        return false;
      }
      
      console.log(`Successfully created bucket ${bucketName}`);
      
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
    
    console.log(`Bucket ${bucketName} already exists`);
    return true;
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName}:`, error);
    toast.error(`Storage error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

/**
 * Utility function to ensure a database column exists
 * @param tableName The table to check
 * @param columnName The column to check/add
 * @param columnType SQL type for the column
 * @param columnDefault Default value for the column
 * @returns Promise that resolves when the operation is complete
 */
export const ensureColumnExists = async (
  tableName: string,
  columnName: string,
  columnType: string,
  columnDefault: string
): Promise<boolean> => {
  try {
    console.log(`Checking if column ${columnName} exists in table ${tableName}`);
    
    // First check if the column exists
    const { data: columnExists, error: checkError } = await supabase.rpc(
      'check_column_exists',
      { table_name: tableName, column_name: columnName }
    );
    
    if (checkError) {
      console.error(`Error checking if column ${columnName} exists in ${tableName}:`, checkError);
      return false;
    }
    
    // If the column doesn't exist, add it - using updated parameter names
    if (!columnExists) {
      console.log(`Adding column ${columnName} to table ${tableName}`);
      
      const { error: addError } = await supabase.rpc(
        'add_column_to_table',
        { 
          p_table_name: tableName, 
          p_column_name: columnName,
          p_column_type: columnType,
          p_column_default: columnDefault
        }
      );
      
      if (addError) {
        console.error(`Error adding column ${columnName} to ${tableName}:`, addError);
        toast.error(`Database error: ${addError.message}`);
        return false;
      }
      
      console.log(`Successfully added column ${columnName} to ${tableName}`);
    } else {
      console.log(`Column ${columnName} already exists in table ${tableName}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error ensuring column ${columnName} exists in ${tableName}:`, error);
    toast.error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Update a user's active organization
 * @param userId User ID
 * @param organizationId Organization ID to set as active
 * @returns Promise resolving to true if successful, false otherwise
 */
export const setActiveOrganization = async (
  userId: string,
  organizationId: string | null
): Promise<boolean> => {
  try {
    console.log(`Setting active organization for user ${userId} to ${organizationId || 'null'}`);
    
    // Check if user_settings record exists
    const { data: existingSettings, error: checkError } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking user settings:", checkError);
      toast.error(`Failed to update organization: ${checkError.message}`);
      return false;
    }
    
    if (existingSettings) {
      // Update existing settings
      const { error: updateError } = await supabase
        .from('user_settings')
        .update({ active_organization_id: organizationId })
        .eq('user_id', userId);
      
      if (updateError) {
        console.error("Error updating active organization:", updateError);
        toast.error(`Failed to update organization: ${updateError.message}`);
        return false;
      }
    } else {
      // Create new settings
      const { error: insertError } = await supabase
        .from('user_settings')
        .insert({ 
          user_id: userId, 
          active_organization_id: organizationId,
          highlight_enabled: true,
          highlight_color: '#9b87f5'
        });
      
      if (insertError) {
        console.error("Error creating user settings:", insertError);
        toast.error(`Failed to save organization setting: ${insertError.message}`);
        return false;
      }
    }
    
    console.log("Successfully updated active organization");
    return true;
  } catch (error) {
    console.error("Error setting active organization:", error);
    toast.error(`Organization error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Get a user's active organization
 * @param userId User ID
 * @returns Promise resolving to the active organization ID or null
 */
export const getActiveOrganization = async (userId: string): Promise<string | null> => {
  try {
    console.log(`Getting active organization for user ${userId}`);
    
    const { data, error } = await supabase
      .from('user_settings')
      .select('active_organization_id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching active organization:", error);
      return null;
    }
    
    return data?.active_organization_id || null;
  } catch (error) {
    console.error("Error getting active organization:", error);
    return null;
  }
};

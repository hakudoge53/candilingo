
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from "sonner";

const SUPABASE_URL = "https://dqkemwzltxfsvuykzmfm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxa2Vtd3psdHhmc3Z1eWt6bWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNzA0MTcsImV4cCI6MjA1Njg0NjQxN30.ViDFtFHuuSs-uA8bmoSICvsnZ1iuFVo8X72kC9m5Nng";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Add a function to check and alter the user_settings table structure
export const ensureUserSettingsTableStructure = async () => {
  try {
    console.log("Checking user_settings table structure");
    
    // Check if the user_settings table has the active_organization_id column
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .limit(1);

    if (error) {
      console.error("Error checking user_settings table:", error);
      return;
    }

    // Check if active_organization_id exists in the first row
    const hasColumn = data && data.length > 0 && 'active_organization_id' in data[0];
    
    if (!hasColumn) {
      console.log("Adding active_organization_id column to user_settings table");
      
      // Use updated parameter names for the RPC call
      const { error: alterError } = await supabase.rpc(
        'add_column_to_table',
        { 
          p_table_name: 'user_settings', 
          p_column_name: 'active_organization_id', 
          p_column_type: 'uuid', 
          p_column_default: 'null' 
        }
      );

      if (alterError) {
        console.error("Error adding active_organization_id column:", alterError);
      } else {
        console.log("Successfully added active_organization_id column to user_settings table");
      }
    } else {
      console.log("active_organization_id column already exists in user_settings table");
    }
  } catch (error) {
    console.error("Error ensuring user_settings table structure:", error);
  }
};

// Initialize app - call this once when the app starts
export const initializeApp = async () => {
  try {
    console.log("Initializing application...");
    
    // Ensure user_settings table has all required columns
    await ensureUserSettingsTableStructure();
    
    console.log("Application initialization complete");
    return true;
  } catch (error) {
    console.error("Error initializing application:", error);
    toast.error("There was a problem initializing the application. Some features may not work correctly.");
    return false;
  }
};

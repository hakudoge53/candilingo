
import React from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';

interface SecuritySettingsProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user, setLocalLoading }) => {
  const securityForm = useForm<SecurityFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const handleChangePassword = async (values: SecurityFormValues) => {
    try {
      setLocalLoading(true);
      
      if (values.newPassword !== values.confirmNewPassword) {
        toast.error("New passwords don't match");
        return;
      }
      
      const { error } = await supabase.auth.updateUser({ 
        password: values.newPassword 
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully");
      securityForm.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Update your password and security settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...securityForm}>
          <form onSubmit={securityForm.handleSubmit(handleChangePassword)} className="space-y-6">
            <FormField
              control={securityForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={securityForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    At least 8 characters with a mix of letters and numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={securityForm.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;

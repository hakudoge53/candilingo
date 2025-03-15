
import React from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ProfileSettingsProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface ProfileFormValues {
  name: string;
  email: string;
  preferredLanguage: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, setLocalLoading }) => {
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      preferredLanguage: user.preferred_language || 'en'
    }
  });
  
  const handleUpdateProfile = async (values: ProfileFormValues) => {
    try {
      setLocalLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: values.name,
          email: values.email,
          preferred_language: values.preferredLanguage
        })
        .eq('id', user.id)
        .select();
        
      if (error) throw error;
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className="space-y-6">
            <FormField
              control={profileForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled />
                  </FormControl>
                  <FormDescription>
                    Email changes require verification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={profileForm.control}
              name="preferredLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Language</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;


import React, { useState, useRef } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { Upload, UserCog, Palette } from 'lucide-react';

interface ProfileSettingsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface ProfileFormValues {
  name: string;
  email: string;
  themeColor: string;
}

const ProfileSettingsSection: React.FC<ProfileSettingsSectionProps> = ({ user, setLocalLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      themeColor: '#9b87f5' // Default theme color
    }
  });
  
  const handleUpdateProfile = async (values: ProfileFormValues) => {
    try {
      setLocalLoading(true);
      
      // Prepare extension settings
      const extensionSettings = {
        ...(user.extension_settings || {}),
        themeColor: values.themeColor
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: values.name,
          email: values.email,
          extension_settings: extensionSettings
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
  
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${user.id}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true });
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      setAvatarUrl(data.publicUrl);
      
      // Update the user profile with the avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information and customize your portal appearance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback className="text-2xl">
              {user.name
                ? user.name
                    .split(' ')
                    .map(part => part[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)
                : 'U'}
            </AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <Button 
            variant="outline" 
            onClick={handleAvatarClick}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Change Profile Picture"}
          </Button>
        </div>
        
        {/* Profile Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="themeColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme Color</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input 
                        {...field} 
                        type="color" 
                        className="w-12 h-10 p-1 rounded"
                      />
                    </FormControl>
                    <Input 
                      value={field.value} 
                      onChange={field.onChange} 
                      placeholder="#9b87f5"
                      className="flex-1"
                    />
                  </div>
                  <FormDescription>
                    Customize the color of your customer portal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsSection;

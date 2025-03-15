import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Check, Upload, User as UserIcon } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProfileSettingsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface ProfileFormValues {
  name: string;
  preferredLanguage: string;
}

const ProfileSettingsSection: React.FC<ProfileSettingsSectionProps> = ({ user, setLocalLoading }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      preferredLanguage: user.preferredLanguage
    }
  });

  const handleProfileUpdate = async (values: ProfileFormValues) => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: values.name,
          preferred_language: values.preferredLanguage
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload the image to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to retrieve public URL');
      }

      setImageUrl(urlData.publicUrl);

      // Update the user's profile with the avatar URL
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      toast.success("Avatar updated successfully");
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="profile">
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={imageUrl || `/avatars/default.png`} alt="Avatar" />
                <AvatarFallback>{user.name ? user.name[0] : '?'}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar-upload">Update Avatar</Label>
                <Input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                {uploading ? (
                  <LoadingSpinner message="Uploading..." />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click to upload a new avatar
                  </p>
                )}
              </div>
            </div>

            <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  {...profileForm.register("name")}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  defaultValue={user.email}
                  readOnly
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Select
                  onValueChange={profileForm.setValue}
                  defaultValue={user.preferredLanguage}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    {/* Add more languages as needed */}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <LoadingSpinner message="Saving..." />
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Update Profile
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileSettingsSection;

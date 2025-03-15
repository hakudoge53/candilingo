
import React, { useState, useEffect } from 'react';
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
  const [imageUrl, setImageUrl] = useState<string | null>(user.avatar_url || null);

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      preferredLanguage: user.preferred_language || 'en'
    }
  });

  // Fetch user's avatar on mount
  useEffect(() => {
    if (user.avatar_url) {
      setImageUrl(user.avatar_url);
    }
  }, [user.avatar_url]);

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
      // Create avatars bucket if it doesn't exist (this happens on first upload)
      const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('avatars');
      
      if (bucketError && bucketError.message.includes('The resource was not found')) {
        // Create the bucket
        await supabase.storage.createBucket('avatars', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 5 // 5MB limit
        });
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the image to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
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
      toast.error("Failed to upload avatar: " + error.message);
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
              <Avatar className="h-20 w-20">
                <AvatarImage src={imageUrl || undefined} alt="Profile" />
                <AvatarFallback>{user.name ? user.name[0].toUpperCase() : '?'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded">
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload Photo"}
                </Label>
                <Input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: Square JPG, PNG, or GIF, at least 300x300 pixels.
                </p>
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
                  value={user.email}
                  readOnly
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Select
                  defaultValue={profileForm.getValues().preferredLanguage}
                  onValueChange={(value) => profileForm.setValue("preferredLanguage", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isSaving} className="w-full">
                {isSaving ? (
                  <>
                    <LoadingSpinner message="Saving..." />
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
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

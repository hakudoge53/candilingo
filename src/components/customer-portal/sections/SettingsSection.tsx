
import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { UserCog, Shield, Bell, Languages } from 'lucide-react';

interface SettingsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface ProfileFormValues {
  name: string;
  email: string;
  preferredLanguage: string;
}

interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ user, setLocalLoading }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [highlightEnabled, setHighlightEnabled] = useState<boolean>(
    user.extension_settings?.highlightEnabled ?? true
  );
  
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      preferredLanguage: user.preferred_language || 'en'
    }
  });
  
  const securityForm = useForm<SecurityFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
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
  
  const handleToggleHighlight = async () => {
    try {
      setLocalLoading(true);
      const newValue = !highlightEnabled;
      setHighlightEnabled(newValue);
      
      // Update extension settings in the profile
      const extensionSettings = {
        ...(user.extension_settings || {}),
        highlightEnabled: newValue
      };
      
      const { error } = await supabase
        .from('profiles')
        .update({
          extension_settings: extensionSettings
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success(`Term highlighting ${newValue ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error("Error updating highlight setting:", error);
      toast.error("Failed to update setting");
      setHighlightEnabled(!highlightEnabled); // Revert UI if failed
    } finally {
      setLocalLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-6">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <Button 
                  variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={activeTab === 'security' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('security')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button 
                  variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-3/4">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
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
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
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
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Configure how the application behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Extension Settings</h3>
                    <p className="text-sm text-gray-500">Configure dictionary extension behavior</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="highlight-terms">Highlight Terms</Label>
                      <p className="text-sm text-gray-500">
                        Automatically highlight dictionary terms on webpages
                      </p>
                    </div>
                    <Switch
                      id="highlight-terms"
                      checked={highlightEnabled}
                      onCheckedChange={handleToggleHighlight}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Manage email notification preferences</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="product-updates">Product Updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about product updates and new features
                      </p>
                    </div>
                    <Switch id="product-updates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <p className="text-sm text-gray-500">
                        Get notified about security issues and unusual activity
                      </p>
                    </div>
                    <Switch id="security-alerts" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;

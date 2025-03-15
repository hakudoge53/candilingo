
import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface PreferencesSettingsProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({ user, setLocalLoading }) => {
  const [highlightEnabled, setHighlightEnabled] = useState<boolean>(
    user.extension_settings?.highlightEnabled ?? true
  );
  const [productUpdates, setProductUpdates] = useState<boolean>(true);
  const [securityAlerts, setSecurityAlerts] = useState<boolean>(true);
  
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

  const handleSavePreferences = () => {
    // This would typically update email notification preferences in a real application
    toast.success("Preferences saved successfully");
  };

  return (
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
            <Switch 
              id="product-updates" 
              checked={productUpdates}
              onCheckedChange={setProductUpdates}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-gray-500">
                Get notified about security issues and unusual activity
              </p>
            </div>
            <Switch 
              id="security-alerts"
              checked={securityAlerts}
              onCheckedChange={setSecurityAlerts}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default PreferencesSettings;

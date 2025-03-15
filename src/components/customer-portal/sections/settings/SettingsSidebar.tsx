
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserCog, Shield, Bell } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: 'profile' | 'security' | 'preferences';
  setActiveTab: (tab: 'profile' | 'security' | 'preferences') => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
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
            variant={activeTab === 'preferences' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveTab('preferences')}
          >
            <Bell className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsSidebar;


import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import SettingsSidebar from './settings/SettingsSidebar';
import ProfileSettings from './settings/ProfileSettings';
import SecuritySettings from './settings/SecuritySettings';
import PreferencesSettings from './settings/PreferencesSettings';

interface SettingsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ user, setLocalLoading }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  
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
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="lg:w-3/4">
          {activeTab === 'profile' && (
            <ProfileSettings user={user} setLocalLoading={setLocalLoading} />
          )}
          
          {activeTab === 'security' && (
            <SecuritySettings user={user} setLocalLoading={setLocalLoading} />
          )}
          
          {activeTab === 'preferences' && (
            <PreferencesSettings user={user} setLocalLoading={setLocalLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;

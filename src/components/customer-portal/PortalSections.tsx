
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/hooks/auth/types';
import { Button } from '@/components/ui/button';
import { CreditCard, Book, Lock, Settings, Users, Palette } from 'lucide-react';
import TutorialGuide from './TutorialGuide';

// Section components
import BillingSection from './sections/BillingSection';
import PublicDictionariesSection from './sections/PublicDictionariesSection';
import PrivateDictionariesSection from './sections/PrivateDictionariesSection';
import SettingsSection from './sections/SettingsSection';
import OrganizationPermissionsSection from './sections/OrganizationPermissionsSection';
import ProfileSettingsSection from './sections/ProfileSettingsSection';

interface PortalSectionsProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const PortalSections: React.FC<PortalSectionsProps> = ({ user, setLocalLoading }) => {
  return (
    <div className="bg-white rounded-md shadow-sm mt-8">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Customer Portal</h2>
        <TutorialGuide />
      </div>
      
      <Tabs defaultValue="billing" className="w-full">
        <TabsList className="grid grid-cols-6 w-full rounded-t-md">
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="public-dictionaries" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Public Dictionary</span>
          </TabsTrigger>
          <TabsTrigger value="private-dictionaries" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Private Dictionary</span>
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Organization</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="billing" className="p-4">
          <BillingSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="public-dictionaries" className="p-4">
          <PublicDictionariesSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="private-dictionaries" className="p-4">
          <PrivateDictionariesSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="organization" className="p-4">
          <OrganizationPermissionsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="profile" className="p-4">
          <ProfileSettingsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="settings" className="p-4">
          <SettingsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalSections;

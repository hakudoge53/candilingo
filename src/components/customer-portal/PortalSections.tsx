import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/hooks/auth/types';
import { CreditCard, Book, Lock, Settings, Users, Palette, BookOpen } from 'lucide-react';
import TutorialGuide from './TutorialGuide';
import { useLocation } from 'react-router-dom';

// Section components
import BillingSection from './sections/BillingSection';
import PublicDictionariesSection from './sections/PublicDictionariesSection';
import PrivateDictionariesSection from './sections/PrivateDictionariesSection';
import SettingsSection from './sections/SettingsSection';
import OrganizationPermissionsSection from './sections/OrganizationPermissionsSection';
import ProfileSettingsSection from './sections/ProfileSettingsSection';
import TechLingoWikiSection from './sections/TechLingoWikiSection';
import GlossarySection from './sections/GlossarySection';

interface PortalSectionsProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const PortalSections: React.FC<PortalSectionsProps> = ({ user, setLocalLoading }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('billing');
  
  useEffect(() => {
    // Check for URL parameters to set active tab
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      setActiveTab(section);
    }
  }, [location]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-candilingo-purple/15 to-candilingo-teal/15">
        <h2 className="text-2xl font-bold text-candilingo-darkpurple">Customer Portal</h2>
        <TutorialGuide />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-8 w-full rounded-none bg-gray-50 p-2 gap-1">
          <TabsTrigger 
            value="billing" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-candilingo-purple data-[state=active]:to-candilingo-purple/80 data-[state=active]:text-white"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline text-base">Billing</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dictionaries" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-candilingo-teal data-[state=active]:to-candilingo-teal/80 data-[state=active]:text-white"
          >
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline text-base">Dictionaries</span>
          </TabsTrigger>
          <TabsTrigger 
            value="wiki" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-candilingo-teal data-[state=active]:to-candilingo-darkteal data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline text-base">TechLingo Wiki</span>
          </TabsTrigger>
          <TabsTrigger 
            value="private-dictionaries" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-candilingo-coral data-[state=active]:to-candilingo-coral/80 data-[state=active]:text-white"
          >
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline text-base">Private</span>
          </TabsTrigger>
          <TabsTrigger 
            value="organization" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-candilingo-lightpurple data-[state=active]:to-candilingo-purple data-[state=active]:text-white"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline text-base">Organization</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-candilingo-pink data-[state=active]:to-candilingo-coral data-[state=active]:text-white"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline text-base">Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-gray-500 data-[state=active]:text-white"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-base">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="billing" className="p-6 bg-gradient-to-br from-white to-candilingo-purple/10">
          <BillingSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="dictionaries" className="p-6 bg-gradient-to-br from-white to-candilingo-teal/10">
          <PublicDictionariesSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="wiki" className="p-6 bg-gradient-to-br from-white to-candilingo-teal/10">
          <TechLingoWikiSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="private-dictionaries" className="p-6 bg-gradient-to-br from-white to-candilingo-coral/10">
          <PrivateDictionariesSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="organization" className="p-6 bg-gradient-to-br from-white to-candilingo-lightpurple/10">
          <OrganizationPermissionsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="profile" className="p-6 bg-gradient-to-br from-white to-candilingo-pink/10">
          <ProfileSettingsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="settings" className="p-6 bg-gradient-to-br from-white to-gray-200">
          <SettingsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalSections;

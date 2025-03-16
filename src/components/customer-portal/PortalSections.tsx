
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/hooks/auth/types';
import { CreditCard, Book, Lock, Settings, Users, Palette, BookOpen, LayoutDashboard, FileText, BarChart4 } from 'lucide-react';
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
      <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-[#A020F0]/10 to-[#FF69B4]/10">
        <h2 className="text-xl font-bold text-[#6E59A5]">Customer Portal</h2>
        <TutorialGuide />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-8 w-full rounded-none bg-gray-50 p-1 gap-1">
          <TabsTrigger 
            value="billing" 
            className="flex items-center gap-2 data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white rounded-md"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger 
            value="products" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <BarChart4 className="h-4 w-4" />
            <span className="hidden sm:inline">Products</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dictionaries" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Dictionaries</span>
          </TabsTrigger>
          <TabsTrigger 
            value="wiki" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">TechLingo Wiki</span>
          </TabsTrigger>
          <TabsTrigger 
            value="private-dictionaries" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Private</span>
          </TabsTrigger>
          <TabsTrigger 
            value="organization" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Organization</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white rounded-md"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="billing" className="p-6 bg-gradient-to-br from-white to-[#A020F0]/5">
          <BillingSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="products" className="p-6 bg-gradient-to-br from-white to-[#7E69AB]/5">
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-[#7E69AB] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#6E59A5] mb-2">Products Section</h3>
            <p className="text-gray-600">View and manage your purchased products.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="dictionaries" className="p-6 bg-gradient-to-br from-white to-[#7E69AB]/5">
          <PublicDictionariesSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="wiki" className="p-6 bg-gradient-to-br from-white to-[#7E69AB]/5">
          <TechLingoWikiSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="private-dictionaries" className="p-6 bg-gradient-to-br from-white to-[#7E69AB]/5">
          <PrivateDictionariesSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="organization" className="p-6 bg-gradient-to-br from-white to-[#7E69AB]/5">
          <OrganizationPermissionsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="profile" className="p-6 bg-gradient-to-br from-white to-[#7E69AB]/5">
          <ProfileSettingsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
        
        <TabsContent value="settings" className="p-6 bg-gradient-to-br from-white to-gray-100">
          <SettingsSection user={user} setLocalLoading={setLocalLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalSections;

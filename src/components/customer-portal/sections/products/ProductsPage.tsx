
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Globe, 
  Layout, 
  BookOpen,
  Clock
} from "lucide-react";
import GlossaryTable from './GlossaryTable';
import WebExtensionsSection from './WebExtensionsSection';
import RoadmapSection from './RoadmapSection';
import CandlingoNews from './CandlingoNews';
import ProductsSidebar from './ProductsSidebar';

interface ProductsPageProps {
  organizationId?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ organizationId }) => {
  const [activeTab, setActiveTab] = useState('glossary');
  const [activeSidebarSection, setActiveSidebarSection] = useState('glossary');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-candilingo-purple">Products</h2>
        
        <div className="flex space-x-2">
          <Button size="sm" className="bg-candilingo-teal">
            <BookOpen className="mr-2 h-4 w-4" /> Add New Glossary
          </Button>
          <Button size="sm" variant="outline" className="border-candilingo-teal text-candilingo-teal">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
          <Button size="sm" className="bg-candilingo-teal">
            <Globe className="mr-2 h-4 w-4" /> Go to Public Glossary
          </Button>
          <Button size="sm" className="bg-candilingo-teal">
            <Layout className="mr-2 h-4 w-4" /> Go to Company Glossary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <ProductsSidebar 
              activeSection={activeSidebarSection} 
              onSectionChange={(section) => {
                setActiveSidebarSection(section);
                // Map sidebar sections to tabs
                if (section === 'glossary' || section.startsWith('glossary-')) {
                  setActiveTab('glossary');
                } else if (section === 'web-extension') {
                  setActiveTab('web-extensions');
                } else if (section === 'roadmap') {
                  setActiveTab('roadmap');
                }
              }} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6">
          <Tabs 
            defaultValue="glossary" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="glossary" className="data-[state=active]:bg-candilingo-pink data-[state=active]:text-white">
                <BookOpen className="mr-2 h-4 w-4" /> Glossary
              </TabsTrigger>
              <TabsTrigger value="web-extensions" className="data-[state=active]:bg-candilingo-pink data-[state=active]:text-white">
                <Globe className="mr-2 h-4 w-4" /> Web Extensions
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="data-[state=active]:bg-candilingo-pink data-[state=active]:text-white">
                <Clock className="mr-2 h-4 w-4" /> Roadmap
              </TabsTrigger>
            </TabsList>

            <TabsContent value="glossary" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <GlossaryTable organizationId={organizationId} />
            </TabsContent>

            <TabsContent value="web-extensions" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <WebExtensionsSection />
            </TabsContent>

            <TabsContent value="roadmap" className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <RoadmapSection />
            </TabsContent>
          </Tabs>
        </div>

        {/* News Sidebar */}
        <div className="lg:col-span-3">
          <CandlingoNews />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

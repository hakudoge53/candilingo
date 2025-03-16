
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Globe, 
  Layout, 
  BookOpen,
  Clock,
  Plus,
  Search
} from "lucide-react";
import GlossaryTable from './GlossaryTable';
import WebExtensionsSection from './WebExtensionsSection';
import RoadmapSection from './RoadmapSection';
import CandlingoNews from './CandlingoNews';
import ProductsSidebar from './ProductsSidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProductsPageProps {
  organizationId?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ organizationId }) => {
  const [activeTab, setActiveTab] = useState('glossary');
  const [activeSidebarSection, setActiveSidebarSection] = useState('glossary');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-candilingo-purple">Products</h2>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 pr-4 py-2 w-[250px] bg-white border-gray-200"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" className="bg-candilingo-pink hover:bg-candilingo-lightpink">
            <Plus className="mr-2 h-4 w-4" /> Add New Glossary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <Card className="border border-gray-100 shadow-sm overflow-hidden">
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6">
          <Card className="border border-gray-100 shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <Tabs 
                defaultValue="glossary" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-1">
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

                <TabsContent value="glossary">
                  <GlossaryTable organizationId={organizationId} />
                </TabsContent>

                <TabsContent value="web-extensions">
                  <WebExtensionsSection />
                </TabsContent>

                <TabsContent value="roadmap">
                  <RoadmapSection />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-4 gap-2">
            <Button variant="outline" className="text-candilingo-purple border-candilingo-purple hover:bg-candilingo-purple/10">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button className="bg-candilingo-teal hover:bg-candilingo-lightteal">
              <Globe className="mr-2 h-4 w-4" /> Go to Public Glossary
            </Button>
            <Button className="bg-candilingo-purple hover:bg-candilingo-lightpurple">
              <Layout className="mr-2 h-4 w-4" /> Go to Company Glossary
            </Button>
          </div>
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

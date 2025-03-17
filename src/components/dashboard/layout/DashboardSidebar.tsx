
import React, { useState } from 'react';
import { 
  Book, 
  Users, 
  FileText, 
  Settings, 
  LayoutGrid, 
  ChevronDown, 
  ChevronRight,
  Chrome,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface SidebarTab {
  label: string;
  value: string;
}

interface SidebarSection {
  title: string;
  key: string;
  tabs: SidebarTab[];
}

interface DashboardSidebarProps {
  sidebarSections: SidebarSection[];
  activeSection: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebarSections,
  activeSection,
  activeTab,
  onTabChange
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Get icon based on tab value
  const getTabIcon = (tabValue: string) => {
    switch (tabValue) {
      case 'glossaries':
        return <Book className="w-5 h-5" />;
      case 'extensions':
        return <Chrome className="w-5 h-5" />;
      case 'org-settings':
        return <Settings className="w-5 h-5" />;
      case 'members':
        return <Users className="w-5 h-5" />;
      case 'documentation':
        return <FileText className="w-5 h-5" />;
      case 'roadmap':
        return <LayoutGrid className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
            alt="Candilingo" 
            className="h-10" 
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {sidebarSections.map((section) => (
          <div key={section.key} className="mb-4">
            <div className="px-4 py-2">
              <div className="flex items-center">
                {section.key === activeSection ? (
                  <ChevronDown className="w-4 h-4 mr-1 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1 text-gray-500" />
                )}
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            </div>
            
            <div className={cn(
              "space-y-1 ml-6 transition-all",
              section.key === activeSection ? "block" : "hidden"
            )}>
              {section.tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    onTabChange(tab.value);
                    if (isMobile) setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm rounded-md transition-colors",
                    tab.value === activeTab 
                      ? "bg-candilingo-purple text-white font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {getTabIcon(tab.value)}
                  <span className="ml-3">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-candilingo-purple text-white flex items-center justify-center font-semibold">
            {activeSection[0]?.toUpperCase() || 'C'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Candilingo</p>
            <p className="text-xs text-gray-500">Professional Plan</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile drawer version
  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 z-30 w-full bg-white border-b border-gray-200 p-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <img 
            src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
            alt="Candilingo" 
            className="h-8" 
          />
        </div>
        
        <div className={cn(
          "fixed inset-0 bg-black/50 z-20 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div 
            className={cn(
              "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200",
              isOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="absolute top-4 right-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
        
        {/* Add padding to compensate for fixed header */}
        <div className="h-16"></div>
      </>
    );
  }

  // Desktop version
  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm">
      <SidebarContent />
    </aside>
  );
};

export default DashboardSidebar;

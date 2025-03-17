
import React from 'react';
import { 
  Book, 
  Users, 
  FileText, 
  Settings, 
  LayoutGrid, 
  ChevronDown, 
  ChevronRight,
  Chrome
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm">
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
                    onClick={() => onTabChange(tab.value)}
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
              {activeSection[0].toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Candilingo</p>
              <p className="text-xs text-gray-500">Professional Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

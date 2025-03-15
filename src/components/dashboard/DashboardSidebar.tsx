
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookMarked, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({ 
  collapsed, 
  setCollapsed, 
  activeTab, 
  setActiveTab 
}: DashboardSidebarProps) => {
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen fixed left-0 top-0 z-40 bg-white border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-xl text-candilingo-purple">Candilingo</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn(
            "h-8 w-8",
            collapsed ? "mx-auto" : ""
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-2">
          <li>
            <Button
              variant={activeTab === 'overview' ? 'purple' : 'ghost'}
              className={cn(
                "w-full justify-start",
                collapsed ? "justify-center px-2" : "px-3"
              )}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Overview</span>}
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'organizations' ? 'purple' : 'ghost'}
              className={cn(
                "w-full justify-start",
                collapsed ? "justify-center px-2" : "px-3"
              )}
              onClick={() => setActiveTab('organizations')}
            >
              <LayoutDashboard className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Organizations</span>}
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'glossaries' ? 'purple' : 'ghost'}
              className={cn(
                "w-full justify-start",
                collapsed ? "justify-center px-2" : "px-3"
              )}
              onClick={() => setActiveTab('glossaries')}
            >
              <BookMarked className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Glossaries</span>}
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'members' ? 'purple' : 'ghost'}
              className={cn(
                "w-full justify-start",
                collapsed ? "justify-center px-2" : "px-3"
              )}
              onClick={() => setActiveTab('members')}
            >
              <Users className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Team Members</span>}
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'settings' ? 'purple' : 'ghost'}
              className={cn(
                "w-full justify-start",
                collapsed ? "justify-center px-2" : "px-3"
              )}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Settings</span>}
            </Button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-gray-500 text-center">
            Candilingo Dashboard v1.0
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;

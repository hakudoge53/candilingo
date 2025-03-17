
import React, { ReactNode } from 'react';
import { User } from '@/hooks/auth/types';
import { Organization } from '@/types/organization';
import DashboardHeader from '../DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarTab {
  label: string;
  value: string;
}

interface SidebarSection {
  title: string;
  key: string;
  tabs: SidebarTab[];
}

interface DashboardLayoutProps {
  children: ReactNode;
  activeUser: User;
  activeOrganization: Organization | null;
  organizations: Organization[];
  onOrganizationChange: (org: Organization) => void;
  sidebarSections: SidebarSection[];
  activeSection: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeUser,
  activeOrganization,
  organizations,
  onOrganizationChange,
  sidebarSections,
  activeSection,
  activeTab,
  onTabChange
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-64px)]">
      <DashboardSidebar 
        sidebarSections={sidebarSections}
        activeSection={activeSection}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <main className={`flex-1 p-4 md:p-6 bg-gray-50 ${isMobile ? 'pt-16' : ''}`}>
        {!isMobile && (
          <DashboardHeader 
            activeOrganization={activeOrganization} 
            organizations={organizations}
            onOrganizationChange={onOrganizationChange}
          />
        )}
        <div className="mt-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;


import React from 'react';
import DashboardLayout from './layout/DashboardLayout';
import { useDashboardState } from '@/hooks/dashboard/useDashboardState';
import DashboardPanelRenderer from './panels/DashboardPanelRenderer';
import { getDashboardSidebarConfig } from './config/sidebarConfig';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Dashboard = () => {
  const {
    activeUser,
    activeOrganization,
    organizations,
    activeSection,
    activeTab,
    glossaries,
    activeGlossary,
    setActiveGlossary,
    terms,
    adminMembers,
    isLoading,
    glossariesLoading,
    isLoadingTerms,
    handleOrganizationChange,
    handleTabChange,
    addTerm,
    updateTerm,
    deleteTerm,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    createOrganization,
    orgLoading
  } = useDashboardState();
  
  const sidebarSections = getDashboardSidebarConfig();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner message="Loading dashboard..." />
    </div>;
  }
  
  if (!activeUser) {
    return null;
  }
  
  return (
    <DashboardLayout
      activeUser={activeUser}
      activeOrganization={activeOrganization}
      organizations={organizations}
      onOrganizationChange={handleOrganizationChange}
      sidebarSections={sidebarSections}
      activeSection={activeSection}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <DashboardPanelRenderer
        activeSection={activeSection}
        activeTab={activeTab}
        activeOrganization={activeOrganization}
        glossaries={glossaries}
        activeGlossary={activeGlossary}
        setActiveGlossary={setActiveGlossary}
        terms={terms}
        organizations={organizations}
        adminMembers={adminMembers}
        glossariesLoading={glossariesLoading}
        isLoadingTerms={isLoadingTerms}
        addTerm={addTerm}
        updateTerm={updateTerm}
        deleteTerm={deleteTerm}
        createGlossary={createGlossary}
        updateGlossary={updateGlossary}
        deleteGlossary={deleteGlossary}
        createOrganization={createOrganization}
        orgLoading={orgLoading}
      />
    </DashboardLayout>
  );
};

export default Dashboard;

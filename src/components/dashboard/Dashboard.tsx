
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import GlossaryPanel from './GlossaryPanel';
import WebExtensionsPanel from './WebExtensionsPanel';
import OrganizationPanel from './OrganizationPanel';
import ResourcesPanel from './ResourcesPanel';
import MembersPanel from './MembersPanel';
import { useAuth } from '@/hooks/auth/useAuth';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useGlossaries } from '@/hooks/useGlossaries';
import { Organization } from '@/types/organization';

const Dashboard = () => {
  const navigate = useNavigate();
  const { activeUser, isLoggedIn, isLoading: authLoading } = useAuth();
  const { 
    organizations, 
    activeOrganization, 
    setActiveOrganization,
    createOrganization,
    isLoading: orgLoading 
  } = useOrganizations();
  
  const { 
    glossaries,
    activeGlossary,
    setActiveGlossary,
    isLoading: glossariesLoading,
    isLoadingTerms,
    terms,
    addTerm,
    updateTerm,
    deleteTerm,
    createGlossary,
    updateGlossary,
    deleteGlossary
  } = useGlossaries(activeOrganization?.id);
  
  const [activeSection, setActiveSection] = useState('products');
  const [activeTab, setActiveTab] = useState('glossaries');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, authLoading, navigate]);
  
  if (authLoading || orgLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }
  
  if (!activeUser) {
    return null;
  }
  
  const handleOrganizationChange = (org: Organization) => {
    setActiveOrganization(org);
  };
  
  const handleTabChange = (tab: string) => {
    // Extract section and tab
    if (tab.includes('.')) {
      const [section, tabName] = tab.split('.');
      setActiveSection(section);
      setActiveTab(tabName);
    } else {
      setActiveTab(tab);
    }
  };
  
  // Define sidebar sections
  const sidebarSections = [
    {
      title: 'Products',
      key: 'products',
      tabs: [
        { label: 'Glossaries', value: 'products.glossaries' },
        { label: 'Web Extensions', value: 'products.extensions' }
      ]
    },
    {
      title: 'Organization',
      key: 'organization',
      tabs: [
        { label: 'Overview', value: 'organization.overview' },
        { label: 'Members', value: 'organization.members' }
      ]
    },
    {
      title: 'Resources',
      key: 'resources',
      tabs: [
        { label: 'Documentation', value: 'resources.documentation' },
        { label: 'Roadmap', value: 'resources.roadmap' }
      ]
    }
  ];
  
  // Render appropriate panel based on active section and tab
  const renderPanel = () => {
    if (activeSection === 'products') {
      if (activeTab === 'glossaries') {
        return <GlossaryPanel 
          glossaries={glossaries}
          activeGlossary={activeGlossary}
          setActiveGlossary={setActiveGlossary}
          terms={terms}
          isLoadingGlossaries={glossariesLoading}
          isLoadingTerms={isLoadingTerms}
          addTerm={addTerm}
          updateTerm={updateTerm}
          deleteTerm={deleteTerm}
          addGlossary={createGlossary}
          updateGlossary={updateGlossary}
          deleteGlossary={deleteGlossary}
        />;
      } else if (activeTab === 'extensions') {
        return <WebExtensionsPanel />;
      }
    } else if (activeSection === 'organization') {
      if (activeTab === 'overview') {
        return <OrganizationPanel 
          organizations={organizations} 
          createOrganization={createOrganization}
          isLoading={orgLoading}
        />;
      } else if (activeTab === 'members') {
        return <MembersPanel organizationId={activeOrganization?.id || ''} />;
      }
    } else if (activeSection === 'resources') {
      return <ResourcesPanel activeTab={activeTab} />;
    }
    
    // Default
    return <GlossaryPanel 
      glossaries={glossaries}
      activeGlossary={activeGlossary}
      setActiveGlossary={setActiveGlossary}
      terms={terms}
      isLoadingGlossaries={glossariesLoading}
      isLoadingTerms={isLoadingTerms}
      addTerm={addTerm}
      updateTerm={updateTerm}
      deleteTerm={deleteTerm}
      addGlossary={createGlossary}
      updateGlossary={updateGlossary}
      deleteGlossary={deleteGlossary}
    />;
  };
  
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
      {renderPanel()}
    </DashboardLayout>
  );
};

export default Dashboard;

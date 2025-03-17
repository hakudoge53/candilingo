import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import GlossaryPanel from './GlossaryPanel';
import WebExtensionsPanel from './WebExtensionsPanel';
import OrganizationPanel from './OrganizationPanel';
import ResourcesPanel from './ResourcesPanel';
import MembersPanel from './MembersPanel';
import TeamsPanel from './TeamsPanel';
import LicensesPanel from './LicensesPanel';
import OrganizationChartPanel from './OrganizationChartPanel';
import { useAuth } from '@/hooks/auth/useAuth';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useGlossaries } from '@/hooks/useGlossaries';
import { Organization, OrganizationMember, MemberStatus, UserRole } from '@/types/organization';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { activeUser, isLoggedIn, isLoading: authLoading } = useAuth();
  const { 
    organizations, 
    activeOrganization, 
    setActiveOrganization,
    members,
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
  const [adminMembers, setAdminMembers] = useState<OrganizationMember[]>([]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, authLoading, navigate]);
  
  useEffect(() => {
    if (activeOrganization?.id) {
      fetchAdminMembers(activeOrganization.id);
    }
  }, [activeOrganization, members]);
  
  const fetchAdminMembers = async (orgId: string) => {
    try {
      // Either use members from useOrganizations or fetch directly
      if (members && members.length > 0) {
        setAdminMembers(members.filter(m => 
          m.role === 'admin' || m.role === 'manager'
        ));
      } else {
        const { data, error } = await supabase
          .from('organization_members')
          .select(`
            *,
            user:profiles(id, name, email, avatar_url)
          `)
          .eq('organization_id', orgId)
          .in('role', ['admin', 'manager'])
          .eq('status', 'active');
        
        if (error) throw error;
        
        // Convert the raw data to the expected OrganizationMember format
        const typedMembers: OrganizationMember[] = (data || []).map((member: any) => {
          return {
            ...member,
            role: member.role as UserRole,
            status: member.status as MemberStatus,
            user: member.user || {}
          };
        });
        
        setAdminMembers(typedMembers);
      }
    } catch (error) {
      console.error('Error fetching admin members:', error);
    }
  };
  
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
  
  if (authLoading || orgLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }
  
  if (!activeUser) {
    return null;
  }
  
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
        { label: 'Members', value: 'organization.members' },
        { label: 'Teams', value: 'organization.teams' },
        { label: 'Org Chart', value: 'organization.chart' },
        { label: 'Licenses', value: 'organization.licenses' }
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
      } else if (activeTab === 'teams') {
        return <TeamsPanel organizationId={activeOrganization?.id || ''} />;
      } else if (activeTab === 'chart') {
        return <OrganizationChartPanel 
          organizationId={activeOrganization?.id || ''} 
          orgName={activeOrganization?.name || 'Organization'}
          admins={adminMembers}
        />;
      } else if (activeTab === 'licenses') {
        return <LicensesPanel organizationId={activeOrganization?.id || ''} />;
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

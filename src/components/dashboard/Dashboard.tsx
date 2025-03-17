
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import { useGlossaries } from '@/hooks/useGlossaries';
import { useOrganizations } from '@/hooks/useOrganizations';
import { toast } from 'sonner';
import DashboardTour from './DashboardTour';
import DashboardLayout from './layout/DashboardLayout';
import GlossaryPanel from './GlossaryPanel';
import OrganizationPanel from './OrganizationPanel';
import MembersPanel from './MembersPanel';
import ResourcesPanel from './ResourcesPanel';
import WebExtensionsPanel from './WebExtensionsPanel';
import { Tabs, TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { activeUser, isLoggedIn } = useAuth();
  const [activeSection, setActiveSection] = useState('products');
  const [activeTab, setActiveTab] = useState('glossaries');
  const [showTour, setShowTour] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access the dashboard");
      navigate('/customer-portal');
    }
  }, [isLoggedIn, navigate]);
  
  // If no active user, show loading state
  if (!activeUser) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }
  
  // Get organization ID if available
  const { 
    organizations, 
    activeOrganization,
    setActiveOrganization,
    members,
    inviteMember,
    updateMemberRole,
    removeMember,
    createOrganization,
    isLoading: isOrgLoading
  } = useOrganizations();
  
  const organizationId = activeOrganization?.id;
  
  // Fetch glossaries for the organization
  const {
    glossaries,
    activeGlossary,
    setActiveGlossary,
    terms,
    createGlossary,
    updateGlossary,
    deleteGlossary,
    addTerm,
    updateTerm,
    deleteTerm,
    isLoading: isGlossaryLoading
  } = useGlossaries(organizationId);
  
  // Start the tour if it's the user's first time
  useEffect(() => {
    // Check if first time visiting dashboard
    const hasSeenTour = localStorage.getItem('candilingo-dashboard-tour-seen');
    if (!hasSeenTour && isLoggedIn) {
      setShowTour(true);
      localStorage.setItem('candilingo-dashboard-tour-seen', 'true');
    }
  }, [isLoggedIn]);

  const sidebarSections = [
    {
      title: 'Products',
      key: 'products',
      tabs: [
        { label: 'Glossaries', value: 'glossaries' },
        { label: 'Web Extensions', value: 'extensions' }
      ]
    },
    {
      title: 'Organization',
      key: 'organization',
      tabs: [
        { label: 'Settings', value: 'org-settings' },
        { label: 'Team Members', value: 'members' }
      ]
    },
    {
      title: 'Resources',
      key: 'resources',
      tabs: [
        { label: 'Documentation', value: 'documentation' },
        { label: 'Roadmap', value: 'roadmap' }
      ]
    }
  ];
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Determine which section this tab belongs to
    for (const section of sidebarSections) {
      if (section.tabs.some(t => t.value === tab)) {
        setActiveSection(section.key);
        break;
      }
    }
  };
  
  return (
    <DashboardLayout
      activeUser={activeUser}
      activeOrganization={activeOrganization}
      organizations={organizations}
      onOrganizationChange={setActiveOrganization}
      sidebarSections={sidebarSections}
      activeSection={activeSection}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <Tabs value={activeTab} className="space-y-4">
        <TabsContent value="glossaries" className="space-y-4">
          <GlossaryPanel 
            glossaries={glossaries}
            activeGlossary={activeGlossary}
            setActiveGlossary={setActiveGlossary}
            terms={terms}
            createGlossary={createGlossary}
            updateGlossary={updateGlossary}
            deleteGlossary={deleteGlossary}
            addTerm={addTerm}
            updateTerm={updateTerm}
            deleteTerm={deleteTerm}
            isLoading={isGlossaryLoading}
            organizationId={organizationId}
          />
        </TabsContent>
        
        <TabsContent value="extensions" className="space-y-4">
          <WebExtensionsPanel />
        </TabsContent>
        
        <TabsContent value="org-settings" className="space-y-4">
          <OrganizationPanel
            organizations={organizations}
            createOrganization={createOrganization}
            isLoading={isOrgLoading}
          />
        </TabsContent>
        
        <TabsContent value="members" className="space-y-4">
          <MembersPanel
            members={members}
            inviteMember={(name, email, role) => {
              if (organizationId) {
                return inviteMember(organizationId, email, name, role);
              }
              return Promise.resolve(null);
            }}
            updateMemberRole={updateMemberRole}
            removeMember={removeMember}
            organizationId={organizationId || ''}
            isLoading={isOrgLoading}
          />
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <ResourcesPanel />
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-candilingo-purple">Candilingo Roadmap</h2>
            <div className="space-y-8">
              <RoadmapSection 
                title="Q4 2023"
                status="completed"
                items={[
                  "Launch of Candilingo core platform",
                  "Browser extension beta release",
                  "Technical glossary creation tools"
                ]}
              />
              <RoadmapSection 
                title="Q1 2024"
                status="in-progress"
                items={[
                  "Advanced glossary management",
                  "Team collaboration features",
                  "Organization permission controls"
                ]}
              />
              <RoadmapSection 
                title="Q2 2024"
                status="planned"
                items={[
                  "AI-powered term suggestions",
                  "API for third-party integrations",
                  "Custom branding options"
                ]}
              />
              <RoadmapSection 
                title="Future Plans"
                status="upcoming"
                items={[
                  "Enterprise SSO integration",
                  "Advanced analytics dashboard",
                  "Mobile application"
                ]}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {showTour && (
        <DashboardTour
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onClose={() => setShowTour(false)}
        />
      )}
    </DashboardLayout>
  );
};

interface RoadmapSectionProps {
  title: string;
  status: 'completed' | 'in-progress' | 'planned' | 'upcoming';
  items: string[];
}

const RoadmapSection = ({ title, status, items }: RoadmapSectionProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
      <ul className="space-y-2 ml-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full bg-candilingo-teal mt-2 mr-2"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import GlossaryPanel from './GlossaryPanel';
import OrganizationPanel from './OrganizationPanel';
import MembersPanel from './MembersPanel'; 
import { useAuth } from '@/hooks/useAuth';
import { useGlossaries } from '@/hooks/useGlossaries';
import { useOrganizations } from '@/hooks/useOrganizations';
import { toast } from 'sonner';
import DashboardTour from './DashboardTour';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { activeUser, isLoggedIn } = useAuth();
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
  
  return (
    <div className="space-y-6">
      <DashboardHeader 
        activeOrganization={activeOrganization} 
        organizations={organizations}
        onOrganizationChange={setActiveOrganization}
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="glossaries">Glossaries</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
        </TabsList>
        
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
        
        <TabsContent value="organization" className="space-y-4">
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
      </Tabs>
      
      {showTour && (
        <DashboardTour
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setShowTour(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

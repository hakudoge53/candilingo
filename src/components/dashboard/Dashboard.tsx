
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import OrganizationPanel from './OrganizationPanel';
import GlossaryPanel from './GlossaryPanel';
import MembersPanel from './MembersPanel';
import DashboardTour from './DashboardTour';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useGlossaries } from '@/hooks/useGlossaries';
import DashboardHeader from './DashboardHeader';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('organizations');
  const [showTour, setShowTour] = useState(false);
  const { 
    organizations, 
    activeOrganization, 
    setActiveOrganization, 
    members, 
    createOrganization, 
    inviteMember, 
    updateMemberRole, 
    removeMember, 
    isLoading: isOrgLoading 
  } = useOrganizations();
  
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
  } = useGlossaries(activeOrganization?.id);

  const isLoading = isOrgLoading || isGlossaryLoading;

  // Check if this is a new user (first visit to the dashboard)
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
    if (!hasSeenTour && !isLoading) {
      setShowTour(true);
      localStorage.setItem('hasSeenDashboardTour', 'true');
    }
  }, [isLoading]);

  return (
    <div className="w-full">
      <DashboardHeader 
        activeOrganization={activeOrganization} 
        organizations={organizations}
        onOrganizationChange={setActiveOrganization}
      />
      
      {isLoading && !activeOrganization && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-techlex-blue" />
        </div>
      )}
      
      {!isLoading && organizations.length === 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center p-6">
              <h3 className="text-lg font-medium mb-2">Welcome to TechLex Dashboard</h3>
              <p className="text-gray-500 mb-6">
                Create your first organization to get started with glossaries and team management.
              </p>
              <OrganizationPanel 
                organizations={[]} 
                createOrganization={createOrganization} 
                isLoading={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeOrganization && (
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="organizations">Organization</TabsTrigger>
            <TabsTrigger value="glossaries">Glossaries</TabsTrigger>
            <TabsTrigger value="members">Team Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="organizations">
            <OrganizationPanel 
              organizations={organizations} 
              createOrganization={createOrganization} 
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="glossaries">
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
              organizationId={activeOrganization.id}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="members">
            <MembersPanel 
              members={members}
              inviteMember={inviteMember}
              updateMemberRole={updateMemberRole}
              removeMember={removeMember}
              organizationId={activeOrganization.id}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      )}
      
      {/* Dashboard Tour for new users */}
      {showTour && <DashboardTour />}
    </div>
  );
};

export default Dashboard;

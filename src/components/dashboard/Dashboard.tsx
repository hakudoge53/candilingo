
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrganizationPanel from './OrganizationPanel';
import GlossaryPanel from './GlossaryPanel';
import MembersPanel from './MembersPanel';
import DashboardTour from './DashboardTour';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useGlossaries } from '@/hooks/useGlossaries';
import DashboardHeader from './DashboardHeader';
import { Button } from '@/components/ui/button';
import { Loader2, LayoutDashboard, Bookmark, UsersRound, BarChart3, Activity, Clock, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DashboardSidebar from './DashboardSidebar';
import DashboardStats from './DashboardStats';
import ActivityFeed from './ActivityFeed';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTour, setShowTour] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const { activeUser } = useAuth();
  
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
    <div className="flex h-full">
      <DashboardSidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <DashboardHeader 
          activeOrganization={activeOrganization} 
          organizations={organizations}
          onOrganizationChange={setActiveOrganization}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="p-4 md:p-6">
          {isLoading && !activeOrganization && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-candilingo-purple" />
            </div>
          )}
          
          {!isLoading && organizations.length === 0 && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center p-6">
                  <h3 className="text-lg font-medium mb-2">Welcome to Candilingo Dashboard</h3>
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
            <div className="space-y-6">
              <TabsContent value="overview" className={activeTab === 'overview' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <DashboardStats 
                    organizations={organizations}
                    glossaries={glossaries}
                    members={members}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-candilingo-purple" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ActivityFeed />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-candilingo-purple" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button 
                          variant="outline-purple" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('organizations')}
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Create Organization
                        </Button>
                        <Button 
                          variant="outline-purple" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('glossaries')}
                        >
                          <Bookmark className="mr-2 h-4 w-4" />
                          Add New Glossary
                        </Button>
                        <Button 
                          variant="outline-purple" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('members')}
                        >
                          <UsersRound className="mr-2 h-4 w-4" />
                          Invite Team Member
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="organizations" className={activeTab === 'organizations' ? 'block' : 'hidden'}>
                <OrganizationPanel 
                  organizations={organizations} 
                  createOrganization={createOrganization} 
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="glossaries" className={activeTab === 'glossaries' ? 'block' : 'hidden'}>
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
              
              <TabsContent value="members" className={activeTab === 'members' ? 'block' : 'hidden'}>
                <MembersPanel 
                  members={members}
                  inviteMember={inviteMember}
                  updateMemberRole={updateMemberRole}
                  removeMember={removeMember}
                  organizationId={activeOrganization.id}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="settings" className={activeTab === 'settings' ? 'block' : 'hidden'}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-candilingo-purple" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Name</h3>
                          <p className="text-gray-700">{activeUser?.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Email</h3>
                          <p className="text-gray-700">{activeUser?.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Membership</h3>
                          <p className="text-gray-700">{activeUser?.membership_tier || 'Free'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Status</h3>
                          <p className="text-gray-700">{activeUser?.status || 'Active'}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="outline-purple">
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          )}
        </div>
      </div>
      
      {/* Dashboard Tour for new users */}
      {showTour && <DashboardTour />}
    </div>
  );
};

export default Dashboard;

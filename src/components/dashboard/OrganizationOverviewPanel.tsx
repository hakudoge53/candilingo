
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, UsersRound, Trophy, BarChart3, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Organization } from '@/types/organization';

interface OrganizationOverviewPanelProps {
  activeOrganization: Organization | null;
}

const OrganizationOverviewPanel: React.FC<OrganizationOverviewPanelProps> = ({ activeOrganization }) => {
  if (!activeOrganization) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No organization selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Organization Overview</h2>
        <Button variant="purple">
          <Settings className="mr-2 h-4 w-4" /> Organization Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl">Organization Details</CardTitle>
            <Building className="h-5 w-5 text-candilingo-purple" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{activeOrganization.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{new Date(activeOrganization.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subscription</p>
                <p className="font-medium">Professional Plan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl">Members</CardTitle>
            <Users className="h-5 w-5 text-candilingo-purple" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-gray-500">Total Members</p>
              </div>
              <UsersRound className="h-10 w-10 text-candilingo-purple/20" />
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">18</p>
                <p className="text-gray-500">Active</p>
              </div>
              <div>
                <p className="font-medium">4</p>
                <p className="text-gray-500">Pending</p>
              </div>
              <div>
                <p className="font-medium">2</p>
                <p className="text-gray-500">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl">Resource Usage</CardTitle>
            <BarChart3 className="h-5 w-5 text-candilingo-purple" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Glossaries</p>
                  <p className="text-sm font-medium">12/20</p>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-candilingo-purple h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Teams</p>
                  <p className="text-sm font-medium">5/10</p>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-candilingo-teal h-full rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Extensions</p>
                  <p className="text-sm font-medium">24/30</p>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-candilingo-pink h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-candilingo-purple/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-candilingo-purple" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New member joined</p>
                  <p className="text-sm text-gray-500">Sarah Johnson joined the organization</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-candilingo-teal/10 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-candilingo-teal" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">Glossary created</p>
                  <p className="text-sm text-gray-500">New "Frontend Development" glossary created</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-candilingo-pink/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-candilingo-pink" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">License renewed</p>
                  <p className="text-sm text-gray-500">Professional plan subscription renewed</p>
                  <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage Stats</CardTitle>
            <CardDescription>Current usage metrics for your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Active Users This Week</p>
                <p className="text-2xl font-bold mt-1">18</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last week</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Terms Viewed</p>
                <p className="text-2xl font-bold mt-1">342</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Glossary Views</p>
                <p className="text-2xl font-bold mt-1">128</p>
                <p className="text-xs text-red-600 mt-1">↓ 5% from last week</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Extension Usage</p>
                <p className="text-2xl font-bold mt-1">86%</p>
                <p className="text-xs text-green-600 mt-1">↑ 3% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationOverviewPanel;

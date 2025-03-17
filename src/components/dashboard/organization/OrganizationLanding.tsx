
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Network, Key, Settings, BarChart3, Shield } from "lucide-react";
import { Organization } from '@/types/organization';

interface OrganizationLandingProps {
  activeOrganization: Organization | null;
}

const OrganizationLanding: React.FC<OrganizationLandingProps> = ({ activeOrganization }) => {
  return (
    <div className="space-y-6">
      {/* Organization Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-candilingo-purple/5 to-candilingo-teal/5 p-6 rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold text-candilingo-purple flex items-center">
            <Settings className="mr-2 h-6 w-6" />
            Organization Dashboard
          </h2>
          <p className="text-gray-600">
            {activeOrganization ? 
              `Manage ${activeOrganization.name}'s people, teams, and licenses` : 
              'Create or select an organization to get started'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-candilingo-purple" />
              Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">Manage team members and invitations</p>
            <Button variant="outline" size="sm" className="w-full">
              View Members
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Network className="h-5 w-5 mr-2 text-candilingo-purple" />
              Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">Create and manage teams within your organization</p>
            <Button variant="outline" size="sm" className="w-full">
              Manage Teams
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-candilingo-purple" />
              Org Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">Visualize your organization's structure</p>
            <Button variant="outline" size="sm" className="w-full">
              View Chart
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Key className="h-5 w-5 mr-2 text-candilingo-purple" />
              Licenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">Manage licenses and subscriptions</p>
            <Button variant="outline" size="sm" className="w-full">
              Manage Licenses
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Organization Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Overview</CardTitle>
          <CardDescription>
            {activeOrganization ? 
              `Key metrics for ${activeOrganization.name}` : 
              'Create an organization to view metrics'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Members</h3>
                <Users className="h-5 w-5 text-candilingo-purple" />
              </div>
              <p className="text-2xl font-bold">-</p>
              <p className="text-xs text-gray-500 mt-1">Active users in your organization</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Teams</h3>
                <Network className="h-5 w-5 text-candilingo-purple" />
              </div>
              <p className="text-2xl font-bold">-</p>
              <p className="text-xs text-gray-500 mt-1">Teams created within your organization</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Licenses</h3>
                <Key className="h-5 w-5 text-candilingo-purple" />
              </div>
              <p className="text-2xl font-bold">-</p>
              <p className="text-xs text-gray-500 mt-1">Active licenses in your organization</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-candilingo-purple" />
            Security & Compliance
          </CardTitle>
          <CardDescription>
            Manage security settings and compliance for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="permissions">
            <TabsList className="mb-4">
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
              <TabsTrigger value="sso">SSO Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="permissions">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500">Permission settings will be displayed here</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Configure Permissions
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="audit">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500">Audit logs will be displayed here</p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Full Logs
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="sso">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500">SSO integration settings will be displayed here</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Configure SSO
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationLanding;

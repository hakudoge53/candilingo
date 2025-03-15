
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Organization, OrganizationMember } from '@/types/organization';
import { Glossary } from '@/types/glossary';
import { LayoutDashboard, BookMarked, Users } from 'lucide-react';

interface DashboardStatsProps {
  organizations: Organization[];
  glossaries: Glossary[];
  members: OrganizationMember[];
}

const DashboardStats = ({ organizations, glossaries, members }: DashboardStatsProps) => {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const pendingMembers = members.filter(m => m.status === 'pending').length;

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-md">
              <LayoutDashboard className="h-6 w-6 text-candilingo-purple" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Organizations</div>
              <div className="text-2xl font-bold">{organizations.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-md">
              <BookMarked className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Glossaries</div>
              <div className="text-2xl font-bold">{glossaries.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-coral-100 rounded-md">
              <Users className="h-6 w-6 text-candilingo-coral" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Team Members</div>
              <div className="text-2xl font-bold">{activeMembers} <span className="text-sm font-normal text-gray-500">({pendingMembers} pending)</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardStats;

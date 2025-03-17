
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrganizations } from '@/hooks/useOrganizations';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/organization';
import { UserPlus, Users, Mail, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import InviteMemberDialog from './members/InviteMemberDialog';

const MembersPanel = () => {
  const { activeUser } = useAuth();
  const { activeOrganization, members, inviteMember, updateMemberRole, removeMember, isLoading } = useOrganizations();
  const [activeTab, setActiveTab] = useState('active');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  // Filter members by status
  const activeMembers = members.filter(member => member.status === 'active');
  const pendingInvites = members.filter(member => member.status === 'pending');
  
  // Check if current user is an admin (owner or super_admin)
  const isAdmin = members.some(member => 
    member.user_id === activeUser?.id && 
    (member.role === 'owner' || member.role === 'super_admin' || member.role === 'manager')
  );
  
  const handleInviteMember = async (name: string, email: string, role: UserRole) => {
    await inviteMember(email, name, role);
    setIsInviteDialogOpen(false);
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading members...</div>;
  }
  
  if (!activeOrganization) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Organization Selected</h3>
            <p className="text-gray-500">
              Please select or create an organization to manage members.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        {isAdmin && (
          <Button onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active" className="flex items-center">
            <Users className="mr-2 h-4 w-4" /> 
            Active Members ({activeMembers.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" /> 
            Pending Invites ({pendingInvites.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveMembersTable 
                members={activeMembers}
                currentUserId={activeUser?.id || ''}
                isAdmin={isAdmin}
                onRoleChange={updateMemberRole}
                onRemove={removeMember}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Manage invitations that have been sent but not yet accepted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PendingInvitationsTable 
                invites={pendingInvites}
                isAdmin={isAdmin}
                onRemove={removeMember}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <InviteMemberDialog 
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
        onInvite={handleInviteMember}
      />
    </div>
  );
};

export default MembersPanel;

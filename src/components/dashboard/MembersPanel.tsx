
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OrganizationMember, UserRole } from '@/types/organization';
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import EmptyMembersState from './members/EmptyMembersState';
import InviteMemberDialog from './members/InviteMemberDialog';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface MembersPanelProps {
  members: OrganizationMember[];
  inviteMember: (name: string, email: string, role: UserRole) => Promise<void>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  organizationId: string;
  isLoading: boolean;
}

const MembersPanel: React.FC<MembersPanelProps> = ({
  members,
  inviteMember,
  updateMemberRole,
  removeMember,
  organizationId,
  isLoading
}) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const currentUser = members.find(member => member.user_id === localStorage.getItem('current_user_id'));
  const isAdmin = currentUser?.role === 'owner' || currentUser?.role === 'super_admin';
  
  // Separate active and pending members
  const activeMembers = members.filter(member => member.status === 'active');
  const pendingInvites = members.filter(member => member.status === 'pending');
  
  const handleInvite = async (name: string, email: string, role: UserRole) => {
    await inviteMember(name, email, role);
    setShowInviteDialog(false);
  };
  
  const handleRoleChange = async (memberId: string, newRole: UserRole) => {
    await updateMemberRole(memberId, newRole);
  };
  
  const handleRemoveMember = async (memberId: string) => {
    await removeMember(memberId);
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">Loading team members...</div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Members</CardTitle>
        {isAdmin && (
          <Button onClick={() => setShowInviteDialog(true)} className="bg-candilingo-purple">
            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {members.length === 0 ? (
          <EmptyMembersState 
            isAdmin={isAdmin} 
            onInvite={() => setShowInviteDialog(true)} 
          />
        ) : (
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active Members</TabsTrigger>
              <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <ActiveMembersTable
                members={activeMembers}
                currentUserId={localStorage.getItem('current_user_id') || ''}
                isAdmin={isAdmin}
                onRoleChange={handleRoleChange}
                onRemove={handleRemoveMember}
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <PendingInvitationsTable
                invites={pendingInvites}
                isAdmin={isAdmin}
                onRemove={handleRemoveMember}
              />
            </TabsContent>
          </Tabs>
        )}
        
        <InviteMemberDialog
          open={showInviteDialog}
          onClose={() => setShowInviteDialog(false)}
          onInvite={handleInvite}
        />
      </CardContent>
    </Card>
  );
};

export default MembersPanel;

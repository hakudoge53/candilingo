
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useOrganizationMembers } from '@/hooks/organization/useOrganizationMembers';
import { OrganizationMember, UserRole } from '@/types/organization';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import InviteMemberDialog from './members/InviteMemberDialog';
import EmptyMembersState from './members/EmptyMembersState';

interface MembersPanelProps {
  organizationId: string;
}

const MembersPanel: React.FC<MembersPanelProps> = ({ organizationId }) => {
  const { activeUser } = useAuth();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const {
    members,
    inviteMember,
    updateMemberRole,
    removeMember,
    isLoading,
    error
  } = useOrganizationMembers(organizationId);

  // Filter active members and pending invites
  const activeMembers = members.filter(member => member.status === 'active');
  const pendingInvites = members.filter(member => member.status === 'pending');
  
  // Check if current user is admin
  const currentMember = members.find(member => member.user_id === activeUser?.id);
  const isAdmin = currentMember?.role === 'admin' || currentMember?.role === 'owner' || currentMember?.role === 'super_admin';

  // Handle role change
  const handleRoleChange = (memberId: string, newRole: UserRole) => {
    updateMemberRole(memberId, newRole);
  };

  // Handle member removal
  const handleRemoveMember = (memberId: string) => {
    removeMember(memberId);
  };

  // Show loading spinner while data is loading
  if (isLoading) {
    return (
      <Card className="shadow-md h-full flex items-center justify-center">
        <LoadingSpinner message="Loading team members..." />
      </Card>
    );
  }

  // Show error message if there was an error
  if (error) {
    return (
      <Card className="shadow-md h-full">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-red-500">Error loading team members. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show empty state if there are no members
  if (activeMembers.length === 0 && pendingInvites.length === 0) {
    return (
      <EmptyMembersState 
        isAdmin={isAdmin} 
        onInvite={() => setIsInviteDialogOpen(true)} 
      />
    );
  }

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Team Members</CardTitle>
        {isAdmin && (
          <Button 
            onClick={() => setIsInviteDialogOpen(true)}
            className="bg-candilingo-blue hover:bg-candilingo-darkblue"
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" />
            Invite
          </Button>
        )}
      </CardHeader>
      <CardContent className="pb-6 space-y-6">
        {activeMembers.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Active Members</h3>
            <ActiveMembersTable 
              members={activeMembers} 
              currentUserId={activeUser?.id || ''}
              isAdmin={isAdmin}
              onRoleChange={handleRoleChange}
              onRemove={handleRemoveMember}
            />
          </div>
        )}
        
        {pendingInvites.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Pending Invitations</h3>
            <PendingInvitationsTable 
              invites={pendingInvites}
              isAdmin={isAdmin}
              onRemove={handleRemoveMember}
            />
          </div>
        )}
      </CardContent>

      {/* Invite Member Dialog */}
      <InviteMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onInvite={inviteMember}
      />
    </Card>
  );
};

export default MembersPanel;

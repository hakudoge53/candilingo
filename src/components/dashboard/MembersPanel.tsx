
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { OrganizationMember, UserRole } from '@/types/organization';
import { useAuth } from '@/hooks/auth/useAuth';
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import InviteMemberDialog from './members/InviteMemberDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface MembersPanelProps {
  organizationId: string;
}

const MembersPanel: React.FC<MembersPanelProps> = ({ organizationId }) => {
  const { user } = useAuth();
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('members');
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [isRemovingMember, setIsRemovingMember] = useState(false);

  // Check if user is admin or manager
  const isAdmin = user && members.some(member => 
    member.user_id === user.id && 
    (member.role === 'admin' || member.role === 'manager')
  );

  useEffect(() => {
    fetchMembers();
    fetchPendingInvites();
  }, [organizationId]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      // Fetch active members for organization
      // Simulated for now
      setMembers([
        {
          id: '1',
          organization_id: organizationId,
          user_id: user?.id || '',
          invited_email: null,
          invited_name: null,
          role: 'admin' as UserRole,
          status: 'active',
          invitation_token: null,
          user: {
            id: user?.id,
            name: user?.name || 'Current User',
            email: user?.email || 'user@example.com',
            avatar_url: null
          }
        },
        // Add more sample members as needed
      ]);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingInvites = async () => {
    try {
      // Fetch pending invitations for the organization
      // Simulated for now
      setInvites([
        {
          id: 'invite1',
          organization_id: organizationId,
          invited_email: 'pending@example.com',
          invited_name: 'Pending User',
          role: 'employee' as UserRole,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: UserRole) => {
    setIsChangingRole(true);
    try {
      // Update member role logic would go here
      console.log(`Changing role for member ${memberId} to ${newRole}`);
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, role: newRole } : member
        )
      );
    } catch (error) {
      console.error('Error changing role:', error);
    } finally {
      setIsChangingRole(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    setIsRemovingMember(true);
    try {
      // Remove member logic would go here
      console.log(`Removing member ${memberId}`);
      setMembers(prev => prev.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Error removing member:', error);
    } finally {
      setIsRemovingMember(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    setIsRevoking(true);
    try {
      // Revoke invitation logic would go here
      console.log(`Revoking invite ${inviteId}`);
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
    } catch (error) {
      console.error('Error revoking invitation:', error);
    } finally {
      setIsRevoking(false);
    }
  };

  const handleInviteSuccess = (newInvite: any) => {
    setInvites(prev => [...prev, newInvite]);
    setIsInviteDialogOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organization Members</CardTitle>
        {isAdmin && (
          <Button onClick={() => setIsInviteDialogOpen(true)} size="sm">
            <PlusIcon className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="members">Active Members ({members.length})</TabsTrigger>
            <TabsTrigger value="invites">Pending Invites ({invites.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <ActiveMembersTable 
              members={members} 
              isLoading={isLoading}
              onRoleChange={handleChangeRole}
              onRemoveMember={handleRemoveMember}
            />
          </TabsContent>
          
          <TabsContent value="invites">
            <PendingInvitationsTable 
              invites={invites} 
              isLoading={isLoading}
              onRevokeInvite={handleRevokeInvite}
            />
          </TabsContent>
        </Tabs>
        
        <InviteMemberDialog 
          isOpen={isInviteDialogOpen} 
          onClose={() => setIsInviteDialogOpen(false)} 
          onSuccess={handleInviteSuccess} 
          organizationId={organizationId}
        />
      </CardContent>
    </Card>
  );
};

export default MembersPanel;

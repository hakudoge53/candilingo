
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, UserIcon, MailIcon } from 'lucide-react';
import { useOrganization } from '@/hooks/organization/useOrganization';
import { UserRole, OrganizationMember } from '@/types/organization';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useOrganizationActions } from '@/components/customer-portal/sections/organization/OrganizationActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyMembersState from './members/EmptyMembersState';
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import InviteMemberDialog from './members/InviteMemberDialog';

interface MembersPanelProps {
  organizationId: string;
}

const MembersPanel: React.FC<MembersPanelProps> = ({ organizationId }) => {
  const {
    activeOrganization,
    members,
    activeMembers,
    pendingInvites,
    isLoading,
    error,
    fetchOrganization,
  } = useOrganization();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [localMembers, setLocalMembers] = useState<OrganizationMember[]>([]);
  const [localInvites, setLocalInvites] = useState<OrganizationMember[]>([]);

  useEffect(() => {
    setLocalMembers(activeMembers);
    setLocalInvites(pendingInvites);
  }, [activeMembers, pendingInvites]);

  const {
    handleInviteMember,
    handleRevokeInvite,
    handleChangeRole,
    handleRemoveMember,
    isRemovingMember,
    isChangingRole,
    isRevokingInvite,
    isSubmittingInvite
  } = useOrganizationActions({
    organization: activeOrganization,
    setMembers: setLocalMembers,
    setInvites: setLocalInvites
  });

  useEffect(() => {
    if (organizationId) {
      fetchOrganization(organizationId);
    }
  }, [organizationId, fetchOrganization]);

  // Format pending invites for the table
  const formattedPendingInvites = localInvites.map(invite => ({
    id: invite.id,
    invited_email: invite.invited_email || '',
    invited_name: invite.invited_name || '',
    role: invite.role,
    created_at: invite.created_at || new Date().toISOString()
  }));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Members</CardTitle>
        <Button onClick={() => setIsInviteModalOpen(true)} size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Members</TabsTrigger>
            <TabsTrigger value="pending">Pending Invites</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : localMembers.length === 0 ? (
              <EmptyMembersState 
                message="No active members"
                subMessage="Your organization doesn't have any active members yet."
                icon={<UserIcon className="h-12 w-12 text-gray-400" />}
              />
            ) : (
              <ActiveMembersTable
                members={localMembers}
                onRoleChange={handleChangeRole}
                onRemoveMember={handleRemoveMember}
                isLoading={isRemovingMember || isChangingRole}
              />
            )}
          </TabsContent>
          <TabsContent value="pending">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : formattedPendingInvites.length === 0 ? (
              <EmptyMembersState 
                message="No pending invites"
                subMessage="Your organization doesn't have any pending invites."
                icon={<MailIcon className="h-12 w-12 text-gray-400" />}
              />
            ) : (
              <PendingInvitationsTable 
                invites={formattedPendingInvites}
                onRevokeInvite={handleRevokeInvite}
                isLoading={isRevokingInvite}
              />
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogContent>
            <InviteMemberDialog 
              isOpen={isInviteModalOpen}
              onClose={() => setIsInviteModalOpen(false)}
              organization={activeOrganization}
              onMemberInvited={handleInviteMember}
              isLoading={isSubmittingInvite}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MembersPanel;

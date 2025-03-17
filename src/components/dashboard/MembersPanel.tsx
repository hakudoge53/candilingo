import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, UserIcon, MailIcon } from 'lucide-react';
import { useOrganization } from '@/hooks/organization/useOrganization';
import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InviteMemberForm from '@/components/customer-portal/sections/organization/InviteMemberForm';
import { toast } from 'sonner';
import { useOrganizationActions } from '@/components/customer-portal/sections/organization/OrganizationActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Shield, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

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
    setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>> = useState(activeMembers)[1],
    setInvites: React.Dispatch<React.SetStateAction<any[]>> = useState(pendingInvites)[1]
  });

  useEffect(() => {
    if (organizationId) {
      fetchOrganization(organizationId);
    }
  }, [organizationId, fetchOrganization]);

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
            ) : activeMembers.length === 0 ? (
              <EmptyMembersState 
                message="No active members"
                subMessage="Your organization doesn't have any active members yet."
                icon={<UserIcon className="h-12 w-12 text-gray-400" />}
              />
            ) : (
              <ActiveMembersTable
                members={activeMembers}
                onRoleChange={handleRoleChange}
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
            ) : pendingInvites.length === 0 ? (
              <EmptyMembersState 
                message="No pending invites"
                subMessage="Your organization doesn't have any pending invites."
                icon={<MailIcon className="h-12 w-12 text-gray-400" />}
              />
            ) : (
              <PendingInvitationsTable 
                invites={pendingInvites.map(invite => ({
                  id: invite.id,
                  invited_email: invite.invited_email || '',
                  invited_name: invite.invited_name || '',
                  role: invite.role,
                  created_at: invite.created_at || new Date().toISOString()
                }))}
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
              onMemberInvited={(newInvite) => handleInviteMember(newInvite)}
              isLoading={isSubmittingInvite}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

interface EmptyMembersStateProps {
  message: string;
  subMessage: string;
  icon: React.ReactNode;
}

const EmptyMembersState: React.FC<EmptyMembersStateProps> = ({ message, subMessage, icon }) => {
  return (
    <div className="text-center py-8">
      {icon}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{message}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {subMessage}
      </p>
    </div>
  );
};

interface ActiveMembersTableProps {
  members: OrganizationMember[];
  onRoleChange: (memberId: string, role: UserRole) => void;
  onRemoveMember: (memberId: string) => void;
  isLoading: boolean;
}

const ActiveMembersTable: React.FC<ActiveMembersTableProps> = ({ members, onRoleChange, onRemoveMember, isLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{member.user?.name?.substring(0, 2).toUpperCase() || member.user_id.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.user?.name || member.user_id}</p>
                  <p className="text-sm text-gray-500">{member.user?.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={
                member.role === 'admin' ? 'destructive' : 
                member.role === 'manager' ? 'default' : 
                'outline'
              }>
                {member.role}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onRoleChange(member.id, member.role)} disabled={isLoading}>
                    <Shield className="mr-2 h-4 w-4" />
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onRemoveMember(member.id)} disabled={isLoading}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface PendingInvitationsTableProps {
  invites: {
    id: string;
    invited_email: string;
    invited_name: string;
    role: UserRole;
    created_at: string;
  }[];
  onRevokeInvite: (inviteId: string) => void;
  isLoading: boolean;
}

const PendingInvitationsTable: React.FC<PendingInvitationsTableProps> = ({ invites, onRevokeInvite, isLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invites.map((invite) => (
          <TableRow key={invite.id}>
            <TableCell>{invite.invited_email}</TableCell>
            <TableCell>{invite.invited_name}</TableCell>
            <TableCell>
              <Badge variant="secondary">{invite.role}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700"
                onClick={() => onRevokeInvite(invite.id)}
                disabled={isLoading}
              >
                Revoke
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface InviteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization | null;
  onMemberInvited: (values: { email: string; name: string; role: UserRole }) => Promise<any>;
  isLoading: boolean;
}

const InviteMemberDialog: React.FC<InviteMemberDialogProps> = ({ isOpen, onClose, organization, onMemberInvited, isLoading }) => {
  const handleInvite = async (values: { email: string; name: string; role: UserRole }) => {
    if (!organization) {
      toast.error("No organization selected");
      return;
    }

    await onMemberInvited(values);
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite New Member</DialogTitle>
        <DialogDescription>
          Invite a new member to your organization.
        </DialogDescription>
      </DialogHeader>
      <InviteMemberForm onInvite={handleInvite} isLoading={isLoading} />
    </>
  );
};

export default MembersPanel;

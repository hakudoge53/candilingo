
import React, { useState } from 'react';
import { Organization } from '@/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from 'lucide-react';
import OrganizationDetailsCard from './OrganizationDetailsCard';
import { OrganizationMember, UserRole } from '@/types/organization';
import { OrganizationInvitation } from './types';
import InviteMemberForm from './InviteMemberForm';

interface OrganizationCardProps {
  organization: Organization;
  members: OrganizationMember[];
  invites: OrganizationInvitation[];
  currentUserId: string;
  onInviteMember: (values: { email: string; name: string; role: UserRole }) => Promise<any>;
  onChangeRole: (memberId: string, role: UserRole) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
  onRevokeInvite: (inviteId: string) => Promise<void>;
  isSubmittingInvite: boolean;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  members,
  invites,
  currentUserId,
  onInviteMember,
  onChangeRole,
  onRemoveMember,
  onRevokeInvite,
  isSubmittingInvite
}) => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const handleInviteSubmit = async (values: { email: string; name: string; role: UserRole }) => {
    await onInviteMember(values);
    setIsInviteDialogOpen(false);
  };

  // Determine if current user is admin or owner
  const currentMember = members.find(m => m.user_id === currentUserId);
  const isAdmin = currentMember?.role === 'super_admin' || currentMember?.role === 'owner' || currentMember?.role === 'manager';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Details</CardTitle>
        <CardDescription>
          Manage your organization settings and members.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <OrganizationDetailsCard organization={organization} />
        
        {isAdmin && (
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsInviteDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <InviteMemberForm 
                onInvite={handleInviteSubmit}
                isLoading={isSubmittingInvite}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

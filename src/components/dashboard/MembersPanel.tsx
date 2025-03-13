
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { OrganizationMember, UserRole } from '@/types/organization';
import InviteMemberDialog from './members/InviteMemberDialog';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import ActiveMembersTable from './members/ActiveMembersTable';
import EmptyMembersState from './members/EmptyMembersState';

interface MembersPanelProps {
  members: OrganizationMember[];
  inviteMember: (organizationId: string, email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  organizationId: string;
  isLoading: boolean;
}

const MembersPanel = ({ 
  members, 
  inviteMember, 
  updateMemberRole, 
  removeMember, 
  organizationId,
  isLoading 
}: MembersPanelProps) => {
  const [open, setOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInviteMember = async (name: string, email: string, role: UserRole) => {
    setIsSubmitting(true);
    await inviteMember(organizationId, email, name, role);
    setIsSubmitting(false);
    setOpen(false);
  };

  const handleRoleChange = async (memberId: string, role: UserRole) => {
    await updateMemberRole(memberId, role);
    setEditRoleId(null);
  };

  const pendingMembers = members.filter(m => m.status === 'pending');
  const activeMembers = members.filter(m => m.status === 'active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <InviteMemberDialog 
          open={open} 
          setOpen={setOpen} 
          isSubmitting={isSubmitting} 
          onInvite={handleInviteMember} 
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          {members.length === 0 ? (
            <EmptyMembersState />
          ) : (
            <>
              <PendingInvitationsTable 
                pendingMembers={pendingMembers} 
                onRemoveMember={removeMember} 
              />
              <ActiveMembersTable 
                activeMembers={activeMembers}
                editRoleId={editRoleId}
                setEditRoleId={setEditRoleId}
                onRoleChange={handleRoleChange}
                onRemoveMember={removeMember}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPanel;


import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { OrganizationMember, UserRole } from '@/types/organization';
import InviteMemberDialog from './members/InviteMemberDialog';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import ActiveMembersTable from './members/ActiveMembersTable';
import EmptyMembersState from './members/EmptyMembersState';
import { useAuth } from '@/hooks/useAuth';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeUser } = useAuth();
  const currentUserId = activeUser?.id || '';

  const handleInviteMember = async (name: string, email: string, role: UserRole) => {
    setIsSubmitting(true);
    await inviteMember(organizationId, email, name, role);
    setIsSubmitting(false);
    setOpen(false);
  };

  const handleRoleChange = (memberId: string, role: UserRole) => {
    updateMemberRole(memberId, role);
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
                onRemoveMember={memberId => removeMember(memberId)} 
              />
              <ActiveMembersTable 
                members={activeMembers}
                currentUserId={currentUserId}
                onChangeRole={handleRoleChange}
                onRemoveMember={member => removeMember(member.id)}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPanel;

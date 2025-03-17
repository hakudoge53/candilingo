
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ROLE_LABELS } from '@/types/organization';
import { formatDistanceToNow } from 'date-fns';

export interface PendingInvitationsTableProps {
  invites: Array<{
    id: string;
    invited_email: string;
    invited_name: string | null;
    role: string;
    created_at: string;
  }>;
  isLoading: boolean;
  onRevokeInvite: (inviteId: string) => Promise<void>;
}

const PendingInvitationsTable: React.FC<PendingInvitationsTableProps> = ({
  invites,
  isLoading,
  onRevokeInvite
}) => {
  if (isLoading) {
    return <div className="py-4 text-center">Loading pending invitations...</div>;
  }

  if (invites.length === 0) {
    return <div className="py-4 text-center">No pending invitations</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Sent</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invites.map((invite) => (
          <TableRow key={invite.id}>
            <TableCell>{invite.invited_email}</TableCell>
            <TableCell>{invite.invited_name || '-'}</TableCell>
            <TableCell>{ROLE_LABELS[invite.role] || invite.role}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}
            </TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onRevokeInvite(invite.id)}
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

export default PendingInvitationsTable;

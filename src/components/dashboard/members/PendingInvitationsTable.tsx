
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRole } from '@/types/organization';

interface PendingInviteData {
  id: string;
  invited_email: string;
  invited_name: string;
  role: UserRole;
  created_at: string;
}

interface PendingInvitationsTableProps {
  invites: PendingInviteData[];
  onRevokeInvite: (inviteId: string) => void;
  isLoading: boolean;
}

const PendingInvitationsTable: React.FC<PendingInvitationsTableProps> = ({ 
  invites, 
  onRevokeInvite, 
  isLoading 
}) => {
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
            <TableCell>{invite.invited_name || '-'}</TableCell>
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

export default PendingInvitationsTable;

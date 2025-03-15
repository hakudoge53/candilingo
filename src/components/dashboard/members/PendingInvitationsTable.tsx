
import React from 'react';
import { OrganizationMember, ROLE_LABELS } from '@/types/organization';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Clock } from "lucide-react";

interface PendingInvitationsTableProps {
  invites: OrganizationMember[];
  isAdmin: boolean;
  onRemove: (inviteId: string) => void;
}

const PendingInvitationsTable: React.FC<PendingInvitationsTableProps> = ({
  invites,
  isAdmin,
  onRemove
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invited Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          {isAdmin && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {invites.length === 0 ? (
          <TableRow>
            <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-6 text-gray-500">
              No pending invitations
            </TableCell>
          </TableRow>
        ) : (
          invites.map(invite => (
            <TableRow key={invite.id}>
              <TableCell className="font-medium">
                {invite.invited_name || 'No name provided'}
              </TableCell>
              <TableCell>{invite.invited_email || 'No email'}</TableCell>
              <TableCell>{ROLE_LABELS[invite.role] || invite.role}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex w-fit items-center gap-1">
                  <Clock className="h-3 w-3" /> Pending
                </Badge>
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onRemove(invite.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PendingInvitationsTable;


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Shield, Trash2 } from "lucide-react";
import { OrganizationMember, ROLE_LABELS } from '@/types/organization';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from 'date-fns';

interface ActiveMembersTableProps {
  members: OrganizationMember[];
  currentUserId: string;
  onChangeRole: (member: OrganizationMember) => void;
  onRemoveMember: (member: OrganizationMember) => void;
}

const ActiveMembersTable: React.FC<ActiveMembersTableProps> = ({
  members,
  currentUserId,
  onChangeRole,
  onRemoveMember
}) => {
  // Filter out only active members
  const activeMembers = members.filter(member => member.status === 'active');

  if (activeMembers.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No active members found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activeMembers.map(member => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.user?.name || member.invited_name || "Unknown"}</TableCell>
            <TableCell>{member.user?.email || member.invited_email || "Unknown"}</TableCell>
            <TableCell>{ROLE_LABELS[member.role]}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(member.created_at), { addSuffix: true })}</TableCell>
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
                  <DropdownMenuItem 
                    onClick={() => onChangeRole(member)}
                    disabled={currentUserId === member.user_id}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onRemoveMember(member)}
                    disabled={currentUserId === member.user_id}
                    className="text-destructive"
                  >
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

export default ActiveMembersTable;

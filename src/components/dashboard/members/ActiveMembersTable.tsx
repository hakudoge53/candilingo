
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Shield, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { OrganizationMember, UserRole } from '@/types/organization';

interface ActiveMembersTableProps {
  members: OrganizationMember[];
  onRoleChange: (memberId: string, role: UserRole) => void;
  onRemoveMember: (memberId: string) => void;
  isLoading: boolean;
}

const ActiveMembersTable: React.FC<ActiveMembersTableProps> = ({ 
  members, 
  onRoleChange, 
  onRemoveMember, 
  isLoading 
}) => {
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
                  <AvatarFallback>
                    {member.user?.name?.substring(0, 2).toUpperCase() || 
                     member.invited_name?.substring(0, 2).toUpperCase() || 
                     member.user_id.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.user?.name || member.invited_name || member.user_id}</p>
                  <p className="text-sm text-gray-500">{member.user?.email || member.invited_email}</p>
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

export default ActiveMembersTable;

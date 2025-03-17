import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { OrganizationMember, UserRole } from '@/types/organization';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/auth/useAuth';
import { ROLE_LABELS } from '@/types/organization';

interface ActiveMembersTableProps {
  members: OrganizationMember[];
  onRoleChange: (memberId: string, role: UserRole) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
  isLoading: boolean;
}

const ActiveMembersTable: React.FC<ActiveMembersTableProps> = ({
  members,
  onRoleChange,
  onRemoveMember,
  isLoading
}) => {
  const { activeUser } = useAuth();

  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your active team members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <img
                  src={member.user?.avatar_url || "/placeholder-avatar.jpg"}
                  alt={member.user?.name || "Avatar"}
                  className="h-8 w-8 rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium">{member.user?.name}</TableCell>
              <TableCell>{member.user?.email}</TableCell>
              <TableCell>{ROLE_LABELS[member.role]}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {(activeUser?.role === 'owner' || activeUser?.role === 'admin') && (
                      <>
                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'admin')}>
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'manager')}>
                          Make Manager
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'team_lead')}>
                          Make Team Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'employee')}>
                          Make Employee
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRoleChange(member.id, 'consultant')}>
                          Make Consultant
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {(activeUser?.role === 'owner' || activeUser?.role === 'admin') && member.role !== 'owner' && (
                      <DropdownMenuItem onClick={() => onRemoveMember(member.id)}>
                        Remove Member
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <div>Loading...</div>}
    </div>
  )
}

export default ActiveMembersTable;


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Shield, Trash2 } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { OrganizationMember, UserRole, ROLE_LABELS } from '@/types/organization';

interface ActiveMembersTableProps {
  members: OrganizationMember[];
  currentUserId: string;
  onChangeRole: (member: OrganizationMember, role: UserRole) => void;
  onRemoveMember: (memberId: string) => void | Promise<void>;
}

const ActiveMembersTable = ({ 
  members, 
  currentUserId, 
  onChangeRole, 
  onRemoveMember 
}: ActiveMembersTableProps) => {
  if (members.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Active Members</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.user?.avatar_url || undefined} alt={member.user?.name || 'Member'} />
                  <AvatarFallback>
                    {member.user?.name ? member.user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <span>{member.user?.name || 'Unknown User'}</span>
              </TableCell>
              <TableCell>{member.user?.email || member.invited_email || 'No email'}</TableCell>
              <TableCell>
                {currentUserId !== member.user_id ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {ROLE_LABELS[member.role]}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.entries(ROLE_LABELS).map(([role, label]) => (
                        role !== 'super_admin' && (
                          <DropdownMenuItem 
                            key={role} 
                            onClick={() => onChangeRole(member, role as UserRole)}
                            disabled={role === member.role}
                          >
                            {label}
                          </DropdownMenuItem>
                        )
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span>{ROLE_LABELS[member.role]}</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {currentUserId !== member.user_id && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Member</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this member from your organization? 
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => onRemoveMember(member.id)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveMembersTable;

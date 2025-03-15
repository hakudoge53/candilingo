
import React from 'react';
import { OrganizationMember, UserRole, ROLE_LABELS } from '@/types/organization';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, ShieldAlert } from "lucide-react";

interface ActiveMembersTableProps {
  members: OrganizationMember[];
  currentUserId: string;
  isAdmin: boolean;
  onRoleChange: (memberId: string, newRole: UserRole) => void;
  onRemove: (memberId: string) => void;
}

const ActiveMembersTable: React.FC<ActiveMembersTableProps> = ({
  members,
  currentUserId,
  isAdmin,
  onRoleChange,
  onRemove
}) => {
  // Sort members by role importance and then by name
  const sortedMembers = [...members].sort((a, b) => {
    const roleOrder = { super_admin: 0, owner: 1, manager: 2, team_lead: 3, employee: 4 };
    const roleA = roleOrder[a.role as keyof typeof roleOrder];
    const roleB = roleOrder[b.role as keyof typeof roleOrder];
    
    if (roleA !== roleB) return roleA - roleB;
    
    const nameA = a.user?.name || a.invited_name || '';
    const nameB = b.user?.name || b.invited_name || '';
    return nameA.localeCompare(nameB);
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          {isAdmin && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMembers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={isAdmin ? 4 : 3} className="text-center py-6 text-gray-500">
              No active members found
            </TableCell>
          </TableRow>
        ) : (
          sortedMembers.map(member => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {member.user_id === currentUserId && (
                    <span className="bg-candilingo-purple text-white text-xs py-0.5 px-2 rounded-full">You</span>
                  )}
                  {member.role === 'owner' && <ShieldAlert className="h-4 w-4 text-candilingo-blue" />}
                  {member.user?.name || member.invited_name || 'Unknown User'}
                </div>
              </TableCell>
              <TableCell>{member.user?.email || member.invited_email || 'No email'}</TableCell>
              <TableCell>
                {isAdmin && member.user_id !== currentUserId ? (
                  <Select 
                    value={member.role} 
                    onValueChange={(value) => onRoleChange(member.id, value as UserRole)}
                    disabled={member.role === 'super_admin' || member.role === 'owner'}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">{ROLE_LABELS.manager}</SelectItem>
                      <SelectItem value="team_lead">{ROLE_LABELS.team_lead}</SelectItem>
                      <SelectItem value="employee">{ROLE_LABELS.employee}</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span>{ROLE_LABELS[member.role] || member.role}</span>
                )}
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  {member.user_id !== currentUserId && member.role !== 'owner' && member.role !== 'super_admin' && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onRemove(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ActiveMembersTable;

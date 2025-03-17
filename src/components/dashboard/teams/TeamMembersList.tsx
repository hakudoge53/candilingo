
import React from 'react';
import { TeamMember } from '@/hooks/organization/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusIcon, UserIcon } from 'lucide-react';
import { EmptyMembersState } from '@/components/dashboard/members/EmptyMembersState';

interface TeamMembersListProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
  onRemoveMember: (id: string) => Promise<void>;
  onToggleManager: (teamMember: TeamMember) => Promise<void>;
  onAddMemberClick: () => void;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({
  teamMembers,
  isLoading,
  onRemoveMember,
  onToggleManager,
  onAddMemberClick
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }
  
  if (teamMembers.length === 0) {
    return (
      <EmptyMembersState 
        message="No team members"
        subMessage="Add members to this team to get started."
        icon={<UserIcon className="h-12 w-12 text-gray-400" />}
      >
        <div className="mt-6">
          <Button onClick={onAddMemberClick}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        </div>
      </EmptyMembersState>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Team Manager</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamMembers.map((teamMember) => (
          <TableRow key={teamMember.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage 
                    src={teamMember.member?.user?.avatar_url || undefined} 
                    alt={teamMember.member?.user?.name || ''} 
                  />
                  <AvatarFallback>
                    {(teamMember.member?.user?.name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{teamMember.member?.user?.name}</p>
                  <p className="text-sm text-gray-500">{teamMember.member?.user?.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={
                teamMember.member?.role === 'admin' ? 'destructive' : 
                teamMember.member?.role === 'manager' ? 'default' : 
                'outline'
              }>
                {teamMember.member?.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Switch
                checked={teamMember.is_team_manager}
                onCheckedChange={() => onToggleManager(teamMember)}
              />
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => onRemoveMember(teamMember.id)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamMembersList;

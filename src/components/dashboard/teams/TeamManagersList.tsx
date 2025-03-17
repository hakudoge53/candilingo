
import React from 'react';
import { TeamMember } from '@/hooks/organization/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldAlertIcon } from 'lucide-react';
import { EmptyMembersState } from '@/components/dashboard/members/EmptyMembersState';

interface TeamManagersListProps {
  managers: TeamMember[];
  isLoading: boolean;
  onRemoveManagerRole: (manager: TeamMember) => Promise<void>;
}

const TeamManagersList: React.FC<TeamManagersListProps> = ({
  managers,
  isLoading,
  onRemoveManagerRole
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }
  
  if (managers.length === 0) {
    return (
      <EmptyMembersState 
        message="No team managers"
        subMessage="Assign team managers to give them permission to manage this team."
        icon={<ShieldAlertIcon className="h-12 w-12 text-gray-400" />}
      />
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Manager</TableHead>
          <TableHead>Organization Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {managers.map((manager) => (
          <TableRow key={manager.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage 
                    src={manager.member?.user?.avatar_url || undefined} 
                    alt={manager.member?.user?.name || ''} 
                  />
                  <AvatarFallback>
                    {(manager.member?.user?.name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{manager.member?.user?.name}</p>
                  <p className="text-sm text-gray-500">{manager.member?.user?.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={
                manager.member?.role === 'admin' ? 'destructive' : 
                manager.member?.role === 'manager' ? 'default' : 
                'outline'
              }>
                {manager.member?.role}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveManagerRole(manager)}
              >
                Remove Manager Role
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamManagersList;

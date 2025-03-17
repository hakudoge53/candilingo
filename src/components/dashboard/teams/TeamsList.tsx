
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users2Icon } from 'lucide-react';
import { Team } from '@/hooks/organization/types';

interface TeamsListProps {
  teams: Team[];
  isLoading: boolean;
  onEditTeam: (team: Team) => void;
  onDeleteTeam: (id: string) => void;
  onOpenMembersDialog: (team: Team) => void;
  onCreateTeamClick: () => void;
}

const TeamsList: React.FC<TeamsListProps> = ({
  teams,
  isLoading,
  onEditTeam,
  onDeleteTeam,
  onOpenMembersDialog,
  onCreateTeamClick
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

  if (teams.length === 0) {
    return (
      <div className="text-center py-8">
        <Users2Icon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No teams</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new team.
        </p>
        <div className="mt-6">
          <Button onClick={onCreateTeamClick}>
            <Users2Icon className="mr-2 h-4 w-4" /> Create Team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Team Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Members</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.id}>
            <TableCell className="font-medium">{team.name}</TableCell>
            <TableCell className="max-w-md truncate">{team.description || '-'}</TableCell>
            <TableCell className="text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onOpenMembersDialog(team)}
              >
                {team.member_count || 0} members
              </Button>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEditTeam(team)}
                className="mr-2"
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700"
                onClick={() => onDeleteTeam(team.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamsList;

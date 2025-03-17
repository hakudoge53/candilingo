
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, Users2Icon } from 'lucide-react';
import { useTeams } from '@/hooks/organization/teams/useTeams';
import { Team } from '@/hooks/organization/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TeamMembersDialog from './teams/TeamMembersDialog';
import { Skeleton } from '@/components/ui/skeleton';

export interface TeamsPanelProps {
  organizationId: string;
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ organizationId }) => {
  const { teams, isLoading, error, fetchTeams, createTeam, updateTeam, deleteTeam } = useTeams();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load teams when component mounts or organization changes
  useEffect(() => {
    if (organizationId) {
      fetchTeams(organizationId);
    }
  }, [organizationId]);

  const handleCreateTeam = async () => {
    setIsSubmitting(true);
    const result = await createTeam(teamName, teamDescription, organizationId);
    setIsSubmitting(false);
    
    if (result) {
      setTeamName('');
      setTeamDescription('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleUpdateTeam = async () => {
    if (!selectedTeam) return;
    
    setIsSubmitting(true);
    const result = await updateTeam(selectedTeam.id, teamName, teamDescription);
    setIsSubmitting(false);
    
    if (result) {
      setTeamName('');
      setTeamDescription('');
      setIsEditDialogOpen(false);
      setSelectedTeam(null);
    }
  };

  const handleDeleteTeam = async (id: string) => {
    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this team?')) return;
    
    await deleteTeam(id);
  };

  const openEditDialog = (team: Team) => {
    setSelectedTeam(team);
    setTeamName(team.name);
    setTeamDescription(team.description || '');
    setIsEditDialogOpen(true);
  };

  const openMembersDialog = (team: Team) => {
    setSelectedTeam(team);
    setIsMembersDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Teams</CardTitle>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Create Team
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-8">
            <Users2Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No teams</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new team.
            </p>
            <div className="mt-6">
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" /> Create Team
              </Button>
            </div>
          </div>
        ) : (
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
                      onClick={() => openMembersDialog(team)}
                    >
                      {team.member_count || 0} members
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openEditDialog(team)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTeam(team.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Create Team Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Teams help you organize members within your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter team name" 
                  value={teamName} 
                  onChange={(e) => setTeamName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter team description" 
                  value={teamDescription} 
                  onChange={(e) => setTeamDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setTeamName('');
                  setTeamDescription('');
                  setIsCreateDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTeam} 
                disabled={isSubmitting || !teamName.trim()}
              >
                {isSubmitting ? "Creating..." : "Create Team"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Team Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription>
                Update team information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Team Name</Label>
                <Input 
                  id="edit-name" 
                  placeholder="Enter team name" 
                  value={teamName} 
                  onChange={(e) => setTeamName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (optional)</Label>
                <Textarea 
                  id="edit-description" 
                  placeholder="Enter team description" 
                  value={teamDescription} 
                  onChange={(e) => setTeamDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setTeamName('');
                  setTeamDescription('');
                  setIsEditDialogOpen(false);
                  setSelectedTeam(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateTeam} 
                disabled={isSubmitting || !teamName.trim()}
              >
                {isSubmitting ? "Updating..." : "Update Team"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Team Members Dialog */}
        {selectedTeam && (
          <TeamMembersDialog
            isOpen={isMembersDialogOpen}
            onClose={() => {
              setIsMembersDialogOpen(false);
              setSelectedTeam(null);
            }}
            team={selectedTeam}
            organizationId={organizationId}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TeamsPanel;

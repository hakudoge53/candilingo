
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Team, TeamMember } from '@/hooks/organization/types';
import { useTeamMembers } from '@/hooks/organization/teams/useTeamMembers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, UserIcon, ShieldAlertIcon } from 'lucide-react';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { OrganizationMember, UserRole } from '@/types/organization';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLicenses } from '@/hooks/organization/licenses/useLicenses';

interface TeamMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
  organizationId: string;
}

const TeamMembersDialog: React.FC<TeamMembersDialogProps> = ({ 
  isOpen, 
  onClose, 
  team,
  organizationId
}) => {
  const { 
    teamMembers, 
    isLoading, 
    error, 
    fetchTeamMembers, 
    addMemberToTeam, 
    updateTeamMember, 
    removeFromTeam 
  } = useTeamMembers();

  const { checkLicenseAvailability } = useLicenses();
  
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('members');

  // Load team members when dialog is opened
  useEffect(() => {
    if (isOpen && team?.id) {
      fetchTeamMembers(team.id);
    }
  }, [isOpen, team?.id]);

  const handleRemoveMember = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this member from the team?')) {
      await removeFromTeam(id);
    }
  };

  const handleToggleManager = async (teamMember: TeamMember) => {
    await updateTeamMember(teamMember.id, !teamMember.is_team_manager);
  };

  const handleAddMember = async (member: OrganizationMember, isManager: boolean) => {
    if (!team) return;
    
    // Check license availability before adding
    const hasLicense = await checkLicenseAvailability(organizationId);
    if (!hasLicense) {
      // If no license available, show upgrade prompt
      if (window.confirm('You have reached your license limit. Would you like to purchase additional licenses?')) {
        // Navigate to licensing page or show purchase dialog
        console.log('Navigate to purchase licenses');
      }
      return;
    }
    
    await addMemberToTeam(team.id, member.id, isManager);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Team Members: {team?.name}</DialogTitle>
            <DialogDescription>
              Manage the members of this team and their roles.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="members">Team Members</TabsTrigger>
                    <TabsTrigger value="managers">Team Managers</TabsTrigger>
                  </TabsList>
                  
                  <Button onClick={() => setIsAddMemberDialogOpen(true)}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
                
                <TabsContent value="members" className="mt-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : teamMembers.length === 0 ? (
                    <div className="text-center py-8">
                      <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No team members</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add members to this team to get started.
                      </p>
                      <div className="mt-6">
                        <Button onClick={() => setIsAddMemberDialogOpen(true)}>
                          <PlusIcon className="mr-2 h-4 w-4" /> Add Team Member
                        </Button>
                      </div>
                    </div>
                  ) : (
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
                                onCheckedChange={() => handleToggleManager(teamMember)}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveMember(teamMember.id)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>
                
                <TabsContent value="managers" className="mt-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : teamMembers.filter(m => m.is_team_manager).length === 0 ? (
                    <div className="text-center py-8">
                      <ShieldAlertIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No team managers</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Assign team managers to give them permission to manage this team.
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Manager</TableHead>
                          <TableHead>Organization Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers
                          .filter(member => member.is_team_manager)
                          .map((manager) => (
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
                                  onClick={() => handleToggleManager(manager)}
                                >
                                  Remove Manager Role
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddTeamMemberDialog 
        isOpen={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        organizationId={organizationId}
        onAddMember={handleAddMember}
        existingMemberIds={teamMembers.map(tm => tm.member_id)}
      />
    </>
  );
};

export default TeamMembersDialog;

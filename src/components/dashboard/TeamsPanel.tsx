
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import TeamsList from './teams/TeamsList';
import CreateTeamDialog from './teams/CreateTeamDialog';
import EditTeamDialog from './teams/EditTeamDialog';
import TeamMembersDialog from './teams/TeamMembersDialog';
import { useTeamsPanelState } from './teams/useTeamsPanelState';

export interface TeamsPanelProps {
  organizationId: string;
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ organizationId }) => {
  const {
    teams,
    isLoading,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedTeam,
    isMembersDialogOpen,
    isSubmitting,
    handleCreateTeam,
    handleUpdateTeam,
    handleDeleteTeam,
    openEditDialog,
    openMembersDialog,
    closeMembersDialog
  } = useTeamsPanelState(organizationId);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Teams</CardTitle>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Create Team
        </Button>
      </CardHeader>
      <CardContent>
        <TeamsList
          teams={teams}
          isLoading={isLoading}
          onEditTeam={openEditDialog}
          onDeleteTeam={handleDeleteTeam}
          onOpenMembersDialog={openMembersDialog}
          onCreateTeamClick={() => setIsCreateDialogOpen(true)}
        />

        {/* Create Team Dialog */}
        <CreateTeamDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateTeam={handleCreateTeam}
          isSubmitting={isSubmitting}
        />

        {/* Edit Team Dialog */}
        <EditTeamDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onUpdateTeam={handleUpdateTeam}
          isSubmitting={isSubmitting}
          team={selectedTeam}
        />

        {/* Team Members Dialog */}
        {selectedTeam && (
          <TeamMembersDialog
            isOpen={isMembersDialogOpen}
            onClose={closeMembersDialog}
            team={selectedTeam}
            organizationId={organizationId}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TeamsPanel;

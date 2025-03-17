
import { useState, useEffect } from 'react';
import { Team } from '@/hooks/organization/types';
import { useTeams } from '@/hooks/organization/teams/useTeams';

export const useTeamsPanelState = (organizationId: string) => {
  const { teams, isLoading, error, fetchTeams, createTeam, updateTeam, deleteTeam } = useTeams();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load teams when component mounts or organization changes
  useEffect(() => {
    if (organizationId) {
      fetchTeams(organizationId);
    }
  }, [organizationId]);

  const handleCreateTeam = async (name: string, description: string) => {
    setIsSubmitting(true);
    const result = await createTeam(name, description, organizationId);
    setIsSubmitting(false);
    
    if (result) {
      setIsCreateDialogOpen(false);
    }
  };

  const handleUpdateTeam = async (name: string, description: string) => {
    if (!selectedTeam) return;
    
    setIsSubmitting(true);
    const result = await updateTeam(selectedTeam.id, name, description);
    setIsSubmitting(false);
    
    if (result) {
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
    setIsEditDialogOpen(true);
  };

  const openMembersDialog = (team: Team) => {
    setSelectedTeam(team);
    setIsMembersDialogOpen(true);
  };

  const closeMembersDialog = () => {
    setIsMembersDialogOpen(false);
    setSelectedTeam(null);
  };

  return {
    teams,
    isLoading,
    error,
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
  };
};

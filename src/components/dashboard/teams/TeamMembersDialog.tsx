
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Team } from '@/hooks/organization/types';
import { useTeamMembers } from '@/hooks/organization/teams/useTeamMembers';
import { useLicenses } from '@/hooks/organization/licenses/useLicenses';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import TeamMembersDialogContent from './TeamMembersDialogContent';
import { OrganizationMember } from '@/types/organization';

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

  useEffect(() => {
    if (isOpen && team?.id) {
      fetchTeamMembers(team.id);
    }
  }, [isOpen, team?.id]);

  const handleRemoveMember = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this member from the team?')) {
      const success = await removeFromTeam(id);
      if (success) {
        // Local state is updated in the useTeamMembers hook
      }
    }
  };

  const handleToggleManager = async (teamMember: any) => {
    const success = await updateTeamMember(teamMember.id, !teamMember.is_team_manager);
    if (success) {
      // Local state is updated in the useTeamMembers hook
    }
  };

  const handleAddMember = async (member: OrganizationMember, isManager: boolean) => {
    if (!team) return;
    
    // Check license availability before adding
    const hasLicense = await checkLicenseAvailability(organizationId);
    if (!hasLicense) {
      // If no license available, show upgrade prompt
      if (window.confirm('You have reached your license limit. Would you like to purchase additional licenses?')) {
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
          <TeamMembersDialogContent
            team={team}
            teamMembers={teamMembers}
            isLoading={isLoading}
            onRemoveMember={handleRemoveMember}
            onToggleManager={handleToggleManager}
            onAddMemberClick={() => setIsAddMemberDialogOpen(true)}
          />
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

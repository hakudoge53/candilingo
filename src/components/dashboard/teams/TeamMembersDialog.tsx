
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Team } from '@/hooks/organization/types';
import { useTeamMembers } from '@/hooks/organization/teams/useTeamMembers';
import { useLicenses } from '@/hooks/organization/licenses/useLicenses';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import TeamMembersDialogContent from './TeamMembersDialogContent';
import { OrganizationMember } from '@/types/organization';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

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

  const { 
    licenses, 
    checkLicenseAvailability, 
    fetchLicenses 
  } = useLicenses();
  
  const { redirectToCheckout } = useStripeCheckout();
  
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [showPurchaseLicenseDialog, setShowPurchaseLicenseDialog] = useState(false);

  useEffect(() => {
    if (isOpen && team?.id) {
      fetchTeamMembers(team.id);
      if (organizationId) {
        fetchLicenses(organizationId);
      }
    }
  }, [isOpen, team?.id, organizationId]);

  const handleRemoveMember = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this member from the team?')) {
      const success = await removeFromTeam(id);
      if (success) {
        // Local state is updated in the useTeamMembers hook
        toast.success("Team member removed successfully");
      }
    }
  };

  const handleToggleManager = async (teamMember: any) => {
    const success = await updateTeamMember(teamMember.id, !teamMember.is_team_manager);
    if (success) {
      // Local state is updated in the useTeamMembers hook
      toast.success(
        teamMember.is_team_manager 
          ? "Manager role removed" 
          : "Manager role assigned"
      );
    }
  };

  const handleAddMember = async (member: OrganizationMember, isManager: boolean) => {
    if (!team) return;
    
    // Check license availability before adding
    const hasLicense = await checkLicenseAvailability(organizationId);
    if (!hasLicense) {
      // If no license available, show upgrade prompt
      setShowPurchaseLicenseDialog(true);
      return;
    }
    
    const success = await addMemberToTeam(team.id, member.id, isManager);
    if (success) {
      toast.success(`${member.user?.name || 'Member'} added to team`);
      setIsAddMemberDialogOpen(false);
    }
  };
  
  const handlePurchaseLicenses = async () => {
    try {
      await redirectToCheckout({
        priceId: 'price_1R15yGLRETKD7zlDSrCkpFFt', // Pro plan price ID
        productName: 'Candilingo Licenses',
        customPrice: 10, // $10 per license
        cancelUrl: window.location.href
      });
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("Failed to initiate license purchase");
    }
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
      
      <Dialog open={showPurchaseLicenseDialog} onOpenChange={setShowPurchaseLicenseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>License Limit Reached</DialogTitle>
            <DialogDescription>
              You have reached your license limit. To add more members, you need to purchase additional licenses.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-4">
              Each license costs $10/month and allows you to add one member to your organization.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPurchaseLicenseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchaseLicenses}>
              Purchase Licenses
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamMembersDialog;

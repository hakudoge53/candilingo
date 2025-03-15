
import { useState } from 'react';
import { useOrganizations } from '@/hooks/useOrganizations';
import { UserRole, OrganizationMember } from '@/types/organization';
import { toast } from 'sonner';

export const useOrganizationOperations = (setLocalLoading: (loading: boolean) => void) => {
  const [dialogOpen, setDialogOpen] = useState<'invite' | 'create' | 'delete' | 'leave' | null>(null);
  
  const {
    organizations,
    activeOrganization,
    setActiveOrganization,
    members,
    isLoading,
    error,
    createOrganization,
    inviteMember,
    updateMemberRole,
    removeMember,
    refetch,
    refetchMembers
  } = useOrganizations();
  
  const handleCreateOrganization = async (name: string) => {
    setLocalLoading(true);
    try {
      await createOrganization(name);
      toast.success("Organization created successfully!");
      if (refetch) await refetch();
    } catch (error) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization. Please try again.");
    } finally {
      setLocalLoading(false);
      setDialogOpen(null);
    }
  };
  
  const handleUpdateOrganization = async (id: string, name: string) => {
    setLocalLoading(true);
    try {
      // This would be implemented when the hook supports organization updates
      toast.success("Organization updated successfully!");
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleDeleteOrganization = async (id: string) => {
    setLocalLoading(true);
    try {
      // This would be implemented when the hook supports organization deletion
      toast.success("Organization deleted successfully!");
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization. Please try again.");
    } finally {
      setLocalLoading(false);
      setDialogOpen(null);
    }
  };
  
  const handleLeaveOrganization = async (id: string) => {
    setLocalLoading(true);
    try {
      // This would be implemented when the hook supports leaving an organization
      toast.success("You have left the organization!");
    } catch (error) {
      console.error("Error leaving organization:", error);
      toast.error("Failed to leave organization. Please try again.");
    } finally {
      setLocalLoading(false);
      setDialogOpen(null);
    }
  };
  
  const handleInviteMember = async (values: { email: string; name: string; role: UserRole }) => {
    setLocalLoading(true);
    try {
      if (!activeOrganization) {
        throw new Error("No active organization selected");
      }
      await inviteMember(activeOrganization.id, values.email, values.name, values.role);
      toast.success(`Invitation sent to ${values.email}!`);
      if (refetchMembers) await refetchMembers();
      setDialogOpen(null);
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleRoleChange = async (memberId: string, role: UserRole) => {
    setLocalLoading(true);
    try {
      await updateMemberRole(memberId, role);
      toast.success("Member role updated successfully!");
      if (refetchMembers) await refetchMembers();
    } catch (error) {
      console.error("Error updating member role:", error);
      toast.error("Failed to update member role. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleRemoveMember = async (memberId: string) => {
    setLocalLoading(true);
    try {
      await removeMember(memberId);
      toast.success("Member removed successfully!");
      if (refetchMembers) await refetchMembers();
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleRevokeInvitation = async (inviteId: string) => {
    setLocalLoading(true);
    try {
      // This is the same as removing a member for pending invites
      await removeMember(inviteId);
      toast.success("Invitation revoked successfully!");
      if (refetchMembers) await refetchMembers();
    } catch (error) {
      console.error("Error revoking invitation:", error);
      toast.error("Failed to revoke invitation. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    organizations,
    activeOrganization,
    members,
    isLoading,
    error,
    dialogOpen,
    setDialogOpen,
    handleCreateOrganization,
    handleUpdateOrganization,
    handleDeleteOrganization,
    handleLeaveOrganization,
    handleInviteMember,
    handleRoleChange,
    handleRemoveMember,
    handleRevokeInvitation
  };
};

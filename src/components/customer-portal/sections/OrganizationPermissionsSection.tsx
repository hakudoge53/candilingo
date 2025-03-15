
import React, { useState, useEffect } from 'react';
import { useOrganizations } from '@/hooks/useOrganizations';
import { User } from '@/hooks/auth/types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MembersList from './organization/MembersList';
import InvitesList from './organization/InvitesList';
import NoOrganizationCard from './organization/NoOrganizationCard';
import OrganizationCard from './organization/OrganizationCard';
import { OrganizationMember, UserRole } from '@/types/organization';

interface OrganizationPermissionsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const OrganizationPermissionsSection: React.FC<OrganizationPermissionsSectionProps> = ({
  user,
  setLocalLoading
}) => {
  const [activeTab, setActiveTab] = useState('members');
  const [dialogOpen, setDialogOpen] = useState<'invite' | 'create' | 'delete' | 'leave' | null>(null);
  
  const {
    organizations,
    activeOrganization,
    setActiveOrganization,
    organizationMembers,
    isLoading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    leaveOrganization,
    inviteMember,
    updateMemberRole,
    removeMember,
    revokeInvitation,
    fetchOrganizations
  } = useOrganizations(user.id);
  
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);
  
  const handleCreateOrganization = async (name: string) => {
    setLocalLoading(true);
    try {
      await createOrganization(name);
      toast.success("Organization created successfully!");
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
      await updateOrganization(id, name);
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
      await deleteOrganization(id);
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
      await leaveOrganization(id);
      toast.success("You have left the organization!");
    } catch (error) {
      console.error("Error leaving organization:", error);
      toast.error("Failed to leave organization. Please try again.");
    } finally {
      setLocalLoading(false);
      setDialogOpen(null);
    }
  };
  
  const handleInviteMember = async (organizationId: string, email: string, name: string, role: UserRole) => {
    setLocalLoading(true);
    try {
      await inviteMember(organizationId, email, name, role);
      toast.success(`Invitation sent to ${email}!`);
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
      await revokeInvitation(inviteId);
      toast.success("Invitation revoked successfully!");
    } catch (error) {
      console.error("Error revoking invitation:", error);
      toast.error("Failed to revoke invitation. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };
  
  // Sort members into active members and pending invitations
  const activeMembers = organizationMembers.filter(m => m.status === 'active');
  const pendingInvites = organizationMembers.filter(m => m.status === 'pending');
  
  // Determine if current user is admin or owner
  const currentUserRole = activeMembers.find(m => m.user_id === user.id)?.role;
  const isAdmin = currentUserRole === 'super_admin' || currentUserRole === 'owner' || currentUserRole === 'manager';
  
  if (isLoading) {
    return <div className="text-center py-8">Loading organization data...</div>;
  }
  
  if (!activeOrganization) {
    return (
      <NoOrganizationCard
        organizations={organizations}
        setActiveOrganization={setActiveOrganization}
        onCreateOrganization={handleCreateOrganization}
        isLoading={isLoading}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <OrganizationCard
        organization={activeOrganization}
        isAdmin={isAdmin}
        onUpdateOrganization={handleUpdateOrganization}
        onDeleteOrganization={handleDeleteOrganization}
        onLeaveOrganization={handleLeaveOrganization}
        onInviteMember={(email, name, role) => 
          handleInviteMember(activeOrganization.id, email, name, role)
        }
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="members">Members ({activeMembers.length})</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites ({pendingInvites.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <MembersList
            members={activeMembers}
            isAdmin={isAdmin}
            currentUserId={user.id}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
          />
        </TabsContent>
        
        <TabsContent value="invites">
          <InvitesList
            invites={pendingInvites}
            isAdmin={isAdmin}
            onRevokeInvitation={handleRevokeInvitation}
          />
        </TabsContent>
      </Tabs>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default OrganizationPermissionsSection;


import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { OrganizationMember, UserRole } from '@/types/organization';
import { Organization } from '@/types/organization';
import { OrganizationInvitation } from './types';

interface UseOrganizationActionsProps {
  organization: Organization | null;
  setMembers: React.Dispatch<React.SetStateAction<OrganizationMember[]>>;
  setInvites: React.Dispatch<React.SetStateAction<OrganizationInvitation[]>>;
}

export const useOrganizationActions = ({ 
  organization, 
  setMembers, 
  setInvites 
}: UseOrganizationActionsProps) => {
  const [isDeletingOrg, setIsDeletingOrg] = useState(false);
  const [isRemovingMember, setIsRemovingMember] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [isRevokingInvite, setIsRevokingInvite] = useState(false);
  const [isSubmittingInvite, setIsSubmittingInvite] = useState(false);

  const handleInviteMember = async (values: { email: string; name: string; role: UserRole }) => {
    if (!organization) return;
    
    setIsSubmittingInvite(true);
    try {
      // Cast role to any to work around type checking
      const { data, error } = await supabase
        .from('organization_members')
        .insert({
          organization_id: organization.id,
          invited_email: values.email,
          invited_name: values.name,
          role: values.role as any,
          status: 'pending',
          user_id: '00000000-0000-0000-0000-000000000000' // Placeholder for pending invites
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Invitation sent successfully");
      setInvites(prev => [...prev, data as unknown as OrganizationInvitation]);
      return data;
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Failed to send invitation");
      return null;
    } finally {
      setIsSubmittingInvite(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    setIsRevokingInvite(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', inviteId);
        
      if (error) throw error;
      
      toast.success("Invitation revoked successfully");
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
    } catch (error) {
      console.error("Error revoking invite:", error);
      toast.error("Failed to revoke invite");
    } finally {
      setIsRevokingInvite(false);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: UserRole) => {
    setIsChangingRole(true);
    try {
      // Cast role to any to work around type checking
      const { data, error } = await supabase
        .from('organization_members')
        .update({ role: newRole as any })
        .eq('id', memberId)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Member role updated successfully");
      setMembers(members => 
        members.map(member => 
          member.id === memberId ? {...member, role: newRole} : member
        )
      );
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change role");
    } finally {
      setIsChangingRole(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    setIsRemovingMember(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
        
      if (error) throw error;
      
      toast.success("Member removed successfully");
      setMembers(members => members.filter(member => member.id !== memberId));
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
    } finally {
      setIsRemovingMember(false);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!organization) return;
    
    setIsDeletingOrg(true);
    try {
      const { error: membersError } = await supabase
        .from('organization_members')
        .delete()
        .eq('organization_id', organization.id);
        
      if (membersError) throw membersError;
      
      const { error: orgError } = await supabase
        .from('organizations')
        .delete()
        .eq('id', organization.id);
        
      if (orgError) throw orgError;
      
      toast.success("Organization deleted successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
    } finally {
      setIsDeletingOrg(false);
    }
  };

  return {
    handleInviteMember,
    handleRevokeInvite,
    handleChangeRole,
    handleRemoveMember,
    handleDeleteOrganization,
    isDeletingOrg,
    isRemovingMember,
    isChangingRole,
    isRevokingInvite,
    isSubmittingInvite
  };
};

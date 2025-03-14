
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OrganizationMember, UserRole } from '@/types/organization';
import { useAuth } from '../useAuth';

export const useOrganizationMembers = (organizationId: string | undefined) => {
  const { isLoggedIn, activeUser } = useAuth();
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch members for organization
  const fetchMembers = async () => {
    if (!isLoggedIn || !organizationId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First, get active members with profile information
      const { data: activeMembers, error: activeMembersError } = await supabase
        .from('organization_members')
        .select(`
          id,
          organization_id,
          user_id,
          role,
          status,
          created_at,
          updated_at,
          profiles:user_id (name, email, membership_tier, status)
        `)
        .eq('organization_id', organizationId)
        .eq('status', 'active');
      
      if (activeMembersError) throw activeMembersError;
      
      // Then get pending members (invited but not joined)
      const { data: pendingMembers, error: pendingMembersError } = await supabase
        .from('organization_members')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('status', 'pending');
      
      if (pendingMembersError) throw pendingMembersError;
      
      // Transform active members data
      const formattedActiveMembers = activeMembers.map(member => ({
        ...member,
        user: {
          name: member.profiles?.name,
          email: member.profiles?.email,
          membership_tier: member.profiles?.membership_tier,
          status: member.profiles?.status
        },
        // These properties are not used for active members
        invited_name: null,
        invited_email: null,
        invitation_token: null
      })) as OrganizationMember[];
      
      // Combine the lists
      setMembers([...formattedActiveMembers, ...pendingMembers]);
    } catch (error: any) {
      console.error("Error fetching members:", error);
      setError(error.message);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  // Invite a new member to organization
  const inviteMember = async (email: string, name: string, role: UserRole) => {
    if (!isLoggedIn || !organizationId) return null;
    
    setIsLoading(true);
    
    try {
      // Generate a random token for the invitation
      const token = Math.random().toString(36).substring(2, 15);
      
      const { data, error } = await supabase
        .from('organization_members')
        .insert({
          organization_id: organizationId,
          user_id: '00000000-0000-0000-0000-000000000000', // Placeholder until user accepts invitation
          invited_email: email,
          invited_name: name,
          role,
          invitation_token: token,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setMembers(prev => [data as OrganizationMember, ...prev]);
      
      toast.success("Invitation sent successfully");
      return data as OrganizationMember;
    } catch (error: any) {
      console.error("Error inviting member:", error);
      toast.error("Failed to send invitation");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update member's role
  const updateMemberRole = async (memberId: string, role: UserRole) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ role })
        .eq('id', memberId);
      
      if (error) throw error;
      
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, role } : member
        )
      );
      
      toast.success("Member role updated");
    } catch (error: any) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member role");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove member from organization
  const removeMember = async (memberId: string) => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
      setMembers(prev => prev.filter(member => member.id !== memberId));
      
      toast.success("Member removed successfully");
    } catch (error: any) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
    } finally {
      setIsLoading(false);
    }
  };

  // Load members when organization changes
  useEffect(() => {
    if (organizationId) {
      fetchMembers();
    } else {
      setMembers([]);
    }
  }, [organizationId]);

  return {
    members,
    inviteMember,
    updateMemberRole,
    removeMember,
    isLoading,
    error,
    refetchMembers: fetchMembers
  };
};

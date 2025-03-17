
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { OrganizationMember, UserRole } from '@/types/organization';
import { toast } from 'sonner';

export interface UseOrganizationMembersReturn {
  members: OrganizationMember[];
  inviteMember: (email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetchMembers: () => void;
}

export const useOrganizationMembers = (organizationId: string | undefined): UseOrganizationMembersReturn => {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch organization members
  const fetchMembers = async () => {
    if (!organizationId) {
      setMembers([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(name, email, status, membership_tier, avatar_url)
        `)
        .eq('organization_id', organizationId);
      
      if (error) throw error;
      
      // Transform data to match expected format
      const transformedData: OrganizationMember[] = data.map(item => ({
        id: item.id,
        organization_id: item.organization_id,
        user_id: item.user_id,
        role: item.role as UserRole,
        status: item.status,
        invited_email: item.invited_email,
        invited_name: item.invited_name,
        invitation_token: item.invitation_token,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user: item.user || (item.invited_email ? {
          name: item.invited_name || '',
          email: item.invited_email,
        } : null)
      }));
      
      setMembers(transformedData);
    } catch (error: any) {
      console.error("Error fetching organization members:", error);
      setError(error.message);
      toast.error("Failed to load organization members");
    } finally {
      setIsLoading(false);
    }
  };

  // Invite a new member
  const inviteMember = async (email: string, name: string, role: UserRole): Promise<OrganizationMember | null> => {
    if (!organizationId) return null;
    
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .insert({
          organization_id: organizationId,
          user_id: '00000000-0000-0000-0000-000000000000', // Placeholder for pending invites
          invited_email: email,
          invited_name: name,
          role,
          status: 'pending',
          invitation_token: `inv_${Math.random().toString(36).substring(2, 15)}` // Simple token generation
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Add the new member to the local state
      const newMember: OrganizationMember = {
        ...data,
        role: data.role as UserRole,
        user: {
          name: name,
          email: email,
        }
      };
      
      setMembers(prev => [...prev, newMember]);
      toast.success(`Invitation sent to ${email}`);
      
      return newMember;
    } catch (error: any) {
      console.error("Error inviting member:", error);
      toast.error("Failed to invite member");
      return null;
    }
  };

  // Update a member's role
  const updateMemberRole = async (memberId: string, role: UserRole): Promise<void> => {
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ role })
        .eq('id', memberId);
      
      if (error) throw error;
      
      // Update the member in the local state
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, role } : member
        )
      );
      
      toast.success("Member role updated successfully");
    } catch (error: any) {
      console.error("Error updating member role:", error);
      toast.error("Failed to update member role");
      throw error;
    }
  };

  // Remove a member
  const removeMember = async (memberId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
      // Remove the member from the local state
      setMembers(prev => prev.filter(member => member.id !== memberId));
      
      toast.success("Member removed successfully");
    } catch (error: any) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
      throw error;
    }
  };

  // Fetch members when organization ID changes
  useEffect(() => {
    fetchMembers();
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

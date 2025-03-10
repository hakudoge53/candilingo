
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Organization, OrganizationMember, UserRole } from '@/types/organization';
import { useAuth } from './useAuth';

export const useOrganizations = () => {
  const { isLoggedIn, activeUser } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's organizations
  const fetchOrganizations = async () => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setOrganizations(data);
      
      // Set active organization to first one by default if none is selected
      if (data.length > 0 && !activeOrganization) {
        setActiveOrganization(data[0]);
      }
    } catch (error: any) {
      console.error("Error fetching organizations:", error);
      setError(error.message);
      toast.error("Failed to load organizations");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new organization
  const createOrganization = async (name: string) => {
    if (!isLoggedIn) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert([{ name, created_by: activeUser?.id }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Also create a membership record for the creator as admin
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: data.id,
          user_id: activeUser?.id,
          role: 'admin',
          status: 'active'
        }]);
      
      if (memberError) throw memberError;
      
      setOrganizations(prev => [data, ...prev]);
      setActiveOrganization(data);
      
      toast.success("Organization created successfully");
      return data;
    } catch (error: any) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch members for active organization
  const fetchMembers = async (organizationId: string) => {
    if (!isLoggedIn || !organizationId) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(*)
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform data to match our types
      const formattedMembers = data.map(member => ({
        ...member,
        user: member.user ? {
          name: member.user.name,
          email: member.user.email,
          membership_tier: member.user.membership_tier,
          status: member.user.status
        } : undefined
      }));
      
      setMembers(formattedMembers);
    } catch (error: any) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  // Invite a new member to organization
  const inviteMember = async (organizationId: string, email: string, name: string, role: UserRole) => {
    if (!isLoggedIn || !organizationId) return null;
    
    setIsLoading(true);
    
    try {
      // Generate a random token for the invitation
      const token = Math.random().toString(36).substring(2, 15);
      
      const { data, error } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: organizationId,
          invited_email: email,
          invited_name: name,
          role,
          invitation_token: token
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      setMembers(prev => [data, ...prev]);
      
      toast.success("Invitation sent successfully");
      return data;
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

  // Load organizations when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrganizations();
    } else {
      setOrganizations([]);
      setActiveOrganization(null);
      setMembers([]);
    }
  }, [isLoggedIn]);

  // Load members when active organization changes
  useEffect(() => {
    if (activeOrganization) {
      fetchMembers(activeOrganization.id);
    } else {
      setMembers([]);
    }
  }, [activeOrganization]);

  return {
    organizations,
    activeOrganization,
    setActiveOrganization,
    members,
    createOrganization,
    inviteMember,
    updateMemberRole,
    removeMember,
    isLoading,
    error,
    refetch: fetchOrganizations,
    refetchMembers: () => activeOrganization && fetchMembers(activeOrganization.id)
  };
};

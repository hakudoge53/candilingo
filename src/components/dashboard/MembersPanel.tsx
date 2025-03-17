
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, LicenseIcon, AlertCircleIcon } from 'lucide-react';
import { OrganizationMember, UserRole } from '@/types/organization';
import { useAuth } from '@/hooks/auth/useAuth';
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import InviteMemberDialog from './members/InviteMemberDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useLicenses } from '@/hooks/organization/licenses/useLicenses';
import { toast } from 'sonner';

export interface MembersPanelProps {
  organizationId: string;
}

const MembersPanel: React.FC<MembersPanelProps> = ({ organizationId }) => {
  const { user } = useAuth();
  const { licenses, fetchLicenses, checkLicenseAvailability } = useLicenses();
  
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [invites, setInvites] = useState<OrganizationMember[]>([]);
  const [activeTab, setActiveTab] = useState('members');
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [isRemovingMember, setIsRemovingMember] = useState(false);
  const [showLicensePrompt, setShowLicensePrompt] = useState(false);

  // Check if user is admin or manager
  const isAdmin = user && members.some(member => 
    member.user_id === user.id && 
    (member.role === 'admin' || member.role === 'manager')
  );

  useEffect(() => {
    if (organizationId) {
      fetchMembers();
      fetchLicenses(organizationId);
    }
  }, [organizationId]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      // Fetch all members for the organization
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(id, name, email, avatar_url)
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Separate active members and pending invitations
      const activeMembers = data.filter(member => member.status === 'active');
      const pendingInvites = data.filter(member => member.status === 'pending');
      
      setMembers(activeMembers);
      setInvites(pendingInvites);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast.error('Failed to load organization members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: UserRole) => {
    setIsChangingRole(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ role: newRole as any })
        .eq('id', memberId);

      if (error) throw error;

      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, role: newRole } : member
        )
      );
      
      toast.success(`Role updated successfully`);
    } catch (error) {
      console.error('Error changing role:', error);
      toast.error('Failed to update role');
    } finally {
      setIsChangingRole(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    
    setIsRemovingMember(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      // Update licenses if needed
      await updateLicenseCount(false);
      
      setMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove member');
    } finally {
      setIsRemovingMember(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    if (!confirm('Are you sure you want to revoke this invitation?')) return;
    
    setIsRevoking(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', inviteId);

      if (error) throw error;

      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
      toast.success('Invitation revoked successfully');
    } catch (error) {
      console.error('Error revoking invitation:', error);
      toast.error('Failed to revoke invitation');
    } finally {
      setIsRevoking(false);
    }
  };

  const handleInviteMember = async (email: string, name: string, role: UserRole) => {
    // Check if there's a license available
    const hasLicense = await checkLicenseAvailability(organizationId);
    
    if (!hasLicense) {
      setShowLicensePrompt(true);
      return false;
    }
    
    try {
      // Generate a unique invitation token
      const invitationToken = `inv_${Math.random().toString(36).substring(2, 15)}`;
      
      const { data, error } = await supabase
        .from('organization_members')
        .insert([{
          organization_id: organizationId,
          user_id: '00000000-0000-0000-0000-000000000000', // Placeholder for pending invites
          invited_email: email,
          invited_name: name,
          role: role as any,
          status: 'pending',
          invitation_token: invitationToken
        }])
        .select()
        .single();

      if (error) throw error;

      // Update the UI to show the new invitation
      const newInvite = {
        ...data,
        user: {
          name: name,
          email: email
        }
      };
      
      setInvites(prev => [newInvite, ...prev]);
      setIsInviteDialogOpen(false);
      
      toast.success(`Invitation sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error inviting member:', error);
      toast.error('Failed to send invitation');
      return false;
    }
  };

  const updateLicenseCount = async (increment: boolean) => {
    if (!licenses || licenses.length === 0) return;
    
    try {
      // Just update the standard license for now
      const standardLicense = licenses.find(l => l.license_type === 'standard');
      if (!standardLicense) return;
      
      const newCount = increment
        ? standardLicense.used_licenses + 1
        : Math.max(0, standardLicense.used_licenses - 1);
      
      await supabase
        .from('organization_licenses')
        .update({ used_licenses: newCount })
        .eq('id', standardLicense.id);
        
      // Refetch licenses to update the UI
      fetchLicenses(organizationId);
    } catch (error) {
      console.error('Error updating license count:', error);
    }
  };

  const handleBuyLicenses = () => {
    // Close the prompt
    setShowLicensePrompt(false);
    
    // Navigate to licenses tab or open licenses dialog
    // For now, we'll just show a toast
    toast.info('Redirecting to purchase additional licenses...');
    // In a real implementation, you would navigate to a purchase page or open a purchase dialog
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organization Members</CardTitle>
        {isAdmin && (
          <Button onClick={() => setIsInviteDialogOpen(true)} size="sm">
            <PlusIcon className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="members">Active Members ({members.length})</TabsTrigger>
            <TabsTrigger value="invites">Pending Invites ({invites.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <ActiveMembersTable 
              members={members} 
              isLoading={isLoading}
              onRoleChange={handleChangeRole}
              onRemoveMember={handleRemoveMember}
            />
          </TabsContent>
          
          <TabsContent value="invites">
            <PendingInvitationsTable 
              invites={invites} 
              isLoading={isLoading}
              onRevokeInvite={handleRevokeInvite}
            />
          </TabsContent>
        </Tabs>
        
        <InviteMemberDialog 
          isOpen={isInviteDialogOpen} 
          onClose={() => setIsInviteDialogOpen(false)} 
          onSuccess={handleInviteMember} 
          organizationId={organizationId}
        />
        
        {/* License Limit Dialog */}
        <Dialog open={showLicensePrompt} onOpenChange={setShowLicensePrompt}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <LicenseIcon className="mr-2 h-5 w-5 text-amber-500" />
                License Limit Reached
              </DialogTitle>
              <DialogDescription>
                You've reached your license limit. To invite more members, you need to purchase additional licenses.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800 text-sm">
              <div className="flex items-start">
                <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Why do I need more licenses?</p>
                  <p className="mt-1">Each active member in your organization requires a license. Adding more licenses allows you to invite additional team members.</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLicensePrompt(false)}>
                Cancel
              </Button>
              <Button onClick={handleBuyLicenses}>
                Purchase Licenses
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MembersPanel;


import React, { useEffect, useState, forwardRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, FileText, ShieldAlert, ShieldCheck, CircleCheck, Mail, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Organization, OrganizationMember, UserRole, MemberStatus, ROLE_LABELS } from '@/types/organization';
import InviteMemberDialog from "./members/InviteMemberDialog";
import ActiveMembersTable from './members/ActiveMembersTable';
import PendingInvitationsTable from './members/PendingInvitationsTable';
import EmptyMembersState from './members/EmptyMembersState';
import { SelectQueryError, UserData } from '@/hooks/organization/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Create a custom LicenseIcon component since it's not available in lucide-react
const LicenseIcon = forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<"svg">>((props, ref) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="24" 
      height="24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
  );
});

LicenseIcon.displayName = "LicenseIcon";

const MembersPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<OrganizationMember[]>([]);
  const { activeOrganization } = useOrganizations();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeOrganization?.id) {
      fetchOrganizationMembers(activeOrganization.id);
    }
  }, [activeOrganization]);

  const fetchOrganizationMembers = async (organizationId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          user:profiles(id, name, email, avatar_url)
        `)
        .eq('organization_id', organizationId);

      if (error) throw error;

      // Transform data to ensure it matches OrganizationMember type
      const transformedMembers = data.map(item => {
        // Handle case when user is present but might be an error
        let userObject: UserData | SelectQueryError | null = item.user;
        
        // If user is an error or null, create a fallback user object
        if (!userObject || (typeof userObject === 'object' && 'error' in userObject)) {
          userObject = {
            name: item.invited_name || 'Unknown',
            email: item.invited_email || 'No email',
            avatar_url: null
          } as UserData;
        }

        // Create a properly typed member object
        const memberWithUserData = {
          ...item,
          status: item.status as MemberStatus,
          role: item.role as UserRole,
          user: userObject as UserData
        } as OrganizationMember;
        
        return memberWithUserData;
      });

      // Split into active members and pending invites
      setMembers(transformedMembers.filter(m => m.status === 'active'));
      setPendingInvites(transformedMembers.filter(m => m.status === 'pending'));
    } catch (err: any) {
      console.error('Error fetching organization members:', err);
      toast.error('Failed to load members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMember = async (email: string, name: string, role: UserRole) => {
    if (!activeOrganization) {
      toast.error('No active organization');
      return false;
    }

    setIsLoading(true);
    try {
      // Cast role to any to work around type checking
      const { data, error } = await supabase
        .from('organization_members')
        .insert({
          organization_id: activeOrganization.id,
          invited_email: email,
          invited_name: name,
          role: role as any,
          status: 'pending',
          user_id: '00000000-0000-0000-0000-000000000000' // Placeholder for pending invites
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Create a safe object with proper typing
      const newInvite: OrganizationMember = {
        ...data,
        status: 'pending' as MemberStatus,
        role: data.role as UserRole,
        user: {
          name: data.invited_name || name,
          email: data.invited_email || email,
          avatar_url: null
        }
      };
      
      setPendingInvites(prev => [...prev, newInvite]);
      
      toast.success("Invitation sent successfully");
      setInviteDialogOpen(false);
      return true;
    } catch (err: any) {
      console.error("Error inviting member:", err);
      toast.error("Failed to send invitation");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    if (!activeOrganization) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', inviteId);
        
      if (error) throw error;
      
      setPendingInvites(prev => prev.filter(invite => invite.id !== inviteId));
      toast.success("Invitation revoked successfully");
    } catch (err: any) {
      console.error("Error revoking invite:", err);
      toast.error("Failed to revoke invitation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: UserRole) => {
    if (!activeOrganization) return;
    
    setIsLoading(true);
    try {
      // Cast role to any to work around type checking
      const { error } = await supabase
        .from('organization_members')
        .update({ role: newRole as any })
        .eq('id', memberId);
        
      if (error) throw error;
      
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? {...member, role: newRole} : member
        )
      );
      
      toast.success("Member role updated successfully");
    } catch (err: any) {
      console.error("Error changing role:", err);
      toast.error("Failed to change role");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!activeOrganization) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
        
      if (error) throw error;
      
      setMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success("Member removed successfully");
    } catch (err: any) {
      console.error("Error removing member:", err);
      toast.error("Failed to remove member");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a transform function for the pending invites to match the expected type
  const transformInviteForTable = (invites: OrganizationMember[]): { 
    id: string; 
    invited_email: string; 
    invited_name: string; 
    role: string; 
    created_at: string; 
  }[] => {
    return invites.map(invite => ({
      id: invite.id,
      invited_email: invite.invited_email || invite.user?.email || '',
      invited_name: invite.invited_name || invite.user?.name || '',
      role: ROLE_LABELS[invite.role] || invite.role,
      created_at: invite.created_at || new Date().toISOString()
    }));
  };

  // Modified the onInvite handler to match the expected signature
  const handleNewInvite = (newInvite: any) => {
    handleInviteMember(newInvite.email, newInvite.name, newInvite.role);
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Members & Permissions</CardTitle>
            <CardDescription>
              Manage your organization members and their permissions
            </CardDescription>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Invite Member</span>
              </Button>
            </DialogTrigger>
            <InviteMemberDialog
              onInvite={handleNewInvite}
              onClose={() => setInviteDialogOpen(false)}
              isSubmitting={isLoading}
            />
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Active Members ({members.length})</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Pending Invitations ({pendingInvites.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="pt-2">
            {members.length === 0 ? (
              <EmptyMembersState
                title="No members yet"
                description="Invite members to your organization to collaborate."
                icon={<Users className="h-12 w-12 text-gray-400" />}
              />
            ) : (
              <ActiveMembersTable
                members={members}
                onRoleChange={handleChangeRole}
                onRemove={handleRemoveMember}
                isLoading={isLoading}
              />
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="pt-2">
            {pendingInvites.length === 0 ? (
              <EmptyMembersState
                title="No pending invitations"
                description="Invite members to your organization to collaborate."
                icon={<Mail className="h-12 w-12 text-gray-400" />}
              />
            ) : (
              <PendingInvitationsTable
                invites={transformInviteForTable(pendingInvites)}
                onRevoke={handleRevokeInvite}
                isLoading={isLoading}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MembersPanel;

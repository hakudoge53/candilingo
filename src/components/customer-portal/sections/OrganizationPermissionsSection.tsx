
import React, { useState, useEffect } from 'react';
import { User } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { OrganizationMember, Organization, UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/types/organization';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, UserPlus, Check, X, AlertTriangle, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface OrganizationPermissionsSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

interface InviteFormValues {
  email: string;
  name: string;
  role: UserRole;
}

interface OrganizationInvitation {
  id: string;
  organization_id: string;
  invited_email: string;
  invited_name: string | null;
  role: UserRole;
  status: string;
  created_at: string;
}

const OrganizationPermissionsSection: React.FC<OrganizationPermissionsSectionProps> = ({ user, setLocalLoading }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeletingOrg, setIsDeletingOrg] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isRemovingMember, setIsRemovingMember] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<OrganizationMember | null>(null);
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [memberToChangeRole, setMemberToChangeRole] = useState<OrganizationMember | null>(null);
  const [isRoleChangeConfirmationOpen, setIsRoleChangeConfirmationOpen] = useState(false);
  const [newRole, setNewRole] = useState<UserRole>('employee');
  const [isRevokingInvite, setIsRevokingInvite] = useState(false);
  const [inviteToRevoke, setInviteToRevoke] = useState<string | null>(null);
  const [isRevokeConfirmationOpen, setIsRevokeConfirmationOpen] = useState(false);
  const [invites, setInvites] = useState<OrganizationInvitation[]>([]);

  const inviteForm = useForm<InviteFormValues>({
    defaultValues: {
      email: '',
      name: '',
      role: 'employee'
    }
  });

  // Fetch organization and members
  useEffect(() => {
    const fetchOrganizationData = async () => {
      setIsLoading(true);
      try {
        // Get the organization this user belongs to
        const { data: memberships, error: membershipError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', user.id)
          .single();
          
        if (membershipError) throw membershipError;
        
        if (!memberships) {
          toast.error("You are not part of any organization");
          return;
        }
        
        const organizationId = memberships.organization_id;
        
        // Fetch organization details
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', organizationId)
          .single();
          
        if (orgError) throw orgError;
        setOrganization(orgData);
        
        // Fetch organization members
        const { data: membersData, error: membersError } = await supabase
          .from('organization_members')
          .select('*, user:profiles(name, email, membership_tier, status)')
          .eq('organization_id', organizationId);
          
        if (membersError) throw membersError;
        setMembers(membersData || []);

        // Since organization_invitations table doesn't exist in the database schema
        // we'll use the organization_members table with status='pending' instead
        const { data: invitesData, error: invitesError } = await supabase
          .from('organization_members')
          .select('id, organization_id, invited_email, invited_name, role, status, created_at')
          .eq('organization_id', organizationId)
          .eq('status', 'pending');
          
        if (invitesError) throw invitesError;
        setInvites(invitesData as OrganizationInvitation[] || []);
      } catch (error) {
        console.error("Error fetching organization data:", error);
        toast.error("Failed to load organization data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizationData();
  }, [user.id]);

  // Invite new member
  const handleInviteMember = async (values: InviteFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .insert({
          organization_id: organization?.id,
          invited_email: values.email,
          invited_name: values.name,
          role: values.role,
          status: 'pending',
          user_id: '00000000-0000-0000-0000-000000000000' // Placeholder for pending invites
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Invitation sent successfully");
      setInvites([...invites, data as unknown as OrganizationInvitation]);
      setIsInviteDialogOpen(false);
      inviteForm.reset();
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  // Revoke invitation
  const handleRevokeInvite = async () => {
    if (!inviteToRevoke) return;
    
    setIsRevokingInvite(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', inviteToRevoke);
        
      if (error) throw error;
      
      toast.success("Invitation revoked successfully");
      setInvites(invites.filter(invite => invite.id !== inviteToRevoke));
    } catch (error) {
      console.error("Error revoking invite:", error);
      toast.error("Failed to revoke invite");
    } finally {
      setIsRevokingInvite(false);
      setIsRevokeConfirmationOpen(false);
      setInviteToRevoke(null);
    }
  };

  // Change member role
  const handleChangeRole = async () => {
    if (!memberToChangeRole) return;
    
    setIsChangingRole(true);
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .update({ role: newRole })
        .eq('id', memberToChangeRole.id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Member role updated successfully");
      setMembers(members.map(member => 
        member.id === memberToChangeRole.id ? {...member, role: newRole} : member
      ));
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change role");
    } finally {
      setIsChangingRole(false);
      setIsRoleChangeConfirmationOpen(false);
      setMemberToChangeRole(null);
    }
  };

  // Remove member
  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
    
    setIsRemovingMember(true);
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberToRemove.id);
        
      if (error) throw error;
      
      toast.success("Member removed successfully");
      setMembers(members.filter(member => member.id !== memberToRemove.id));
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
    } finally {
      setIsRemovingMember(false);
      setIsRemoveConfirmationOpen(false);
      setMemberToRemove(null);
    }
  };

  // Delete organization
  const handleDeleteOrganization = async () => {
    if (!organization) return;
    
    setIsDeletingOrg(true);
    try {
      // Delete all members
      const { error: membersError } = await supabase
        .from('organization_members')
        .delete()
        .eq('organization_id', organization.id);
        
      if (membersError) throw membersError;
      
      // Finally, delete the organization
      const { error: orgError } = await supabase
        .from('organizations')
        .delete()
        .eq('id', organization.id);
        
      if (orgError) throw orgError;
      
      toast.success("Organization deleted successfully");
      setOrganization(null);
      setMembers([]);
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
    } finally {
      setIsDeletingOrg(false);
      setIsDeleteConfirmationOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading organization data..." />;
  }

  if (!organization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Organization</CardTitle>
          <CardDescription>
            You are not part of any organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contact support to create or join an organization.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Manage your organization settings and members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">{organization.name}</p>
            <p className="text-gray-500">Created on {new Date(organization.created_at).toLocaleDateString()}</p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-2">Members</h3>
            <ul className="list-none space-y-2">
              {members.map(member => (
                <li key={member.id} className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.user?.name?.substring(0, 2).toUpperCase() || member.user_id.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.user?.name || member.invited_name || member.user_id}</p>
                      <p className="text-sm text-gray-500">{ROLE_LABELS[member.role]}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => {
                        setMemberToChangeRole(member);
                        setNewRole(member.role);
                        setIsRoleChangeConfirmationOpen(true);
                      }} disabled={user.id === member.user_id}>
                        <Shield className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        setMemberToRemove(member);
                        setIsRemoveConfirmationOpen(true);
                      }} disabled={user.id === member.user_id}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
            
            {members.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <p>No members in this organization yet</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-2">Pending Invites</h3>
            <ul className="list-none space-y-2">
              {invites.map(invite => (
                <li key={invite.id} className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="text-yellow-500 h-4 w-4" />
                    <div>
                      <p className="font-medium">{invite.invited_name || invite.invited_email}</p>
                      <p className="text-sm text-gray-500">
                        Invited as {ROLE_LABELS[invite.role]}
                      </p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => {
                        setInviteToRevoke(invite.id);
                        setIsRevokeConfirmationOpen(true);
                      }}>
                        <X className="mr-2 h-4 w-4" />
                        Revoke Invite
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
            
            {invites.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <p>No pending invites</p>
              </div>
            )}
          </div>
          
          <Button onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </CardContent>
      </Card>
      
      {/* Delete Organization */}
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Be careful, these actions are irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => setIsDeleteConfirmationOpen(true)}>
            Delete Organization
          </Button>
        </CardContent>
      </Card>

      {/* Invite Member Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Member</DialogTitle>
            <DialogDescription>
              Invite a new member to your organization.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...inviteForm}>
            <form onSubmit={inviteForm.handleSubmit(handleInviteMember)} className="space-y-4">
              <FormField
                control={inviteForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={inviteForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={inviteForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="owner">{ROLE_LABELS['owner']}</SelectItem>
                        <SelectItem value="admin">{ROLE_LABELS['admin']}</SelectItem>
                        <SelectItem value="employee">{ROLE_LABELS['employee']}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the role for this member.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Inviting..." : "Invite Member"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Organization</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this organization? This action is irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteConfirmationOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteOrganization} disabled={isDeletingOrg}>
              {isDeletingOrg ? "Deleting..." : "Delete Organization"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member Confirmation Dialog */}
      <Dialog open={isRemoveConfirmationOpen} onOpenChange={setIsRemoveConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.user?.name || memberToRemove?.invited_name || memberToRemove?.user_id} from this organization?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRemoveConfirmationOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveMember} disabled={isRemovingMember}>
              {isRemovingMember ? "Removing..." : "Remove Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Confirmation Dialog */}
      <Dialog open={isRoleChangeConfirmationOpen} onOpenChange={setIsRoleChangeConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Member Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the role of {memberToChangeRole?.user?.name || memberToChangeRole?.invited_name || memberToChangeRole?.user_id} to {ROLE_LABELS[newRole]}?
            </DialogDescription>
          </DialogHeader>
          
          <Select onValueChange={(value) => setNewRole(value as UserRole)} defaultValue={newRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">{ROLE_LABELS['owner']}</SelectItem>
              <SelectItem value="admin">{ROLE_LABELS['admin']}</SelectItem>
              <SelectItem value="employee">{ROLE_LABELS['employee']}</SelectItem>
            </SelectContent>
          </Select>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRoleChangeConfirmationOpen(false)}>Cancel</Button>
            <Button onClick={handleChangeRole} disabled={isChangingRole}>
              {isChangingRole ? "Changing..." : "Change Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Invite Confirmation Dialog */}
      <Dialog open={isRevokeConfirmationOpen} onOpenChange={setIsRevokeConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Invitation</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this invitation?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRevokeConfirmationOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRevokeInvite} disabled={isRevokingInvite}>
              {isRevokingInvite ? "Revoking..." : "Revoke Invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationPermissionsSection;

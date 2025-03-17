
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrganizations } from '@/hooks/useOrganizations';
import { UserRole, OrganizationMember, ROLE_LABELS } from '@/types/organization';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Users, Mail, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InviteMemberDialog from './members/InviteMemberDialog';

const MembersPanel = () => {
  const { activeOrganization, members, inviteMember, updateMemberRole, removeMember, isLoading } = useOrganizations();
  const [activeTab, setActiveTab] = useState('active');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  // Filter members by status
  const activeMembers = members.filter(member => member.status === 'active');
  const pendingInvites = members.filter(member => member.status === 'pending');
  
  const handleInviteMember = async (name: string, email: string, role: UserRole) => {
    if (!activeOrganization) return;
    
    await inviteMember(activeOrganization.id, email, name, role);
    setIsInviteDialogOpen(false);
  };
  
  const handleRoleChange = async (memberId: string, role: UserRole) => {
    await updateMemberRole(memberId, role);
  };
  
  const handleRemoveMember = async (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      await removeMember(memberId);
    }
  };
  
  const handleRevokeInvite = async (inviteId: string) => {
    if (confirm('Are you sure you want to revoke this invitation?')) {
      await removeMember(inviteId);
    }
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading members...</div>;
  }
  
  if (!activeOrganization) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Organization Selected</h3>
            <p className="text-gray-500">
              Please select or create an organization to manage members.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <Button onClick={() => setIsInviteDialogOpen(true)} variant="coral">
          <UserPlus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active" className="flex items-center">
            <Users className="mr-2 h-4 w-4" /> 
            Active Members ({activeMembers.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" /> 
            Pending Invites ({pendingInvites.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeMembers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No active members found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          {member.user?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>{member.user?.email || 'No email'}</TableCell>
                        <TableCell>
                          <Select
                            value={member.role}
                            onValueChange={(value) => handleRoleChange(member.id, value as UserRole)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(ROLE_LABELS).map(([role, label]) => (
                                <SelectItem key={role} value={role}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Manage invitations that have been sent but not yet accepted
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingInvites.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No pending invitations</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvites.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell className="font-medium">
                          {invite.invited_name || 'No name'}
                        </TableCell>
                        <TableCell>{invite.invited_email || 'No email'}</TableCell>
                        <TableCell>{ROLE_LABELS[invite.role]}</TableCell>
                        <TableCell>
                          {new Date(invite.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeInvite(invite.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Revoke
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <InviteMemberDialog 
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
        onInvite={handleInviteMember}
      />
    </div>
  );
};

export default MembersPanel;

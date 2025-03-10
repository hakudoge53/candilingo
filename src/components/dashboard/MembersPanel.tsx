
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, MoreHorizontal, Trash2, UserCog } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { OrganizationMember, UserRole, ROLE_LABELS } from '@/types/organization';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface MembersPanelProps {
  members: OrganizationMember[];
  inviteMember: (organizationId: string, email: string, name: string, role: UserRole) => Promise<OrganizationMember | null>;
  updateMemberRole: (memberId: string, role: UserRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  organizationId: string;
  isLoading: boolean;
}

const MembersPanel = ({ 
  members, 
  inviteMember, 
  updateMemberRole, 
  removeMember, 
  organizationId,
  isLoading 
}: MembersPanelProps) => {
  const [open, setOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'employee' as UserRole
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInviteMember = async () => {
    if (!newMember.email.trim() || !newMember.name.trim()) return;
    
    setIsSubmitting(true);
    await inviteMember(organizationId, newMember.email, newMember.name, newMember.role);
    setIsSubmitting(false);
    setNewMember({
      name: '',
      email: '',
      role: 'employee' as UserRole
    });
    setOpen(false);
  };

  const handleRoleChange = async (memberId: string, role: UserRole) => {
    await updateMemberRole(memberId, role);
    setEditRoleId(null);
  };

  const pendingMembers = members.filter(m => m.status === 'pending');
  const activeMembers = members.filter(m => m.status === 'active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-techlex-blue">
              <PlusCircle className="mr-2 h-4 w-4" /> Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter member's name" 
                  value={newMember.name} 
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Enter member's email" 
                  value={newMember.email} 
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newMember.role} 
                  onValueChange={(value: UserRole) => setNewMember({...newMember, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="team_lead">Team Lead</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleInviteMember} 
                disabled={isSubmitting || !newMember.email.trim() || !newMember.name.trim()}
                className="bg-techlex-blue"
              >
                {isSubmitting ? "Sending..." : "Send Invitation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No team members yet. Invite some team members to get started.</p>
            </div>
          ) : (
            <>
              {pendingMembers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Pending Invitations</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.invited_name}</TableCell>
                          <TableCell>{member.invited_email}</TableCell>
                          <TableCell>{ROLE_LABELS[member.role]}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Invitation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this invitation? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => removeMember(member.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {activeMembers.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Active Members</h3>
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
                          <TableCell>{member.user?.name || member.invited_name}</TableCell>
                          <TableCell>{member.user?.email || member.invited_email}</TableCell>
                          <TableCell>
                            {editRoleId === member.id ? (
                              <Select 
                                value={member.role} 
                                onValueChange={(value: UserRole) => handleRoleChange(member.id, value)}
                              >
                                <SelectTrigger className="h-8 w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Administrator</SelectItem>
                                  <SelectItem value="manager">Manager</SelectItem>
                                  <SelectItem value="team_lead">Team Lead</SelectItem>
                                  <SelectItem value="employee">Employee</SelectItem>
                                  <SelectItem value="consultant">Consultant</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              ROLE_LABELS[member.role]
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setEditRoleId(member.id)}>
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Change Role
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Remove Member
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove this member from the organization? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={() => removeMember(member.id)}
                                      >
                                        Remove
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPanel;

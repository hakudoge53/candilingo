
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/types/organization';

interface InviteMemberDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isSubmitting: boolean;
  onInvite: (name: string, email: string, role: UserRole) => Promise<void>;
}

const InviteMemberDialog = ({ open, setOpen, isSubmitting, onInvite }: InviteMemberDialogProps) => {
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'employee' as UserRole
  });

  const handleInviteMember = async () => {
    if (!newMember.email.trim() || !newMember.name.trim()) return;
    
    await onInvite(newMember.name, newMember.email, newMember.role);
    
    setNewMember({
      name: '',
      email: '',
      role: 'employee' as UserRole
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-candilingo-purple">
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
                <SelectItem value="owner">{ROLE_LABELS['owner']}</SelectItem>
                <SelectItem value="manager">{ROLE_LABELS['manager']}</SelectItem>
                <SelectItem value="team_lead">{ROLE_LABELS['team_lead']}</SelectItem>
                <SelectItem value="employee">{ROLE_LABELS['employee']}</SelectItem>
              </SelectContent>
            </Select>
            {newMember.role && (
              <p className="text-sm text-gray-500 mt-2">{ROLE_DESCRIPTIONS[newMember.role]}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleInviteMember} 
            disabled={isSubmitting || !newMember.email.trim() || !newMember.name.trim()}
            className="bg-candilingo-purple"
          >
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;

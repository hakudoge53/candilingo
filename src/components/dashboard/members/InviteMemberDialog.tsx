import React, { useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/types/organization';
import { toast } from 'sonner';

interface InviteMemberDialogProps {
  isSubmitting: boolean;
  onInviteMember: (email: string, role: string) => Promise<void>;
}

const InviteMemberDialog: React.FC<InviteMemberDialogProps> = ({
  isSubmitting,
  onInviteMember
}) => {
  const [inviteDetails, setInviteDetails] = useState({
    email: '',
    role: 'employee'
  });

  const handleInviteMember = async () => {
    if (!inviteDetails.email.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    await onInviteMember(inviteDetails.email, inviteDetails.role);
    setInviteDetails({
      email: '',
      role: 'employee'
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite New Member</DialogTitle>
        <DialogDescription>
          Invite a new member to your organization.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Enter email address"
            value={inviteDetails.email}
            onChange={(e) => setInviteDetails({ ...inviteDetails, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Select onValueChange={(value) => setInviteDetails({ ...inviteDetails, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ROLE_DESCRIPTIONS).map(([role, description]) => (
                <SelectItem key={role} value={role}>
                  {ROLE_LABELS[role] || role}
                  <p className="text-xs text-gray-500 mt-1">{description}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={handleInviteMember}
          disabled={isSubmitting || !inviteDetails.email.trim()}
          className="bg-techlex-blue"
        >
          {isSubmitting ? "Inviting..." : "Invite Member"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default InviteMemberDialog;

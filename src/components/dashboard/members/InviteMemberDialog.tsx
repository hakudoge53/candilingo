
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/types/organization';
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/types/organization';

export interface InviteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newInvite: any) => void;
  organizationId: string;
}

const InviteMemberDialog: React.FC<InviteMemberDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  organizationId
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // In a real implementation, you would send the invitation 
      // through your backend or Supabase client
      console.log('Inviting:', { email, name, role, organizationId });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock invite object with dummy data
      const newInvite = {
        id: `invite-${Date.now()}`,
        organization_id: organizationId,
        invited_email: email,
        invited_name: name,
        role: role,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      onSuccess(newInvite);
      
      // Reset form
      setEmail('');
      setName('');
      setRole('employee');
    } catch (error) {
      console.error('Error sending invitation:', error);
      setError('Failed to send invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Their Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROLE_LABELS).map(([key, label]) => (
                  key !== 'super_admin' && (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  )
                ))}
              </SelectContent>
            </Select>
            {role && (
              <p className="text-sm text-gray-500 mt-1">
                {ROLE_DESCRIPTIONS[role]}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;

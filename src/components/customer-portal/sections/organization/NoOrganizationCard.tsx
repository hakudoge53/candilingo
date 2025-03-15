
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NoOrganizationCardProps {
  onCreateOrganization: (name: string) => Promise<void>;
  isLoading: boolean;
}

const NoOrganizationCard: React.FC<NoOrganizationCardProps> = ({ onCreateOrganization, isLoading }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onCreateOrganization(orgName);
      setOrgName('');
      setIsCreateDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>No Organization</CardTitle>
        <CardDescription>
          You are not part of any organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Create an organization to invite team members and manage resources.</p>
        
        <Button onClick={() => setIsCreateDialogOpen(true)} disabled={isLoading}>
          Create Organization
        </Button>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
              <DialogDescription>
                Enter a name for your new organization.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input 
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="My Organization"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting || !orgName.trim()}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default NoOrganizationCard;

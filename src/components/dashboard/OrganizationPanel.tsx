
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Organization } from '@/types/organization';

interface OrganizationPanelProps {
  organizations: Organization[];
  createOrganization: (name: string) => Promise<Organization | null>;
  isLoading: boolean;
}

const OrganizationPanel = ({ 
  organizations, 
  createOrganization, 
  isLoading 
}: OrganizationPanelProps) => {
  const [open, setOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrganization = async () => {
    if (!newOrgName.trim()) return;
    
    setIsSubmitting(true);
    await createOrganization(newOrgName);
    setIsSubmitting(false);
    setNewOrgName('');
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Organizations</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="orange">
              <PlusCircle className="mr-2 h-4 w-4" /> New Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Create a new organization to manage glossaries and team members.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter organization name" 
                  value={newOrgName} 
                  onChange={(e) => setNewOrgName(e.target.value)} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateOrganization} 
                disabled={isSubmitting || !newOrgName.trim()}
                variant="orange"
              >
                {isSubmitting ? "Creating..." : "Create Organization"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {organizations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-gray-500">You don't have any organizations yet.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizations.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
                <CardDescription>
                  Created on {new Date(org.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Organization ID: {org.id.substring(0, 8)}...
                </p>
                <div className="mt-4">
                  <p className={`text-sm ${org.active ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {org.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationPanel;

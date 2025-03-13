
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface OrganizationPromptProps {
  orgName: string;
  setOrgName: (name: string) => void;
  handleCreateOrganization: () => Promise<void>;
  onCancel: () => void;
}

const OrganizationPrompt = ({ 
  orgName, 
  setOrgName, 
  handleCreateOrganization, 
  onCancel 
}: OrganizationPromptProps) => {
  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="bg-amber-50 border-amber-300">
        <AlertTriangle className="h-5 w-5 text-amber-700" />
        <AlertDescription className="text-amber-700 font-medium">
          Please complete your organization information
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create Your Organization</h3>
        <p className="text-sm text-gray-500">
          You need to create an organization to continue. This will be your workspace in Candilingo.
        </p>
        
        <div className="space-y-2">
          <Label htmlFor="orgName" className="text-sm font-medium">
            Organization Name
          </Label>
          <Input
            id="orgName"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full"
            placeholder="Enter organization name"
          />
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Button onClick={handleCreateOrganization} variant="purple" className="w-full">
            Create Organization
          </Button>
          <Button onClick={onCancel} variant="outline" className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPrompt;

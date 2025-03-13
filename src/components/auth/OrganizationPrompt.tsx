
import React from 'react';
import { Button } from "@/components/ui/button";

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Create Your Organization</h3>
      <p className="text-sm text-gray-500">
        You need to create an organization to continue. This will be your workspace in Candilingo.
      </p>
      <div className="space-y-2">
        <label htmlFor="orgName" className="text-sm font-medium">
          Organization Name
        </label>
        <input
          id="orgName"
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter organization name"
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleCreateOrganization} variant="purple">
          Create Organization
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default OrganizationPrompt;

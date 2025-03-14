
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
  isRegistration?: boolean;
}

const OrganizationPrompt = ({ 
  orgName, 
  setOrgName, 
  handleCreateOrganization, 
  onCancel,
  isRegistration = false
}: OrganizationPromptProps) => {
  const stepText = isRegistration ? "Step 3 of 3" : "Organization Required";
  const progressBarClass = isRegistration ? "w-full" : "w-0";
  
  return (
    <div className="space-y-6">
      {isRegistration && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">{stepText}</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className={`bg-candilingo-purple h-2 rounded-full ${progressBarClass}`}></div>
          </div>
        </div>
      )}
      
      {!isRegistration && (
        <Alert variant="default" className="bg-amber-50 border-amber-300">
          <AlertTriangle className="h-5 w-5 text-amber-700" />
          <AlertDescription className="text-amber-700 font-medium">
            {stepText}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create Your Organization</h3>
        <p className="text-sm text-gray-500">
          Your account needs to be associated with an organization to continue. This will be your workspace in the customer portal.
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
            autoFocus
          />
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button 
            onClick={handleCreateOrganization} 
            variant="default" 
            className="w-full bg-candilingo-purple hover:bg-candilingo-purple/90"
            disabled={!orgName.trim()}
          >
            Create Organization
          </Button>
          <Button onClick={onCancel} variant="outline" className="w-full">
            {isRegistration ? "Back" : "Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPrompt;

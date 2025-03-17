
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Organization } from '@/types/organization';

interface DashboardHeaderProps {
  activeOrganization: Organization | null;
  organizations: Organization[];
  onOrganizationChange: (org: Organization) => void;
}

const DashboardHeader = ({ 
  activeOrganization, 
  organizations, 
  onOrganizationChange 
}: DashboardHeaderProps) => {
  if (!activeOrganization || organizations.length === 0) {
    return (
      <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-candilingo-purple/10 to-candilingo-teal/10 p-4 rounded-xl">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
            alt="Candilingo" 
            className="h-16 w-auto mr-4" 
          />
          <h2 className="text-3xl font-bold text-candilingo-purple">Dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-candilingo-purple/10 to-candilingo-teal/10 p-4 rounded-xl">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
          alt="Candilingo" 
          className="h-16 w-auto mr-4" 
        />
        <h2 className="text-3xl font-bold text-candilingo-purple">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className="text-base font-medium text-gray-600">Organization:</span>
        <Select 
          value={activeOrganization.id} 
          onValueChange={(value) => {
            const org = organizations.find(o => o.id === value);
            if (org) onOrganizationChange(org);
          }}
        >
          <SelectTrigger className="w-[240px] border-candilingo-purple/30">
            <SelectValue placeholder="Select organization" />
          </SelectTrigger>
          <SelectContent>
            {organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardHeader;

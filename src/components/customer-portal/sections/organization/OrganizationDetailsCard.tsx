
import React from 'react';
import { Organization } from '@/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OrganizationDetailsCardProps {
  organization: Organization;
}

const OrganizationDetailsCard: React.FC<OrganizationDetailsCardProps> = ({ organization }) => {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">{organization.name}</p>
      <p className="text-gray-500">Created on {new Date(organization.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default OrganizationDetailsCard;

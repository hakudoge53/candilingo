
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NoOrganizationCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Organization</CardTitle>
        <CardDescription>
          You are not part of any organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contact support to create or join an organization.</p>
      </CardContent>
    </Card>
  );
};

export default NoOrganizationCard;

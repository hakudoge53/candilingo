
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DangerZoneCardProps {
  onDeleteClick: () => void;
}

const DangerZoneCard: React.FC<DangerZoneCardProps> = ({ onDeleteClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>
          Be careful, these actions are irreversible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={onDeleteClick}>
          Delete Organization
        </Button>
      </CardContent>
    </Card>
  );
};

export default DangerZoneCard;

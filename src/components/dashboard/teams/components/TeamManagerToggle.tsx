
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TeamManagerToggleProps {
  isManager: boolean;
  setIsManager: (value: boolean) => void;
  disabled: boolean;
}

const TeamManagerToggle: React.FC<TeamManagerToggleProps> = ({
  isManager,
  setIsManager,
  disabled
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="is-manager"
        checked={isManager}
        onCheckedChange={setIsManager}
        disabled={disabled}
      />
      <Label htmlFor="is-manager">Add as team manager</Label>
    </div>
  );
};

export default TeamManagerToggle;

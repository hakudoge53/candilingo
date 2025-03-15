
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Glossary } from '@/types/organization';

interface PrivateDictionariesHeaderProps {
  onNewGlossaryClick: () => void;
}

const PrivateDictionariesHeader: React.FC<PrivateDictionariesHeaderProps> = ({
  onNewGlossaryClick
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4">Private Dictionaries</h2>
        <p className="text-gray-600 mb-6">
          Manage dictionaries specific to your organization.
        </p>
      </div>
      
      <Button onClick={onNewGlossaryClick}>
        <Plus className="mr-2 h-4 w-4" />
        New Dictionary
      </Button>
    </div>
  );
};

export default PrivateDictionariesHeader;

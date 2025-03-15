
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Plus } from 'lucide-react';
import { Glossary } from '@/types/organization';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface GlossaryListProps {
  glossaries: Glossary[];
  selectedGlossaryId: string | null;
  isLoading: boolean;
  onSelectGlossary: (glossaryId: string) => void;
  onCreateGlossary: () => void;
}

const GlossaryList: React.FC<GlossaryListProps> = ({
  glossaries,
  selectedGlossaryId,
  isLoading,
  onSelectGlossary,
  onCreateGlossary
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Dictionaries</CardTitle>
        <CardDescription>Dictionaries your organization owns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading && !glossaries.length ? (
          <LoadingSpinner message="Loading dictionaries..." />
        ) : (
          glossaries.map(glossary => (
            <Button 
              key={glossary.id}
              variant={selectedGlossaryId === glossary.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectGlossary(glossary.id)}
            >
              <Lock className="mr-2 h-4 w-4" />
              {glossary.name}
            </Button>
          ))
        )}
        
        {!isLoading && glossaries.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p>No private dictionaries available</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={onCreateGlossary}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create first dictionary
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GlossaryList;

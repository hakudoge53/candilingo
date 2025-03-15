
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyGlossaryStateProps {
  onCreateClick?: () => void;
}

const EmptyGlossaryState: React.FC<EmptyGlossaryStateProps> = ({ onCreateClick }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12 space-y-4">
          <p className="text-gray-500">No glossaries yet. Create your first custom glossary to get started.</p>
          
          {onCreateClick && (
            <Button onClick={onCreateClick} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Glossary
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyGlossaryState;

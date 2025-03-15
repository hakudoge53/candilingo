
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const EmptyGlossaryState: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No glossaries yet. Create your first custom glossary to get started.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyGlossaryState;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileEdit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Glossary } from '@/types/organization';

interface GlossaryTabsProps {
  glossaries: Glossary[];
  activeGlossary: Glossary | null;
  setActiveGlossary: (glossary: Glossary) => void;
  onEditGlossary: (glossary: Glossary) => void;
  onDeleteGlossary: (glossaryId: string) => void;
  children: React.ReactNode;
}

const GlossaryTabs: React.FC<GlossaryTabsProps> = ({
  glossaries,
  activeGlossary,
  setActiveGlossary,
  onEditGlossary,
  onDeleteGlossary,
  children
}) => {
  return (
    <div className="flex justify-between items-center">
      <Tabs 
        value={activeGlossary?.id || ""} 
        onValueChange={(value) => {
          const glossary = glossaries.find(g => g.id === value);
          if (glossary) setActiveGlossary(glossary);
        }}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="h-auto p-1">
            {glossaries.map((glossary) => (
              <TabsTrigger 
                key={glossary.id} 
                value={glossary.id}
                className="px-4 py-2"
              >
                {glossary.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {activeGlossary && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEditGlossary(activeGlossary)}
              >
                <FileEdit className="h-4 w-4 mr-1" /> Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-500">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
              </AlertDialog>
            </div>
          )}
        </div>

        {glossaries.map((glossary) => (
          <TabsContent key={glossary.id} value={glossary.id} className="pt-4">
            <Card>
              <CardContent className="pt-6">
                {children}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GlossaryTabs;

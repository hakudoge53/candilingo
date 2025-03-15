
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Glossary } from '@/types/organization';

interface GlossaryHeaderProps {
  activeGlossary?: Glossary | null;
  onNewGlossaryOpen: () => void;
}

const GlossaryHeader: React.FC<GlossaryHeaderProps> = ({ 
  activeGlossary,
  onNewGlossaryOpen 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">
          {activeGlossary ? activeGlossary.name : 'Custom Glossaries'}
        </h2>
        {activeGlossary?.description && (
          <p className="text-sm text-gray-500">{activeGlossary.description}</p>
        )}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-techlex-blue" onClick={onNewGlossaryOpen}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Glossary
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default GlossaryHeader;

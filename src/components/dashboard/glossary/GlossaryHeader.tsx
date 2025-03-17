
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
    <div className="flex justify-between items-center bg-gradient-to-r from-candilingo-purple/5 to-candilingo-teal/5 p-4 rounded-lg mb-6">
      <div>
        <div className="flex items-center mb-2">
          <img 
            src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
            alt="Candilingo" 
            className="h-12 w-auto mr-3" 
          />
          <h2 className="text-2xl font-semibold text-candilingo-purple">
            {activeGlossary ? activeGlossary.name : 'Custom Glossaries'}
          </h2>
        </div>
        {activeGlossary?.description && (
          <p className="text-base text-gray-600 ml-1">{activeGlossary.description}</p>
        )}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-candilingo-purple hover:bg-candilingo-darkpurple text-base px-5 py-2 h-auto" onClick={onNewGlossaryOpen}>
            <PlusCircle className="mr-2 h-5 w-5" /> New Glossary
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default GlossaryHeader;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

interface GlossaryHeaderProps {
  onNewGlossaryOpen: () => void;
}

const GlossaryHeader: React.FC<GlossaryHeaderProps> = ({ onNewGlossaryOpen }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Custom Glossaries</h2>
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

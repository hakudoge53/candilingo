
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { publicGlossaryTerms } from "@/data/publicGlossaryTerms";

interface TermBadgeProps {
  children: React.ReactNode;
  definition?: string;
  className?: string;
  term?: string;
}

const TermBadge = ({ children, definition, className, term }: TermBadgeProps) => {
  const [glossaryDefinition, setGlossaryDefinition] = useState<string | undefined>(definition);

  useEffect(() => {
    // If term is provided and no definition is specified, try to find it in the glossary
    if (term && !definition) {
      const foundTerm = publicGlossaryTerms.find(
        (glossaryTerm) => glossaryTerm.term.toLowerCase() === term.toLowerCase()
      );
      
      if (foundTerm) {
        setGlossaryDefinition(foundTerm.definition);
      }
    }
  }, [term, definition]);

  const displayDefinition = glossaryDefinition || definition;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "tech-term inline-flex items-center bg-candilingo-pink hover:bg-candilingo-pink/90 text-white rounded-full px-3 py-1 text-sm font-medium cursor-pointer",
              className
            )}
          >
            {children}
          </span>
        </TooltipTrigger>
        {displayDefinition && (
          <TooltipContent 
            side="top" 
            align="start"
            className="max-w-[300px] text-sm bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-50"
            sideOffset={5}
            alignOffset={5}
          >
            {displayDefinition}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TermBadge;

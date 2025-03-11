
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TermBadgeProps {
  children: React.ReactNode;
  definition?: string;
  className?: string;
}

const TermBadge = ({ children, definition, className }: TermBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "tech-term inline-flex items-center bg-techlex-pink hover:bg-techlex-pink/90 text-white rounded-full px-3 py-1 text-sm font-medium cursor-pointer",
              className
            )}
          >
            {children}
          </span>
        </TooltipTrigger>
        {definition && (
          <TooltipContent 
            side="top" 
            align="start"
            className="max-w-[200px] text-sm bg-white border border-gray-200 shadow-lg rounded-lg p-2"
            sideOffset={5}
            alignOffset={5}
          >
            {definition}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TermBadge;

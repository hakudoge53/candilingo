
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
              "tech-term inline-flex items-center bg-techlex-pink text-white rounded-full px-3 py-1 text-sm font-medium cursor-help",
              className
            )}
          >
            {children}
          </span>
        </TooltipTrigger>
        {definition && (
          <TooltipContent className="max-w-[200px] text-sm">
            {definition}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TermBadge;

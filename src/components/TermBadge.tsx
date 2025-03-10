
import { cn } from "@/lib/utils";

interface TermBadgeProps {
  children: React.ReactNode;
  definition?: string;
  className?: string;
}

const TermBadge = ({ children, definition, className }: TermBadgeProps) => {
  return (
    <span
      className={cn(
        "tech-term inline-flex items-center bg-techlex-pink text-white rounded-full px-3 py-1 text-sm font-medium",
        className
      )}
      title={definition}
    >
      {children}
    </span>
  );
};

export default TermBadge;

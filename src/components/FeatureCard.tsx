
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover",
      className
    )}>
      <div className="w-12 h-12 bg-techlex-blue bg-opacity-10 flex items-center justify-center rounded-lg mb-4 text-techlex-blue">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;

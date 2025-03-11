
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
      "bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover animate-fade-in",
      className
    )}>
      <div className="w-12 h-12 bg-candilingo-blue bg-opacity-10 flex items-center justify-center rounded-lg mb-4 text-candilingo-blue animate-float">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 font-montserrat text-candilingo-darkgray">{title}</h3>
      <p className="text-candilingo-midgray">{description}</p>
    </div>
  );
};

export default FeatureCard;

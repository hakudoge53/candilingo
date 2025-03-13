
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  comingSoon?: boolean;
}

const FeatureCard = ({ title, description, icon, comingSoon = false, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover animate-fade-in relative",
      className
    )}>
      {comingSoon && (
        <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full border border-amber-200">
          Coming Soon
        </div>
      )}
      <div className="w-12 h-12 bg-candilingo-purple bg-opacity-10 flex items-center justify-center rounded-lg mb-4 text-candilingo-purple animate-float">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 font-montserrat text-candilingo-darkgray">{title}</h3>
      <p className="text-candilingo-midgray">{description}</p>
    </div>
  );
};

export default FeatureCard;

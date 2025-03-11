
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import BrowserWindow from './browser/BrowserWindow';

interface HeroImageSectionProps {
  className?: string;
}

const HeroImageSection = ({ className }: HeroImageSectionProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "relative w-full h-full flex items-center justify-center",
      className
    )}>
      {/* Browser window mockup */}
      <div className="relative w-full">
        <BrowserWindow loaded={loaded} />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -left-10 w-20 h-20 bg-techlex-pink-light opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute -top-12 -right-4 w-24 h-24 bg-techlex-pink opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HeroImageSection;

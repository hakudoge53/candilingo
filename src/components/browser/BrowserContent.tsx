
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import SlideNavigation from "./SlideNavigation";
import SlideIndicator from "./SlideIndicator";
import LoadingOverlay from "./LoadingOverlay";
import DeveloperCVSlide from "./DeveloperCVSlide";
import ResumeAnalysisSlide from "./ResumeAnalysisSlide";
import { ScrollArea } from "../ui/scroll-area";

interface BrowserContentProps {
  loaded: boolean;
}

const BrowserContent = ({ loaded }: BrowserContentProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 1; // Now we only have 1 slide

  return (
    <div className="bg-white p-6 relative">
      <div className={cn(
        "transition-opacity duration-1000",
        loaded ? "opacity-100" : "opacity-0"
      )}>
        <ScrollArea className="h-[420px]">
          {/* Combined Developer CV and Resume Analysis in one slide */}
          <div className="space-y-8">
            <DeveloperCVSlide />
            <div className="border-t pt-6">
              <ResumeAnalysisSlide />
            </div>
          </div>
        </ScrollArea>
        
        {/* Slide indicator - now showing one dot */}
        <SlideIndicator 
          totalSlides={totalSlides} 
          activeSlide={activeSlide} 
          onSlideChange={setActiveSlide} 
        />
      </div>
      
      {/* Loading overlay */}
      <LoadingOverlay loaded={loaded} />
    </div>
  );
};

export default BrowserContent;

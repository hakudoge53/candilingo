
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
  const totalSlides = 2;

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="bg-white p-6 relative border-t border-gray-200">
      <div className={cn(
        "transition-opacity duration-1000",
        loaded ? "opacity-100" : "opacity-0"
      )}>
        <ScrollArea className="h-[320px] pr-2">
          {/* Slide 1: Developer CV */}
          <div className={`${activeSlide === 0 ? 'block' : 'hidden'}`}>
            <DeveloperCVSlide />
          </div>
          
          {/* Slide 2: Resume Analysis */}
          <div className={`${activeSlide === 1 ? 'block' : 'hidden'}`}>
            <ResumeAnalysisSlide />
          </div>
        </ScrollArea>
        
        {/* Navigation arrows */}
        <SlideNavigation onPrevious={goToPrevSlide} onNext={goToNextSlide} />
        
        {/* Slide indicator */}
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

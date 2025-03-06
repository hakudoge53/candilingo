
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import SlideNavigation from "./SlideNavigation";
import SlideIndicator from "./SlideIndicator";
import LoadingOverlay from "./LoadingOverlay";
import DeveloperCVSlide from "./DeveloperCVSlide";
import ResumeAnalysisSlide from "./ResumeAnalysisSlide";

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
    <div className="bg-white p-6 relative">
      <div className={cn(
        "transition-opacity duration-1000",
        loaded ? "opacity-100" : "opacity-0"
      )}>
        {/* Slide 1: Developer CV */}
        <div className={`${activeSlide === 0 ? 'block' : 'hidden'}`}>
          <DeveloperCVSlide />
        </div>
        
        {/* Slide 2: Resume Analysis */}
        <div className={`${activeSlide === 1 ? 'block' : 'hidden'}`}>
          <ResumeAnalysisSlide />
        </div>
        
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

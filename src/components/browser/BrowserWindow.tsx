
import React, { useState, useEffect } from 'react';
import BrowserHeader from './BrowserHeader';
import LoadingOverlay from './LoadingOverlay';
import BrowserContent from './BrowserContent';
import TooltipOverlay from './TooltipOverlay';
import { ResumeAnalysisSlide } from './ResumeAnalysisSlide';
import { DeveloperCVSlide } from './DeveloperCVSlide';
import SlideIndicator from './SlideIndicator';

interface BrowserWindowProps {
  headerText?: string;
  showAnalysis?: boolean;
  showLoading?: boolean;
  tooltipText?: string;
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  tooltipTarget?: string;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({
  headerText = 'Candilingo',
  showAnalysis = false,
  showLoading = false,
  tooltipText,
  tooltipPosition,
  tooltipTarget,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (showAnalysis) {
      setSlides([
        <DeveloperCVSlide key="cv" />,
        <ResumeAnalysisSlide key="analysis" />
      ]);
    } else {
      setSlides([<BrowserContent key="content" />]);
    }
  }, [showAnalysis]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white w-full max-w-4xl mx-auto">
      <BrowserHeader text={headerText} />
      
      <div className="relative">
        {slides[activeSlide]}
        
        {showLoading && <LoadingOverlay />}
        
        {tooltipText && tooltipTarget && (
          <TooltipOverlay
            text={tooltipText}
            position={tooltipPosition || 'bottom'}
            target={tooltipTarget}
          />
        )}
        
        {slides.length > 1 && (
          <SlideIndicator
            totalSlides={slides.length}
            activeSlide={activeSlide}
            onSlideChange={handleSlideChange}
          />
        )}
      </div>
    </div>
  );
};

export default BrowserWindow;

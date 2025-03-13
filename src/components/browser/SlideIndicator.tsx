
import React from 'react';

interface SlideIndicatorProps {
  totalSlides: number;
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideIndicator = ({ totalSlides, activeSlide, onSlideChange }: SlideIndicatorProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
      {[...Array(totalSlides)].map((_, i) => (
        <button
          key={i}
          onClick={() => onSlideChange(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === activeSlide 
              ? 'bg-candilingo-purple scale-110' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default SlideIndicator;

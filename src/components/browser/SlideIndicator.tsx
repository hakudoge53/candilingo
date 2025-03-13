
import React from 'react';

interface SlideIndicatorProps {
  totalSlides: number;
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideIndicator = ({ totalSlides, activeSlide, onSlideChange }: SlideIndicatorProps) => {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {[...Array(totalSlides)].map((_, i) => (
        <button
          key={i}
          onClick={() => onSlideChange(i)}
          className={`w-2 h-2 rounded-full ${
            i === activeSlide ? 'bg-candilingo-pink' : 'bg-gray-300'
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default SlideIndicator;

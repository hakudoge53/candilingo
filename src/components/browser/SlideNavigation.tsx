
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const SlideNavigation = ({ onPrevious, onNext }: SlideNavigationProps) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-0 flex justify-between w-full px-2 z-10">
      <button 
        onClick={onPrevious}
        className="bg-white bg-opacity-70 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button 
        onClick={onNext}
        className="bg-white bg-opacity-70 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default SlideNavigation;

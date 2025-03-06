
import React from 'react';

interface TooltipOverlayProps {
  title: string;
  description: string;
}

const TooltipOverlay = ({ title, description }: TooltipOverlayProps) => {
  return (
    <div className="absolute top-32 -right-2 md:right-5 w-72 bg-techlex-pink text-white p-4 rounded-lg shadow-lg transform transition-all duration-250 animate-[float_8s_ease-in-out_infinite]">
      <div className="absolute -left-4 top-8 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-techlex-pink"></div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

export default TooltipOverlay;

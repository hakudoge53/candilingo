
import React from 'react';
import { useLocation } from 'react-router-dom';

interface TooltipOverlayProps {
  title: string;
  description: string;
  position?: 'left' | 'right';
  className?: string;
  showOnPage?: string;
}

const TooltipOverlay = ({ 
  title, 
  description, 
  position = 'right',
  className = '',
  showOnPage
}: TooltipOverlayProps) => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');
  
  // Only show the tooltip if we're on the specified page, or if no page is specified
  if (showOnPage && currentPath !== showOnPage) {
    return null;
  }

  return (
    <div className={`absolute bg-candilingo-pink text-white p-4 rounded-lg shadow-lg transform transition-all duration-250 animate-[float_8s_ease-in-out_infinite] z-50 overflow-visible ${className}`}>
      <div className={`absolute ${position === 'right' ? '-left-4' : '-right-4'} top-8 w-0 h-0 border-t-8 border-b-8 ${position === 'right' ? 'border-r-8 border-l-0 border-r-candilingo-pink' : 'border-l-8 border-r-0 border-l-candilingo-pink'} border-transparent`}></div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

export default TooltipOverlay;

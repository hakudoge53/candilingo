
import React from 'react';
import { Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BrowserHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="browser-header">
      <div className="flex space-x-2 mr-4">
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400"></div>
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 bg-white rounded-md px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-600 flex items-center">
        <div className="flex items-center w-full">
          <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
          <span className="truncate font-medium text-sm sm:text-base">resume-review.candilingo.com</span>
          <div className="flex items-center ml-auto">
            <img 
              src="/lovable-uploads/30c70ee7-a470-4d43-b8f7-c4209c3a51bb.png" 
              alt="Candilingo Extension" 
              className="w-7 h-7 sm:w-9 sm:h-9" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserHeader;

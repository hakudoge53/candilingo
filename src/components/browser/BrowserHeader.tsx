
import React from 'react';
import { Globe } from 'lucide-react';

const BrowserHeader = () => {
  return (
    <div className="browser-header">
      <div className="flex space-x-2 mr-4">
        <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 bg-white rounded-md px-4 py-1.5 text-sm text-gray-600 flex items-center">
        <div className="flex items-center w-full">
          <Globe className="w-4 h-4 mr-2 text-gray-500" />
          <span className="truncate font-medium text-base">resume-review.candilingo.com</span>
          <div className="flex items-center ml-auto">
            <img 
              src="/lovable-uploads/30c70ee7-a470-4d43-b8f7-c4209c3a51bb.png" 
              alt="Candilingo Extension" 
              className="w-9 h-9" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserHeader;

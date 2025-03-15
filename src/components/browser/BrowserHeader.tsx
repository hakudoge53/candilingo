
import React from 'react';
import { Search, Globe, Chrome, Puzzle } from 'lucide-react';

const BrowserHeader = () => {
  return (
    <div className="browser-header">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 flex items-center">
        <div className="flex items-center w-full">
          <Globe className="w-3.5 h-3.5 mr-2 text-gray-400" />
          <span className="truncate">resume-review.candilingo.com</span>
          <div className="flex items-center gap-2 ml-auto">
            <Puzzle className="w-4 h-4 text-candilingo-pink" />
            <img 
              src="/lovable-uploads/30c70ee7-a470-4d43-b8f7-c4209c3a51bb.png" 
              alt="Candilingo Extension" 
              className="w-5 h-5" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserHeader;

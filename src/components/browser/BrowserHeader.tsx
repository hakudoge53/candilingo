
import React from 'react';
import { Search } from 'lucide-react';

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
          <Search className="w-3.5 h-3.5 mr-2 text-gray-400" />
          <span className="truncate">resume-review.candilingo.com</span>
          <img 
            src="/lovable-uploads/7a750ab3-5d13-4260-96d5-1c489f3a4102.png" 
            alt="Candilingo Icon" 
            className="w-4 h-4 ml-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserHeader;

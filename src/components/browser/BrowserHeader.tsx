
import React from 'react';

const BrowserHeader = () => {
  return (
    <div className="bg-gray-100 px-4 py-2 flex items-center border-b border-gray-200">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 flex items-center">
        <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        resume-review.example.com
      </div>
    </div>
  );
};

export default BrowserHeader;

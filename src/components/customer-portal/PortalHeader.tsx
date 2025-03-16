
import React from 'react';

const PortalHeader = () => {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-b from-[#A020F0] to-[#FF69B4] p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img 
            src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
            alt="Candilingo" 
            className="h-16 w-auto drop-shadow-md" 
          />
        </div>
        <h1 className="text-3xl font-bold text-white text-center">
          Customer Portal
        </h1>
      </div>
    </div>
  );
};

export default PortalHeader;

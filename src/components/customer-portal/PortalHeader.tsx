
import React from 'react';

const PortalHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <img 
          src="/lovable-uploads/3ba829c2-54b7-4152-b767-9eb28429dbd7.png" 
          alt="Candilingo" 
          className="h-14 w-auto" 
        />
      </div>
      <h1 className="text-3xl font-bold text-candilingo-purple">Customer <span className="text-candilingo-pink">Portal</span></h1>
    </div>
  );
};

export default PortalHeader;

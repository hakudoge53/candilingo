
import React from 'react';

const PortalHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <img 
          src="/public/lovable-uploads/dd4d9cc8-eaa4-43df-bc05-3b8a88297f00.png" 
          alt="Candilingo" 
          className="h-12"
        />
      </div>
      <h1 className="text-3xl font-bold text-candilingo-purple">Customer <span className="text-candilingo-pink">Portal</span></h1>
    </div>
  );
};

export default PortalHeader;

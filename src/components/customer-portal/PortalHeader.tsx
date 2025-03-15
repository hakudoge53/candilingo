
import React from 'react';

const PortalHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <img 
          src="/public/lovable-uploads/cbe6d14b-3d9f-4814-af61-b96347790cb1.png" 
          alt="Candilingo" 
          className="h-10"
        />
      </div>
      <h1 className="text-3xl font-bold text-candilingo-purple">Customer <span className="text-candilingo-pink">Portal</span></h1>
    </div>
  );
};

export default PortalHeader;


import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';

const PortalHeader = () => {
  const { activeUser } = useAuth();
  const [isReturningUser, setIsReturningUser] = useState(false);
  
  useEffect(() => {
    // Check if user has visited before using localStorage
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisitedBefore && activeUser) {
      setIsReturningUser(true);
    } else if (activeUser) {
      // If this is their first visit, set the flag
      localStorage.setItem('hasVisitedBefore', 'true');
      setIsReturningUser(false);
    }
  }, [activeUser]);
  
  const welcomeMessage = isReturningUser ? "Welcome back" : "Welcome to Candilingo";
  
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-candilingo-purple via-candilingo-teal to-candilingo-pink p-8 rounded-xl shadow-lg mb-6">
        <div className="flex items-center justify-center gap-4 mb-5">
          {activeUser && (
            <div className="bg-white/20 px-4 py-2 rounded-full text-white">
              {welcomeMessage}, {activeUser.name || 'User'}!
            </div>
          )}
          {!activeUser && (
            <div className="bg-white/20 px-4 py-2 rounded-full text-white">
              {welcomeMessage}!
            </div>
          )}
        </div>
        <h1 className="text-5xl font-bold text-white text-center">
          Customer <span className="bg-gradient-to-r from-white to-candilingo-teal bg-clip-text text-transparent">Portal</span>
        </h1>
      </div>
    </div>
  );
};

export default PortalHeader;

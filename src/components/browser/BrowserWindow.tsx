
import React from 'react';
import BrowserHeader from './BrowserHeader';
import BrowserContent from './BrowserContent';
import { useIsMobile } from '@/hooks/use-mobile';

interface BrowserWindowProps {
  loaded: boolean;
}

const BrowserWindow = ({ loaded }: BrowserWindowProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative w-full max-w-2xl mx-auto browser-window transform transition-all duration-700 shadow-xl rounded-xl overflow-hidden">
      {/* Shadow elements for depth effect */}
      <div className="absolute top-2 left-2 -z-10 w-full h-full bg-candilingo-pink opacity-5 rounded-xl"></div>
      <div className="absolute top-1 left-1 -z-10 w-full h-full bg-candilingo-purple opacity-5 rounded-xl"></div>
      
      {/* Browser chrome */}
      <div className="bg-white rounded-t-lg border border-gray-200 h-auto">
        <BrowserHeader />
        <BrowserContent loaded={loaded} />
      </div>
    </div>
  );
};

export default BrowserWindow;

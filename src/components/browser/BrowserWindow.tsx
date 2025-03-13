
import React from 'react';
import BrowserHeader from './BrowserHeader';
import BrowserContent from './BrowserContent';

interface BrowserWindowProps {
  loaded: boolean;
}

const BrowserWindow = ({ loaded }: BrowserWindowProps) => {
  return (
    <div className="relative w-full max-w-2xl browser-window transform transition-all duration-700">
      <div className="absolute top-2 left-2 -z-10 w-full h-full bg-candilingo-pink opacity-5 rounded-xl"></div>
      <div className="absolute top-1 left-1 -z-10 w-full h-full bg-candilingo-purple opacity-5 rounded-xl"></div>
      <BrowserHeader />
      <BrowserContent loaded={loaded} />
    </div>
  );
};

export default BrowserWindow;

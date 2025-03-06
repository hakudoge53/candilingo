
import React from 'react';
import BrowserHeader from './BrowserHeader';
import BrowserContent from './BrowserContent';

interface BrowserWindowProps {
  loaded: boolean;
}

const BrowserWindow = ({ loaded }: BrowserWindowProps) => {
  return (
    <div className="relative w-full max-w-2xl hero-glass rounded-xl overflow-hidden shadow-2xl transition-all duration-700 transform">
      <BrowserHeader />
      <BrowserContent loaded={loaded} />
    </div>
  );
};

export default BrowserWindow;

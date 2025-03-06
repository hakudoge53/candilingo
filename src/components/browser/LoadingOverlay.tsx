
import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  loaded: boolean;
}

const LoadingOverlay = ({ loaded }: LoadingOverlayProps) => {
  return (
    <div className={cn(
      "absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-500",
      loaded ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-techlex-pink border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-2 text-sm text-gray-500">Loading content...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;

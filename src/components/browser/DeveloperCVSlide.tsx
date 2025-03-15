
import React from 'react';
import DeveloperProfile from './cv/DeveloperProfile';
import SkillsSection from './cv/SkillsSection';
import ExperienceSection from './cv/ExperienceSection';

const DeveloperCVSlide = () => {
  return (
    <div className="space-y-6 pr-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-candilingo-purple">Developer CV</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            Candilingo Active
          </span>
        </div>
      </div>
      
      <div className="space-y-8 text-gray-700 text-sm border border-gray-200 rounded-lg p-6 shadow-sm">
        <DeveloperProfile />
        <div className="border-t border-gray-100 pt-6">
          <SkillsSection />
        </div>
        <div className="border-t border-gray-100 pt-6">
          <ExperienceSection />
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <div className="bg-candilingo-purple bg-opacity-10 text-candilingo-purple text-xs px-3 py-1 rounded-full">
          Enhanced with Candilingo
        </div>
      </div>
    </div>
  );
};

export default DeveloperCVSlide;

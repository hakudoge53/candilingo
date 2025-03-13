
import React from 'react';
import DeveloperProfile from './cv/DeveloperProfile';
import SkillsSection from './cv/SkillsSection';
import ExperienceSection from './cv/ExperienceSection';

const DeveloperCVSlide = () => {
  return (
    <div className="space-y-4 pr-2">
      <h2 className="text-xl font-bold mb-4 text-candilingo-purple">Developer CV <span className="text-candilingo-pink">Analysis</span></h2>
      <div className="space-y-6 text-gray-700 text-sm">
        <DeveloperProfile />
        <SkillsSection />
        <ExperienceSection />
      </div>
    </div>
  );
};

export default DeveloperCVSlide;


import React from 'react';
import DeveloperProfile from './cv/DeveloperProfile';
import SkillsSection from './cv/SkillsSection';
import ExperienceSection from './cv/ExperienceSection';

const DeveloperCVSlide = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Developer CV</h2>
      <div className="space-y-4 text-gray-700 text-sm">
        <DeveloperProfile />
        <SkillsSection />
        <ExperienceSection />
      </div>
    </div>
  );
};

export default DeveloperCVSlide;

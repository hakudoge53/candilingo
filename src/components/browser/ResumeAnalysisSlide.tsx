
import React from 'react';
import CandidateDescription from './analysis/CandidateDescription';
import AnalysisSummary from './analysis/AnalysisSummary';
import TooltipOverlay from './TooltipOverlay';

const ResumeAnalysisSlide = () => {
  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4">Resume Analysis: Java Developer</h2>
      <CandidateDescription />
      <AnalysisSummary />
      
      {/* Spring Boot tooltip precisely positioned */}
      <TooltipOverlay 
        title="Spring Boot" 
        description="An open-source Java-based framework used to create microservice applications. It provides pre-configured settings for a fast development environment."
        position="right"
        className="top-[110px] -right-1 md:right-10 w-72 z-10"
      />
    </div>
  );
};

export default ResumeAnalysisSlide;

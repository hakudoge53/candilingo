
import React from 'react';
import CandidateDescription from './analysis/CandidateDescription';
import AnalysisSummary from './analysis/AnalysisSummary';

const ResumeAnalysisSlide = () => {
  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4 text-candilingo-purple">Resume Analysis: <span className="text-candilingo-pink">Java Developer</span></h2>
      <CandidateDescription />
      <AnalysisSummary />
    </div>
  );
};

export default ResumeAnalysisSlide;


import React, { ReactNode } from 'react';

interface JobEntryProps {
  title: string;
  company: string;
  period: string;
  description: ReactNode;
}

const JobEntry = ({ title, company, period, description }: JobEntryProps) => {
  return (
    <div className="ml-1 mb-4 bg-gray-50 p-3 rounded-md border-l-2 border-candilingo-purple">
      <div className="flex justify-between items-start mb-1">
        <p className="font-medium text-candilingo-purple">{title}, {company}</p>
        <p className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-100">{period}</p>
      </div>
      <p className="text-xs mt-1 text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

export default JobEntry;

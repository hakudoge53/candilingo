
import React, { ReactNode } from 'react';

interface JobEntryProps {
  title: string;
  company: string;
  period: string;
  description: ReactNode;
}

const JobEntry = ({ title, company, period, description }: JobEntryProps) => {
  return (
    <div className="ml-2 mb-2">
      <p className="font-medium">{title}, {company}</p>
      <p className="text-xs text-gray-500">{period}</p>
      <p className="text-xs mt-1">{description}</p>
    </div>
  );
};

export default JobEntry;

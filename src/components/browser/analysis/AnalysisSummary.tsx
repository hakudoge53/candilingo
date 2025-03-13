
import React from 'react';
import { Badge } from "@/components/ui/badge";

const AnalysisSummary = () => {
  return (
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Candilingo AI - Tech summary</h3>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">Strong Backend Skills</Badge>
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">Modern Tech Stack</Badge>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">DevOps Knowledge</Badge>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-0">Microservices Experience</Badge>
      </div>
    </div>
  );
};

export default AnalysisSummary;

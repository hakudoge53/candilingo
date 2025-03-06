
import React from 'react';
import TermBadge from "@/components/TermBadge";

const ResumeAnalysisSlide = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resume Analysis: Java Developer</h2>
      <div className="space-y-2 text-gray-700 text-sm">
        <p className="leading-relaxed">
          Candidate has 5+ years experience as a 
          <TermBadge definition="Java Enterprise Edition - A platform for server-side application development" className="mx-1">Java EE</TermBadge>
          developer with expertise in 
          <TermBadge definition="Spring Boot is an open source Java-based framework used to create microservices" className="mx-1">Spring Boot</TermBadge>
          and 
          <TermBadge definition="A popular JavaScript library for building user interfaces" className="mx-1">React</TermBadge>. 
          They've implemented 
          <TermBadge definition="Representational State Transfer - An architectural style for designing networked applications" className="mx-1">RESTful APIs</TermBadge>
          and worked with 
          <TermBadge definition="An open source SQL database management system" className="mx-1">PostgreSQL</TermBadge>.
        </p>
        <p className="leading-relaxed">
          They've also worked with
          <TermBadge definition="Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed" className="mx-1">CI/CD</TermBadge>
          pipelines using 
          <TermBadge definition="An open source automation server that helps automate software development" className="mx-1">Jenkins</TermBadge>
          and 
          <TermBadge definition="An open source tool for creating lightweight, portable virtualized application containers" className="mx-1">Docker</TermBadge>.
          The candidate has experience with 
          <TermBadge definition="A software design pattern that supports the building of maintainable applications" className="mx-1">MVC architecture</TermBadge>
          and 
          <TermBadge definition="A software development methodology that emphasizes incremental delivery and team collaboration" className="mx-1">Agile methodologies</TermBadge>.
        </p>
      </div>
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">TechLex Analysis</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Strong Backend Skills</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Modern Tech Stack</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">DevOps Knowledge</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Microservices Experience</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisSlide;


import React from 'react';
import TermBadge from "@/components/TermBadge";
import JobEntry from './JobEntry';
import { Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="w-4 h-4 text-candilingo-purple" />
        <h4 className="font-medium">Professional Experience</h4>
      </div>
      
      <JobEntry 
        title="Senior Developer"
        company="TechCorp"
        period="2019 - Present"
        description={
          <>
            Led development of microservices using 
            <TermBadge definition="Spring Boot is an open source Java-based framework used to create microservices" className="mx-1">Spring Boot</TermBadge>
            and 
            <TermBadge definition="Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed" className="mx-1">CI/CD</TermBadge>
            pipelines with 
            <TermBadge definition="An open source tool for creating lightweight, portable virtualized application containers" className="mx-1">Docker</TermBadge>
            and 
            <TermBadge definition="A container orchestration system for automating deployment and management" className="mx-1">Kubernetes</TermBadge>.
          </>
        }
      />
      <JobEntry 
        title="Full Stack Developer"
        company="WebSolutions"
        period="2016 - 2019"
        description={
          <>
            Built 
            <TermBadge definition="Single Page Applications - Web apps that load a single HTML page and dynamically update content" className="mx-1">SPAs</TermBadge>
            with 
            <TermBadge definition="A popular JavaScript library for building user interfaces" className="mx-1">React</TermBadge>
            and 
            <TermBadge definition="A state management pattern + library for JavaScript applications" className="mx-1">Redux</TermBadge>
            connecting to 
            <TermBadge definition="An open source SQL database management system" className="mx-1">PostgreSQL</TermBadge>
            databases.
          </>
        }
      />
    </div>
  );
};

export default ExperienceSection;

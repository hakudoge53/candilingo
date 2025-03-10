
import React from 'react';
import TermBadge from "@/components/TermBadge";

const CandidateDescription = () => {
  return (
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
  );
};

export default CandidateDescription;

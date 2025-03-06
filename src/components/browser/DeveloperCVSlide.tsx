
import React from 'react';
import TermBadge from "@/components/TermBadge";

const DeveloperCVSlide = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Developer CV</h2>
      <div className="space-y-4 text-gray-700 text-sm">
        <div className="space-y-1">
          <h3 className="font-semibold text-base">John Developer</h3>
          <p className="text-gray-500">Senior Software Engineer</p>
          <p className="text-gray-500">john.dev@example.com | (123) 456-7890</p>
        </div>
        
        <div>
          <h4 className="font-medium">Skills</h4>
          <p className="leading-relaxed">
            <TermBadge definition="JavaScript is a programming language used to create interactive effects within web browsers" className="mx-1">JavaScript</TermBadge>
            <TermBadge definition="TypeScript is a strict syntactical superset of JavaScript that adds static typing" className="mx-1">TypeScript</TermBadge>
            <TermBadge definition="Java Enterprise Edition - A platform for server-side application development" className="mx-1">Java EE</TermBadge>
            <TermBadge definition="Spring Boot is an open source Java-based framework used to create microservices" className="mx-1">Spring Boot</TermBadge>
            <TermBadge definition="A popular JavaScript library for building user interfaces" className="mx-1">React</TermBadge>
            <TermBadge definition="A JavaScript framework for building web applications" className="mx-1">Vue.js</TermBadge>
            <TermBadge definition="Representational State Transfer - An architectural style for designing networked applications" className="mx-1">RESTful APIs</TermBadge>
            <TermBadge definition="An open source SQL database management system" className="mx-1">PostgreSQL</TermBadge>
            <TermBadge definition="A NoSQL document database" className="mx-1">MongoDB</TermBadge>
          </p>
        </div>
        
        <div>
          <h4 className="font-medium">Experience</h4>
          <div className="ml-2 mb-2">
            <p className="font-medium">Senior Developer, TechCorp</p>
            <p className="text-xs text-gray-500">2019 - Present</p>
            <p className="text-xs mt-1">
              Led development of microservices using 
              <TermBadge definition="Spring Boot is an open source Java-based framework used to create microservices" className="mx-1">Spring Boot</TermBadge>
              and 
              <TermBadge definition="Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed" className="mx-1">CI/CD</TermBadge>
              pipelines with 
              <TermBadge definition="An open source tool for creating lightweight, portable virtualized application containers" className="mx-1">Docker</TermBadge>
              and 
              <TermBadge definition="A container orchestration system for automating deployment and management" className="mx-1">Kubernetes</TermBadge>.
            </p>
          </div>
          <div className="ml-2">
            <p className="font-medium">Full Stack Developer, WebSolutions</p>
            <p className="text-xs text-gray-500">2016 - 2019</p>
            <p className="text-xs mt-1">
              Built 
              <TermBadge definition="Single Page Applications - Web apps that load a single HTML page and dynamically update content" className="mx-1">SPAs</TermBadge>
              with 
              <TermBadge definition="A popular JavaScript library for building user interfaces" className="mx-1">React</TermBadge>
              and 
              <TermBadge definition="A state management pattern + library for JavaScript applications" className="mx-1">Redux</TermBadge>
              connecting to 
              <TermBadge definition="An open source SQL database management system" className="mx-1">PostgreSQL</TermBadge>
              databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCVSlide;

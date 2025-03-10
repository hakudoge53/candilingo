
import React from 'react';
import TermBadge from "@/components/TermBadge";

const SkillsSection = () => {
  return (
    <div>
      <h4 className="font-medium">Skills</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        <TermBadge definition="JavaScript is a programming language used to create interactive effects within web browsers">JavaScript</TermBadge>
        <TermBadge definition="TypeScript is a strict syntactical superset of JavaScript that adds static typing">TypeScript</TermBadge>
        <TermBadge definition="Java Enterprise Edition - A platform for server-side application development">Java EE</TermBadge>
        <TermBadge definition="Spring Boot is an open source Java-based framework used to create microservices">Spring Boot</TermBadge>
        <TermBadge definition="A popular JavaScript library for building user interfaces">React</TermBadge>
        <TermBadge definition="A JavaScript framework for building web applications">Vue.js</TermBadge>
        <TermBadge definition="Representational State Transfer - An architectural style for designing networked applications">RESTful APIs</TermBadge>
        <TermBadge definition="An open source SQL database management system">PostgreSQL</TermBadge>
        <TermBadge definition="A NoSQL document database">MongoDB</TermBadge>
      </div>
    </div>
  );
};

export default SkillsSection;

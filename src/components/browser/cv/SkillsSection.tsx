
import React from 'react';
import TermBadge from "@/components/TermBadge";

const SkillsSection = () => {
  return (
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
  );
};

export default SkillsSection;

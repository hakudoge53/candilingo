
import { GlossaryTerm } from '@/types/glossary';

export const glossaryTerms: GlossaryTerm[] = [
  { 
    term: "Spring Boot", 
    definition: "An open-source Java-based framework used to create microservice applications. It provides pre-configured settings for a fast development environment.", 
    category: "Backend Frameworks",
    relatedTerms: ["Java EE", "RESTful APIs", "MVC architecture"] 
  },
  { 
    term: "Java EE", 
    definition: "Java Enterprise Edition - A platform for server-side application development", 
    category: "Languages & Platforms",
    relatedTerms: ["Spring Boot"] 
  },
  { 
    term: "React", 
    definition: "A popular JavaScript library for building user interfaces", 
    category: "Frontend Frameworks",
    relatedTerms: ["JavaScript", "TypeScript", "SPAs", "Redux"] 
  },
  { 
    term: "RESTful APIs", 
    definition: "Representational State Transfer - An architectural style for designing networked applications", 
    category: "Architecture",
    relatedTerms: ["Spring Boot", "MVC architecture"] 
  },
  { 
    term: "PostgreSQL", 
    definition: "An open source SQL database management system", 
    category: "Databases",
    relatedTerms: ["MongoDB"] 
  },
  { 
    term: "CI/CD", 
    definition: "Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed", 
    category: "DevOps",
    relatedTerms: ["Jenkins", "Docker", "Kubernetes"] 
  },
  { 
    term: "Jenkins", 
    definition: "An open source automation server that helps automate software development", 
    category: "DevOps",
    relatedTerms: ["CI/CD", "Docker"] 
  },
  { 
    term: "Docker", 
    definition: "An open source tool for creating lightweight, portable virtualized application containers", 
    category: "DevOps",
    relatedTerms: ["Kubernetes", "CI/CD"] 
  },
  { 
    term: "Kubernetes", 
    definition: "A container orchestration system for automating deployment and management", 
    category: "DevOps",
    relatedTerms: ["Docker", "CI/CD"] 
  },
  { 
    term: "MVC architecture", 
    definition: "A software design pattern that supports the building of maintainable applications", 
    category: "Architecture",
    relatedTerms: ["Spring Boot", "RESTful APIs"] 
  },
  { 
    term: "Agile methodologies", 
    definition: "A software development methodology that emphasizes incremental delivery and team collaboration", 
    category: "Methodology" 
  },
  {
    term: "JavaScript",
    definition: "JavaScript is a programming language used to create interactive effects within web browsers",
    category: "Languages & Platforms",
    relatedTerms: ["TypeScript", "React", "Vue.js"]
  },
  {
    term: "TypeScript",
    definition: "TypeScript is a strict syntactical superset of JavaScript that adds static typing",
    category: "Languages & Platforms",
    relatedTerms: ["JavaScript", "React", "Vue.js"]
  },
  {
    term: "Vue.js",
    definition: "A JavaScript framework for building web applications",
    category: "Frontend Frameworks",
    relatedTerms: ["JavaScript", "TypeScript", "React", "SPAs"]
  },
  {
    term: "MongoDB",
    definition: "A NoSQL document database",
    category: "Databases",
    relatedTerms: ["PostgreSQL"]
  },
  {
    term: "SPAs",
    definition: "Single Page Applications - Web apps that load a single HTML page and dynamically update content",
    category: "Architecture",
    relatedTerms: ["React", "Vue.js"]
  },
  {
    term: "Redux",
    definition: "A state management pattern + library for JavaScript applications",
    category: "Frontend Frameworks",
    relatedTerms: ["React"]
  }
];

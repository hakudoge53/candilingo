
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const Glossary = () => {
  // Sample glossary data - in a real app this would come from an API
  const glossaryTerms: GlossaryTerm[] = [
    { 
      term: "Spring Boot", 
      definition: "An open-source Java-based framework used to create microservice applications. It provides pre-configured settings for a fast development environment.", 
      category: "Backend Frameworks" 
    },
    { 
      term: "Java EE", 
      definition: "Java Enterprise Edition - A platform for server-side application development", 
      category: "Languages & Platforms" 
    },
    { 
      term: "React", 
      definition: "A popular JavaScript library for building user interfaces", 
      category: "Frontend Frameworks" 
    },
    { 
      term: "RESTful APIs", 
      definition: "Representational State Transfer - An architectural style for designing networked applications", 
      category: "Architecture" 
    },
    { 
      term: "PostgreSQL", 
      definition: "An open source SQL database management system", 
      category: "Databases" 
    },
    { 
      term: "CI/CD", 
      definition: "Continuous Integration and Continuous Deployment - Practices that enable frequent code changes to be automatically tested and deployed", 
      category: "DevOps" 
    },
    { 
      term: "Jenkins", 
      definition: "An open source automation server that helps automate software development", 
      category: "DevOps" 
    },
    { 
      term: "Docker", 
      definition: "An open source tool for creating lightweight, portable virtualized application containers", 
      category: "DevOps" 
    },
    { 
      term: "Kubernetes", 
      definition: "A container orchestration system for automating deployment and management", 
      category: "DevOps" 
    },
    { 
      term: "MVC architecture", 
      definition: "A software design pattern that supports the building of maintainable applications", 
      category: "Architecture" 
    },
    { 
      term: "Agile methodologies", 
      definition: "A software development methodology that emphasizes incremental delivery and team collaboration", 
      category: "Methodology" 
    },
    {
      term: "JavaScript",
      definition: "JavaScript is a programming language used to create interactive effects within web browsers",
      category: "Languages & Platforms"
    },
    {
      term: "TypeScript",
      definition: "TypeScript is a strict syntactical superset of JavaScript that adds static typing",
      category: "Languages & Platforms"
    },
    {
      term: "Vue.js",
      definition: "A JavaScript framework for building web applications",
      category: "Frontend Frameworks"
    },
    {
      term: "MongoDB",
      definition: "A NoSQL document database",
      category: "Databases"
    },
    {
      term: "SPAs",
      definition: "Single Page Applications - Web apps that load a single HTML page and dynamically update content",
      category: "Architecture"
    },
    {
      term: "Redux",
      definition: "A state management pattern + library for JavaScript applications",
      category: "Frontend Frameworks"
    }
  ];

  // Group terms by category
  const groupedTerms = glossaryTerms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedTerms).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-techlex-blue">TechLex Glossary</h1>
          <p className="text-gray-600 mb-8 text-lg">
            This comprehensive glossary contains technical terms and definitions used in software development, 
            making it easier to understand technical jargon in candidate resumes and job descriptions.
          </p>

          <div className="glossary-fade-in space-y-8 mb-12">
            {sortedCategories.map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-techlex-blue">{category}</h2>
                <div className="space-y-4">
                  {groupedTerms[category].map((term) => (
                    <div key={term.term} className="group">
                      <div className="flex items-start">
                        <Badge variant="default" className="mt-1 bg-techlex-pink text-white">
                          {term.term}
                        </Badge>
                        <div className="ml-3">
                          <p className="text-gray-700">{term.definition}</p>
                        </div>
                      </div>
                      <Separator className="mt-4 opacity-50" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-techlex-pink-lighter rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold mb-2 text-techlex-blue">API Access</h2>
            <p className="text-gray-700 mb-4">
              This glossary is available via API for developer use. Integrate our technical term definitions 
              directly into your applications. Perfect for browser extensions.
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm overflow-x-auto">
              <code>GET https://api.techlex.eu/glossary</code>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Glossary;

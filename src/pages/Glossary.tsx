
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  
  // Sample glossary data - in a real app this would come from an API
  const glossaryTerms: GlossaryTerm[] = [
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

  // Handle filtering terms
  const filteredCategories = activeCategory 
    ? [activeCategory] 
    : searchTerm 
      ? sortedCategories.filter(category => 
          groupedTerms[category].some(term => 
            term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : sortedCategories;

  // Filtered terms based on search input and active category
  const getFilteredTerms = (category: string) => {
    return searchTerm
      ? groupedTerms[category].filter(term => 
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : groupedTerms[category];
  };

  // Jump to a term when clicked in the related terms
  const jumpToTerm = (term: string) => {
    // Find the term in the glossary
    const foundTerm = glossaryTerms.find(t => t.term === term);
    if (foundTerm) {
      setActiveCategory(foundTerm.category);
      setSearchTerm(term);
      
      // Scroll to the term
      setTimeout(() => {
        const element = document.getElementById(`term-${term.replace(/\s+/g, '-')}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('bg-amber-50');
          setTimeout(() => {
            element.classList.remove('bg-amber-50');
          }, 2000);
        }
      }, 100);
    }
  };

  // Copy term API reference
  const copyTermApiRef = (term: string) => {
    navigator.clipboard.writeText(`https://api.techlex.eu/glossary/term/${term.toLowerCase().replace(/\s+/g, '-')}`);
    setCopiedTerm(term);
    toast.success(`API reference for "${term}" copied to clipboard`);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory(null);
  };

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

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search terms or definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="whitespace-nowrap"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {sortedCategories.map(category => (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${activeCategory === category ? 'bg-techlex-blue' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="glossary-fade-in space-y-8 mb-12">
            {filteredCategories.map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-techlex-blue">{category}</h2>
                <div className="space-y-4">
                  {getFilteredTerms(category).map((term) => (
                    <div key={term.term} id={`term-${term.term.replace(/\s+/g, '-')}`} className="group transition-all duration-300">
                      <div className="flex items-start">
                        <Badge variant="default" className="mt-1 bg-techlex-pink text-white">
                          {term.term}
                        </Badge>
                        <div className="ml-3">
                          <p className="text-gray-700">{term.definition}</p>
                          
                          {/* Related Terms */}
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500">Related: </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {term.relatedTerms.map(relatedTerm => (
                                  <Badge 
                                    key={relatedTerm} 
                                    variant="outline"
                                    className="text-xs cursor-pointer hover:bg-gray-100"
                                    onClick={() => jumpToTerm(relatedTerm)}
                                  >
                                    {relatedTerm}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* API Reference */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyTermApiRef(term.term)}
                              >
                                {copiedTerm === term.term ? "Copied!" : "API"}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy API reference</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
            <div className="mt-4 text-sm text-gray-600">
              <p>Individual term: <code className="bg-gray-100 px-1 py-0.5 rounded">GET https://api.techlex.eu/glossary/term/{"{term-slug}"}</code></p>
              <p>Terms by category: <code className="bg-gray-100 px-1 py-0.5 rounded">GET https://api.techlex.eu/glossary/category/{"{category-slug}"}</code></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Glossary;

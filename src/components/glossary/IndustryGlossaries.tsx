
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TermBadge from "@/components/TermBadge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Define industry-specific glossary data structure
interface IndustryTerm {
  term: string;
  definition: string;
}

interface IndustryGlossary {
  id: string;
  name: string;
  description: string;
  terms: IndustryTerm[];
}

// Sample data for industry-specific glossaries
const industryGlossaries: IndustryGlossary[] = [
  {
    id: "software-development",
    name: "Software Development",
    description: "Terms commonly used in software development and engineering",
    terms: [
      { term: "API", definition: "Application Programming Interface - A set of rules and protocols that allows different software applications to communicate with each other" },
      { term: "CI/CD", definition: "Continuous Integration/Continuous Deployment - Practices of automating the integration of code changes and the deployment of applications" },
      { term: "DevOps", definition: "Development Operations - A set of practices that combines software development and IT operations to shorten development cycles" },
      { term: "Git", definition: "A distributed version control system used to track changes in source code during software development" },
      { term: "Microservices", definition: "An architectural style that structures an application as a collection of small, loosely coupled services" }
    ]
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Terms related to data science, analytics, and machine learning",
    terms: [
      { term: "Machine Learning", definition: "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed" },
      { term: "Neural Network", definition: "A computing system inspired by biological neural networks that form the basis of deep learning algorithms" },
      { term: "Data Mining", definition: "The process of discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems" },
      { term: "Big Data", definition: "Extremely large data sets that may be analyzed computationally to reveal patterns, trends, and associations" },
      { term: "Regression", definition: "A statistical process for estimating the relationships between variables" }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare IT",
    description: "Terms specific to healthcare information technology",
    terms: [
      { term: "EHR", definition: "Electronic Health Record - Digital version of a patient's paper chart containing their medical history" },
      { term: "HIPAA", definition: "Health Insurance Portability and Accountability Act - US legislation that provides data privacy and security provisions for safeguarding medical information" },
      { term: "Interoperability", definition: "The ability of different information systems, devices and applications to access, exchange, integrate and use data in a coordinated manner" },
      { term: "Telehealth", definition: "The distribution of health-related services and information via electronic information and telecommunication technologies" },
      { term: "HL7", definition: "Health Level Seven - A set of international standards for transfer of clinical and administrative data between software applications" }
    ]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Terms used in financial technology and banking systems",
    terms: [
      { term: "Blockchain", definition: "A distributed, decentralized, public ledger used to record transactions across many computers" },
      { term: "Cryptocurrency", definition: "A digital or virtual currency that uses cryptography for security" },
      { term: "KYC", definition: "Know Your Customer - The process of a business verifying the identity of its clients" },
      { term: "Open Banking", definition: "A system that provides third-party financial service providers with access to consumer banking, transaction, and other financial data" },
      { term: "Payment Gateway", definition: "A merchant service provided by an e-commerce application service provider that authorizes credit card payments" }
    ]
  }
];

const IndustryGlossaries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter terms based on search
  const filterTerms = (terms: IndustryTerm[]) => {
    if (!searchTerm.trim()) return terms;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return terms.filter(term => 
      term.term.toLowerCase().includes(lowerSearchTerm) ||
      term.definition.toLowerCase().includes(lowerSearchTerm)
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-candilingo-purple">Industry-Specific Glossaries</h2>
      <p className="text-gray-600 mb-6">
        Browse our specialized glossaries tailored to different industries and technical domains.
      </p>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search terms across all industries..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue={industryGlossaries[0].id} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto mb-6 flex-wrap">
          {industryGlossaries.map(industry => (
            <TabsTrigger key={industry.id} value={industry.id} className="px-4 py-2">
              {industry.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {industryGlossaries.map(industry => (
          <TabsContent key={industry.id} value={industry.id} className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-6">{industry.description}</p>
                <div className="space-y-6">
                  {filterTerms(industry.terms).length > 0 ? (
                    filterTerms(industry.terms).map((term, index) => (
                      <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                        <TermBadge definition={term.definition}>{term.term}</TermBadge>
                        <p className="mt-2 text-gray-700">{term.definition}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">No terms match your search.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default IndustryGlossaries;

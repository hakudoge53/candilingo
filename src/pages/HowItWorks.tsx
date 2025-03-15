
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import FAQSection from "@/components/sections/FAQSection";
import { Separator } from "@/components/ui/separator";
import TermBadge from "@/components/TermBadge";
import TooltipOverlay from "@/components/browser/TooltipOverlay";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>How It Works - Candilingo</title>
        <meta name="description" content="Learn how Candilingo AI-Powered Keyword Highlighter works to improve your technical recruitment process" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-candilingo-purple">How It Works</h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn how Candilingo helps you understand technical terms and improve your technical recruitment process.
          </p>
          
          <Separator className="my-8" />
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-candilingo-purple">Key Terms in Technical Recruitment</h2>
            <p className="mb-4">
              Understanding technical terminology is crucial for effective recruitment. Here are some common terms you'll encounter:
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <TermBadge term="API">API</TermBadge>
              <TermBadge term="UI">UI</TermBadge>
              <TermBadge term="UX">UX</TermBadge>
              <TermBadge term="SQL">SQL</TermBadge>
              <TermBadge term="Git">Git</TermBadge>
              <TermBadge term="Docker">Docker</TermBadge>
              <TermBadge term="CI/CD">CI/CD</TermBadge>
              <TermBadge term="REST">REST</TermBadge>
              <TermBadge term="JSON">JSON</TermBadge>
              <TermBadge term="NoSQL">NoSQL</TermBadge>
              <TermBadge term="Machine Learning">Machine Learning</TermBadge>
              <TermBadge term="Neural Network">Neural Network</TermBadge>
            </div>
            
            <p className="text-gray-600 italic text-sm">
              Hover over these terms to see their definitions. This is similar to how Candilingo works in your browser!
            </p>
          </div>
          
          <div className="relative mb-12 border border-gray-200 p-6 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-6 text-candilingo-purple">See It In Action</h2>
            <p className="mb-4">
              When browsing technical profiles or documentation, Candilingo highlights key terms and provides instant definitions:
            </p>
            
            <div className="relative border border-gray-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-700">
                The candidate has experience with <span className="bg-candilingo-pink text-white px-2 py-0.5 rounded">Spring Boot</span> and 
                <span className="bg-candilingo-pink text-white px-2 py-0.5 rounded mx-1">Kubernetes</span> for building and deploying microservices.
                They've also worked with <span className="bg-candilingo-pink text-white px-2 py-0.5 rounded">MongoDB</span> databases and
                <span className="bg-candilingo-pink text-white px-2 py-0.5 rounded mx-1">RESTful APIs</span>.
              </p>
              
              <TooltipOverlay 
                title="Spring Boot" 
                description="An open source Java-based framework used to create microservices and web applications"
                position="right"
                className="top-2 right-12"
              />
            </div>
            
            <p className="text-gray-600 italic text-sm">
              This example shows how Candilingo makes it easy to understand technical terms in context.
            </p>
          </div>
        </div>
        
        <HowItWorksSection />
        <FAQSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;

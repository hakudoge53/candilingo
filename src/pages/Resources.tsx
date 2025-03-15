
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import FAQSection from "@/components/sections/FAQSection";
import { Separator } from "@/components/ui/separator";
import TermBadge from "@/components/TermBadge";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Resources - Candilingo</title>
        <meta name="description" content="Resources, guides and frequently asked questions about Candilingo - the AI-Powered Keyword Highlighter for Recruiters" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-candilingo-purple">Resources</h1>
          <p className="text-lg text-gray-600 mb-8">
            Everything you need to know about using Candilingo to improve your technical recruitment process.
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
        </div>
        
        <FAQSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;

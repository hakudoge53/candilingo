
import { useState } from 'react';
import { BookOpenText, BrainCircuit, FileText, Languages, Search, Zap, BookOpen, GraduationCap, MessageCircleQuestion, ChevronDown, ChevronUp, Clock } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const toggleFeatures = () => {
    setShowAllFeatures(!showAllFeatures);
  };

  return (
    <section id="features" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-candilingo-purple">
            Simplify Technical Recruitment
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Candilingo empowers recruitment professionals to understand and evaluate technical candidates with confidence.
          </p>
          
          <div className="bg-candilingo-purple bg-opacity-5 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-candilingo-purple">4-in-1 Complete Recruitment Solution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-candilingo-purple border-opacity-20 transition-all duration-300 hover:shadow-md hover:border-opacity-30">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 text-candilingo-purple mr-2" />
                  <h4 className="font-semibold">CV Reader</h4>
                </div>
                <p className="text-sm text-gray-600">Analyze and understand technical CVs with smart term recognition</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-candilingo-purple border-opacity-20 transition-all duration-300 hover:shadow-md hover:border-opacity-30">
                <div className="flex items-center mb-2">
                  <Search className="w-5 h-5 text-candilingo-coral mr-2" />
                  <h4 className="font-semibold">Web Extension</h4>
                </div>
                <p className="text-sm text-gray-600">Get instant explanations on any technical content online</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-candilingo-purple border-opacity-20 transition-all duration-300 hover:shadow-md hover:border-opacity-30 relative">
                <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full border border-amber-200">
                  Coming Soon
                </div>
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-candilingo-teal mr-2" />
                  <h4 className="font-semibold">Public & Company Wikis</h4>
                </div>
                <p className="text-sm text-gray-600">Access and build knowledge bases with shareable glossaries</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-candilingo-purple border-opacity-20 transition-all duration-300 hover:shadow-md hover:border-opacity-30 relative">
                <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full border border-amber-200">
                  Coming Soon
                </div>
                <div className="flex items-center mb-2">
                  <BrainCircuit className="w-5 h-5 text-candilingo-lightpurple mr-2" />
                  <h4 className="font-semibold">Recruitment Assistant</h4>
                </div>
                <p className="text-sm text-gray-600">AI-powered features to boost your recruitment process</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline-coral" 
            onClick={toggleFeatures} 
            className="mb-10 flex items-center gap-2 mx-auto hover:bg-candilingo-coral/10"
          >
            {showAllFeatures ? "Less is More" : "See All Features"}
            {showAllFeatures ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Feature cards - only displayed when showAllFeatures is true */}
        {showAllFeatures && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in">
            <FeatureCard
              title="Instant Term Recognition"
              description="Automatically identifies and explains technical terms in CVs, cover letters, and online job applications."
              icon={<Search className="w-6 h-6" />}
              className="animate-fade-in"
            />
            <FeatureCard
              title="Custom Glossaries"
              description="Create industry or company-specific term repositories to onboard new team members and standardize knowledge."
              icon={<BookOpenText className="w-6 h-6" />}
              className="animate-fade-in-slow"
            />
            <FeatureCard
              title="PDF & Document Support"
              description="Works seamlessly with uploaded PDFs, online documents, and web content for complete coverage."
              icon={<FileText className="w-6 h-6" />}
              className="animate-fade-in-slower"
            />
            <FeatureCard
              title="AI-Powered Explanations"
              description="Advanced AI provides accurate, contextual explanations of complex technical concepts."
              icon={<BrainCircuit className="w-6 h-6" />}
              className="animate-fade-in"
              comingSoon={true}
            />
            <FeatureCard
              title="Multilingual Support"
              description="Understand technical terminology across multiple European languages for international recruitment."
              icon={<Languages className="w-5 h-5" />}
              className="animate-fade-in-slow"
            />
            <FeatureCard
              title="One-Click Integration"
              description="Easy browser extension installation with no complicated setup or configuration required."
              icon={<Zap className="w-6 h-6" />}
              className="animate-fade-in-slower"
            />
            <FeatureCard
              title="Company Wiki"
              description="Build and maintain a centralized knowledge base of company-specific terminology, processes, and best practices."
              icon={<BookOpen className="w-6 h-6" />}
              className="animate-fade-in"
              comingSoon={true}
            />
            <FeatureCard
              title="On-the-Job Learning"
              description="Facilitate continuous learning with contextual explanations of technical concepts as employees encounter them in their work."
              icon={<GraduationCap className="w-6 h-6" />}
              className="animate-fade-in-slow"
            />
            <FeatureCard
              title="Offline Reader"
              description="Access your glossaries and technical explanations even when you're offline. Perfect for reviewing CVs anywhere."
              icon={<Clock className="w-6 h-6" />}
              className="animate-fade-in-slower"
              comingSoon={true}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;

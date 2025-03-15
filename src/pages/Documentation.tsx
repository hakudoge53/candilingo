
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, Book, FileText, Code, Users, Settings, ChevronDown } from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [openCategories, setOpenCategories] = useState<{[key: string]: boolean}>({
    'getting-started': true,
    'features': false,
    'api': false,
    'guides': false
  });

  useEffect(() => {
    document.title = "Documentation | Candilingo";
  }, []);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-candilingo-purple to-candilingo-teal py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Candilingo Documentation</h1>
          <p className="text-white/90 text-center max-w-2xl mx-auto mb-8">
            Everything you need to know to get the most out of Candilingo
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full py-3 px-5 pr-12 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Documentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-lg text-candilingo-darkpurple">Documentation</h2>
              </div>
              
              <div className="p-2">
                <div className="space-y-1">
                  {/* Getting Started */}
                  <div>
                    <button 
                      onClick={() => toggleCategory('getting-started')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4 text-candilingo-purple" />
                        <span className="font-medium">Getting Started</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openCategories['getting-started'] ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {openCategories['getting-started'] && (
                      <div className="pl-9 pr-3 pb-1 space-y-1">
                        <a 
                          href="#" 
                          className={`block py-1 px-2 rounded text-sm ${activeSection === 'getting-started' ? 'bg-candilingo-purple/10 text-candilingo-purple font-medium' : 'text-gray-600 hover:text-candilingo-purple'}`}
                          onClick={() => setActiveSection('getting-started')}
                        >
                          Introduction
                        </a>
                        <a 
                          href="#" 
                          className={`block py-1 px-2 rounded text-sm ${activeSection === 'installation' ? 'bg-candilingo-purple/10 text-candilingo-purple font-medium' : 'text-gray-600 hover:text-candilingo-purple'}`}
                          onClick={() => setActiveSection('installation')}
                        >
                          Installation
                        </a>
                        <a 
                          href="#" 
                          className={`block py-1 px-2 rounded text-sm ${activeSection === 'quick-start' ? 'bg-candilingo-purple/10 text-candilingo-purple font-medium' : 'text-gray-600 hover:text-candilingo-purple'}`}
                          onClick={() => setActiveSection('quick-start')}
                        >
                          Quick Start Guide
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div>
                    <button 
                      onClick={() => toggleCategory('features')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-candilingo-teal" />
                        <span className="font-medium">Features</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openCategories['features'] ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {openCategories['features'] && (
                      <div className="pl-9 pr-3 pb-1 space-y-1">
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-teal">AI Assistant</a>
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-teal">Browser Extension</a>
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-teal">Tech Dictionary</a>
                      </div>
                    )}
                  </div>
                  
                  {/* API Reference */}
                  <div>
                    <button 
                      onClick={() => toggleCategory('api')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-candilingo-coral" />
                        <span className="font-medium">API Reference</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openCategories['api'] ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {openCategories['api'] && (
                      <div className="pl-9 pr-3 pb-1 space-y-1">
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-coral">Authentication</a>
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-coral">Endpoints</a>
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-coral">Rate Limits</a>
                      </div>
                    )}
                  </div>
                  
                  {/* Guides */}
                  <div>
                    <button 
                      onClick={() => toggleCategory('guides')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-candilingo-pink" />
                        <span className="font-medium">Guides</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openCategories['guides'] ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {openCategories['guides'] && (
                      <div className="pl-9 pr-3 pb-1 space-y-1">
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-pink">For Recruiters</a>
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-pink">For Agencies</a>
                        <a href="#" className="block py-1 px-2 rounded text-sm text-gray-600 hover:text-candilingo-pink">For HR Teams</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold text-candilingo-darkpurple mb-4">Getting Started with Candilingo</h1>
                
                <p className="text-gray-600 mb-6">
                  Welcome to Candilingo, the AI-powered platform designed to help recruiters decode technical jargon and make better hiring decisions. This guide will help you get started with Candilingo and explain the basic concepts.
                </p>
                
                <h2 className="text-xl font-semibold text-candilingo-purple mt-8 mb-4">What is Candilingo?</h2>
                
                <p className="text-gray-600 mb-4">
                  Candilingo is a specialized tool for technical recruitment that helps recruiters understand and evaluate technical skills and experience. Our platform uses advanced AI to scan resumes, job descriptions, and LinkedIn profiles, highlighting and explaining technical terms in real-time.
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
                  <h3 className="font-medium text-candilingo-darkpurple mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>AI-powered term detection and explanation</li>
                    <li>Browser extension for LinkedIn and ATS integration</li>
                    <li>Customizable dictionaries and term preferences</li>
                    <li>Technical skill evaluation and scoring</li>
                    <li>Team collaboration tools for recruitment agencies</li>
                  </ul>
                </div>
                
                <h2 className="text-xl font-semibold text-candilingo-teal mt-8 mb-4">Getting Started</h2>
                
                <p className="text-gray-600 mb-4">
                  Follow these steps to get started with Candilingo and begin improving your technical recruitment process:
                </p>
                
                <ol className="list-decimal pl-5 space-y-4 text-gray-600 mb-6">
                  <li>
                    <strong className="text-candilingo-darkpurple">Create an account</strong>
                    <p>Sign up for Candilingo using your work email. We offer a free trial so you can experience the full benefits before committing.</p>
                  </li>
                  <li>
                    <strong className="text-candilingo-darkpurple">Install the browser extension</strong>
                    <p>Our Chrome extension allows you to use Candilingo directly on LinkedIn, job boards, and your ATS system.</p>
                  </li>
                  <li>
                    <strong className="text-candilingo-darkpurple">Set up your preferences</strong>
                    <p>Configure which technical terms you want highlighted and what information you need to see about each term.</p>
                  </li>
                  <li>
                    <strong className="text-candilingo-darkpurple">Start using Candilingo</strong>
                    <p>Browse LinkedIn profiles or upload resumes to see Candilingo in action. Hover over highlighted terms to see explanations.</p>
                  </li>
                </ol>
                
                <div className="bg-gradient-to-r from-candilingo-teal/10 to-candilingo-purple/10 rounded-lg p-5 border border-candilingo-teal/20 my-8">
                  <h3 className="font-semibold text-candilingo-darkpurple mb-3">Need Help?</h3>
                  <p className="text-gray-600 mb-3">
                    Our support team is available to help you get the most out of Candilingo.
                  </p>
                  <a href="#" className="inline-block bg-gradient-to-r from-candilingo-teal to-candilingo-purple text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Documentation;

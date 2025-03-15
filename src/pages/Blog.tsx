
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Candilingo";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-candilingo-purple to-candilingo-pink py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Candilingo Blog</h1>
          <p className="text-white/90 text-center max-w-2xl mx-auto">
            Latest insights, tips, and news about technical recruiting and Candilingo
          </p>
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
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              {/* Featured Article */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-candilingo-teal to-candilingo-purple opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white px-6 text-center">How AI is Transforming Technical Recruitment</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>May 15, 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Sarah Johnson</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <span>AI, Recruitment</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Artificial intelligence is revolutionizing how recruiters evaluate technical candidates. 
                    Learn how to leverage these tools to make better hiring decisions and streamline your recruitment process.
                  </p>
                  <a href="#" className="inline-flex items-center text-candilingo-teal hover:text-candilingo-darkteal font-medium transition-colors">
                    Read full article <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Regular Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>May {i + 10}, 2025</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-candilingo-darkpurple">
                        Understanding Technical Skills in Modern Development
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        A comprehensive guide to evaluating technical skills and understanding the modern development landscape.
                      </p>
                      <a href="#" className="text-sm font-medium text-candilingo-purple hover:text-candilingo-darkpurple transition-colors">
                        Read more →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6">
              <h3 className="font-bold text-lg mb-4 text-candilingo-purple">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-600 hover:text-candilingo-purple transition-colors">
                    <span>Technical Recruitment</span>
                    <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">12</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-600 hover:text-candilingo-purple transition-colors">
                    <span>AI Tools</span>
                    <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">8</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-600 hover:text-candilingo-purple transition-colors">
                    <span>Technical Interviews</span>
                    <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">6</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-600 hover:text-candilingo-purple transition-colors">
                    <span>Industry Trends</span>
                    <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">4</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-candilingo-teal/10 to-candilingo-purple/10 rounded-lg border border-candilingo-teal/20 p-5">
              <h3 className="font-bold text-lg mb-4 text-candilingo-darkpurple">Subscribe to our newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-candilingo-teal focus:border-transparent"
                />
                <button className="w-full bg-gradient-to-r from-candilingo-teal to-candilingo-teal/80 text-white font-medium py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;

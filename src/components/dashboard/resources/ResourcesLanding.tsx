
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Route, ExternalLink, BookOpen, Video, HelpCircle, Download } from "lucide-react";

const ResourcesLanding: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Resources Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-candilingo-purple/5 to-candilingo-teal/5 p-6 rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold text-candilingo-purple flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Resources & Knowledge Base
          </h2>
          <p className="text-gray-600">
            Access documentation, guides, tutorials, and development roadmap
          </p>
        </div>
        
        <Button className="bg-candilingo-purple hover:bg-candilingo-darkpurple">
          <HelpCircle className="mr-2 h-4 w-4" />
          Get Support
        </Button>
      </div>

      {/* Documentation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-candilingo-purple" />
            Documentation
          </CardTitle>
          <CardDescription>
            Comprehensive guides and API references
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Introduction to Candilingo and how to set up your first glossary
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0 text-candilingo-purple">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">API Reference</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Complete API documentation for developers
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0 text-candilingo-purple">
                  View API Docs <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Integration Guides</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  How to integrate Candilingo with your existing systems
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0 text-candilingo-purple">
                  View Guides <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Extension Downloads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="mr-2 h-5 w-5 text-candilingo-purple" />
            Browser Extensions
          </CardTitle>
          <CardDescription>
            Download and install browser extensions for Chrome and Firefox
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <img src="/lovable-uploads/30c70ee7-a470-4d43-b8f7-c4209c3a51bb.png" alt="Chrome" className="h-5 w-5 mr-2" />
                  Chrome Extension
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Install the Candilingo extension for Chrome
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-candilingo-purple">
                  <Download className="mr-2 h-4 w-4" /> Download for Chrome
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <img src="/lovable-uploads/30c70ee7-a470-4d43-b8f7-c4209c3a51bb.png" alt="Firefox" className="h-5 w-5 mr-2" />
                  Firefox Extension
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500">
                  Install the Candilingo extension for Firefox
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-candilingo-purple">
                  <Download className="mr-2 h-4 w-4" /> Download for Firefox
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Route className="mr-2 h-5 w-5 text-candilingo-purple" />
            Product Roadmap
          </CardTitle>
          <CardDescription>
            Upcoming features and development plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">AI-Powered Term Suggestions</h4>
                <p className="text-sm text-gray-500">Automatically suggest technical terms based on document content</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                In Development
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Team Collaboration Features</h4>
                <p className="text-sm text-gray-500">Enhanced team capabilities for glossary management</p>
              </div>
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                Planned
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Enhanced Analytics Dashboard</h4>
                <p className="text-sm text-gray-500">More detailed insights on extension usage and term popularity</p>
              </div>
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                Coming Soon
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="link" className="text-candilingo-purple">
              View Full Roadmap <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Tutorials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5 text-candilingo-purple" />
            Video Tutorials
          </CardTitle>
          <CardDescription>
            Learn how to use Candilingo through video walkthroughs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Getting Started Tutorial</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Advanced Features Tutorial</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesLanding;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourcesPanelProps {
  activeTab: string;
}

const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ activeTab }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resources</h2>
      </div>
      
      {activeTab === 'documentation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-candilingo-purple" />
                User Guide
              </CardTitle>
              <CardDescription>
                Complete documentation for using Candilingo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Learn how to create glossaries, manage terms, and use the browser extension effectively.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.open('/documentation', '_blank')}>
                <FileText className="mr-2 h-4 w-4" /> View Documentation
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-candilingo-teal" />
                API Reference
              </CardTitle>
              <CardDescription>
                Developer documentation for the Candilingo API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Technical documentation for developers integrating with the Candilingo platform.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.open('/documentation/api', '_blank')}>
                <ExternalLink className="mr-2 h-4 w-4" /> View API Docs
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Features</CardTitle>
              <CardDescription>
                Our development roadmap for the next 3 months
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-medium">AI-Powered CV Assistant</h3>
                <p className="text-sm text-gray-600">Advanced AI tool to automatically analyze and decode technical CVs.</p>
                <p className="text-xs text-gray-500 mt-1">Estimated: Q2 2023</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-medium">Custom TechLingo Dictionary</h3>
                <p className="text-sm text-gray-600">Build your own company-specific technical dictionary.</p>
                <p className="text-xs text-gray-500 mt-1">Estimated: Q3 2023</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-medium">Team Collaboration Tools</h3>
                <p className="text-sm text-gray-600">Share notes and insights on candidates with your team.</p>
                <p className="text-xs text-gray-500 mt-1">Estimated: Q3 2023</p>
              </div>
              
              <Button variant="outline" className="w-full mt-4" onClick={() => window.open('https://github.com/candilingo/roadmap', '_blank')}>
                <Github className="mr-2 h-4 w-4" /> View Full Roadmap on GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResourcesPanel;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, BookOpen, Video, Download, ExternalLink, Search, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const ResourcesDocumentationPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Documentation</h2>
        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search documentation..." className="pl-8" />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList className="w-full bg-muted">
          <TabsTrigger value="guides" className="flex-1">User Guides</TabsTrigger>
          <TabsTrigger value="api" className="flex-1">API Documentation</TabsTrigger>
          <TabsTrigger value="tutorials" className="flex-1">Video Tutorials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResourceCard 
              title="Getting Started" 
              description="Learn the basics of Candilingo and how to set up your account."
              icon={<BookOpen className="h-5 w-5" />}
              color="candilingo-purple"
            />
            <ResourceCard 
              title="Browser Extensions" 
              description="How to install and use Candilingo browser extensions."
              icon={<FileText className="h-5 w-5" />}
              color="candilingo-teal"
            />
            <ResourceCard 
              title="Custom Glossaries" 
              description="Create and manage your organization's custom glossaries."
              icon={<FileText className="h-5 w-5" />}
              color="candilingo-pink"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Guides</CardTitle>
              <CardDescription>Most frequently accessed documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <FileText className="h-4 w-4 mr-3 text-candilingo-purple" />
                  <span className="flex-1">How to create custom glossaries for your organization</span>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </li>
                <li className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <FileText className="h-4 w-4 mr-3 text-candilingo-teal" />
                  <span className="flex-1">Setting up team permissions and access controls</span>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </li>
                <li className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <FileText className="h-4 w-4 mr-3 text-candilingo-pink" />
                  <span className="flex-1">Integrating Candilingo with your ATS system</span>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </li>
                <li className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <FileText className="h-4 w-4 mr-3 text-candilingo-purple" />
                  <span className="flex-1">Advanced features for technical recruiters</span>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </li>
                <li className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <FileText className="h-4 w-4 mr-3 text-candilingo-teal" />
                  <span className="flex-1">Troubleshooting the browser extension</span>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Integrate Candilingo with your existing tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Authentication</h3>
                <p className="text-sm text-gray-600 mb-3">Learn how to authenticate with the Candilingo API using API keys.</p>
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" /> Read Documentation
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Glossary API</h3>
                <p className="text-sm text-gray-600 mb-3">Create, read, update, and delete glossaries and terms programmatically.</p>
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" /> Read Documentation
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">User Management API</h3>
                <p className="text-sm text-gray-600 mb-3">Manage users, teams, and permissions via API endpoints.</p>
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" /> Read Documentation
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Analytics API</h3>
                <p className="text-sm text-gray-600 mb-3">Access usage metrics and analytics data for your organization.</p>
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" /> Read Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Introduction to Candilingo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  <Video className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Get familiar with the basic features and benefits of Candilingo.</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" /> Watch Tutorial
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Advanced Glossary Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  <Video className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Learn how to create, organize, and manage technical glossaries effectively.</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" /> Watch Tutorial
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Browser Extension Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  <Video className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Step-by-step guide to installing and configuring browser extensions.</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" /> Watch Tutorial
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Collaboration Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  <Video className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Discover how to collaborate with your team and share knowledge effectively.</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" /> Watch Tutorial
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ResourceCard = ({ title, description, icon, color }: ResourceCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className={`bg-${color}/10 p-2 rounded-full text-${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <FileText className="mr-2 h-4 w-4" /> View Documentation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourcesDocumentationPanel;

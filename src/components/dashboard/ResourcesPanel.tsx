
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, FileText, MapPin } from "lucide-react";

interface ResourcesPanelProps {
  activeTab?: string;
}

const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ 
  activeTab = 'documentation'
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Resources</h2>
      
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="documentation" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" /> Documentation
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" /> Roadmap
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>Documentation & Guides</CardTitle>
              <CardDescription>
                Resources to help you get the most out of Candilingo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <Bookmark className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Getting Started Guide</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Learn the basics of using Candilingo for your organization
                      </p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Beginner
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <div className="rounded-lg bg-purple-50 p-2">
                      <Bookmark className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Glossary Management</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        How to create, organize, and share tech glossaries
                      </p>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Intermediate
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <div className="rounded-lg bg-green-50 p-2">
                      <Bookmark className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Browser Extension</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        How to install and configure the browser extension
                      </p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Beginner
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-4 flex items-start space-x-4">
                    <div className="rounded-lg bg-orange-50 p-2">
                      <Bookmark className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Team Management</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Managing users, roles, and permissions
                      </p>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        Advanced
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Product Roadmap</CardTitle>
              <CardDescription>
                Upcoming features and improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timeline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AI-powered term suggestions</TableCell>
                    <TableCell>Automatic term suggestions based on your content</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Development</Badge>
                    </TableCell>
                    <TableCell>Q3 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Export to PDF/Word</TableCell>
                    <TableCell>Export glossaries to various document formats</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">Planned</Badge>
                    </TableCell>
                    <TableCell>Q4 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Multi-language support</TableCell>
                    <TableCell>Support for glossaries in multiple languages</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Under Review</Badge>
                    </TableCell>
                    <TableCell>Q1 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Enhanced analytics</TableCell>
                    <TableCell>Detailed usage statistics and insights</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Coming Soon</Badge>
                    </TableCell>
                    <TableCell>Q2 2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesPanel;

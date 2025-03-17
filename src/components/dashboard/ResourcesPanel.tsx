
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, FileText, Video, FileQuestion, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResourcesPanel = () => {
  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn how to set up and use Candilingo glossaries and extensions',
      icon: <Book className="h-5 w-5" />,
      url: '/documentation#getting-started'
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for integrating with our API',
      icon: <FileText className="h-5 w-5" />,
      url: '/documentation#api'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step visual guides for all features',
      icon: <Video className="h-5 w-5" />,
      url: '/documentation#tutorials'
    },
    {
      title: 'FAQs',
      description: 'Answers to common questions about our platform',
      icon: <FileQuestion className="h-5 w-5" />,
      url: '/documentation#faqs'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documentation & Resources</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">{resource.title}</CardTitle>
              <div className="w-10 h-10 rounded-full bg-candilingo-purple/10 flex items-center justify-center text-candilingo-purple">
                {resource.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{resource.description}</CardDescription>
              <Button variant="outline" size="sm" className="mt-2">
                View Resource <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need Additional Help?</CardTitle>
          <CardDescription>Our support team is ready to assist you with any questions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="purple" className="flex-1">
            Contact Support
          </Button>
          <Button variant="outline" className="flex-1">
            Join Community Forum
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPanel;

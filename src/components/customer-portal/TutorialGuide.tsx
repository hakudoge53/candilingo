
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Video, FileText, BookOpen } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Set Up Your Account",
    description: "Complete your profile information and set your preferences.",
    icon: <FileText className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Create or Join an Organization",
    description: "Organizations are the backbone of the system. Create one or join an existing one.",
    icon: <BookOpen className="h-6 w-6 text-green-500" />
  },
  {
    title: "Manage Glossaries",
    description: "Create glossaries for your organization and add technical terms.",
    icon: <BookOpen className="h-6 w-6 text-purple-500" />
  },
  {
    title: "Install the Browser Extension",
    description: "Get the full experience by installing our browser extension.",
    icon: <FileText className="h-6 w-6 text-orange-500" />
  }
];

const TutorialGuide: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Tutorial Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Welcome to the Customer Portal</DialogTitle>
          <DialogDescription>
            Follow this guide to get the most out of your experience.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="tutorial" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="tutorial" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Step-by-Step Guide
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Tutorial
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tutorial" className="p-4">
            <div className="space-y-6">
              {tutorialSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 rounded-full p-3">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <span className="bg-gray-200 text-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-end">
                <Button onClick={() => setOpen(false)}>
                  Get Started
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="p-4">
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center p-8">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Video Tutorial Coming Soon</h3>
                <p className="text-gray-600 mb-4">We're currently working on comprehensive video tutorials to help you get started.</p>
                <Button variant="outline" onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}>
                  Watch Placeholder Video
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialGuide;

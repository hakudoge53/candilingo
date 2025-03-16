
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, BookOpen, Globe, MessageSquare } from "lucide-react";

const RoadmapSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-5 w-5 text-candilingo-pink" />
        <h3 className="text-xl font-bold text-candilingo-pink">Roadmap</h3>
      </div>

      <div className="space-y-6">
        {/* Today's Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-candilingo-purple">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              <Button className="bg-candilingo-pink h-auto py-3 px-4 whitespace-normal text-xs">Extension</Button>
              <Button className="bg-candilingo-teal h-auto py-3 px-4 whitespace-normal text-xs">Wiki</Button>
              <Button className="bg-blue-500 h-auto py-3 px-4 whitespace-normal text-xs">Onboarding</Button>
              <Button className="bg-purple-500 h-auto py-3 px-4 whitespace-normal text-xs">Job Posting</Button>
              <Button className="bg-candilingo-purple h-auto py-3 px-4 whitespace-normal text-xs flex items-center justify-center">
                <Globe className="mr-1 h-3 w-3" />
                <span>Public Glossaries</span>
              </Button>
              <Button className="bg-candilingo-pink h-auto py-3 px-4 whitespace-normal text-xs flex items-center justify-center">
                <BookOpen className="mr-1 h-3 w-3" />
                <span>Company Glossaries</span>
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-candilingo-pink rounded-full"></div>
                <span className="text-sm">Keyword Scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-candilingo-pink rounded-full"></div>
                <span className="text-sm">Keyword Highlighter</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-candilingo-pink h-auto py-4 flex flex-col items-center">
            <BookOpen className="mb-1 h-5 w-5" />
            <span>Glossary</span>
          </Button>
          <Button className="bg-candilingo-teal h-auto py-4 flex flex-col items-center">
            <Sparkles className="mb-1 h-5 w-5" />
            <span>AI-Summarize</span>
          </Button>
          <Button className="bg-candilingo-coral h-auto py-4 flex flex-col items-center">
            <Globe className="mb-1 h-5 w-5" />
            <span>PDF Upload</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-candilingo-purple h-auto py-4 flex flex-col items-center">
            <MessageSquare className="mb-1 h-5 w-5" />
            <span>Online Functionality</span>
          </Button>
          <Button className="bg-pink-600 h-auto py-4 flex flex-col items-center">
            <Sparkles className="mb-1 h-5 w-5" />
            <span>API</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;


import React, { useState } from 'react';
import { User } from '@/hooks/auth/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import TechLingoWikiSection from './TechLingoWikiSection';

interface PublicDictionariesSectionProps {
  user: User;
  setLocalLoading: (loading: boolean) => void;
}

const PublicDictionariesSection: React.FC<PublicDictionariesSectionProps> = ({ user, setLocalLoading }) => {
  const [selectedView, setSelectedView] = useState<'dictionaries' | 'techlingo'>('dictionaries');

  // If TechLingo Wiki is selected, render that component
  if (selectedView === 'techlingo') {
    return (
      <div>
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedView('dictionaries')}
            className="mr-4"
          >
            ← Back to Dictionaries
          </Button>
          <h2 className="text-2xl font-bold">TechLingo Wiki</h2>
        </div>
        <TechLingoWikiSection user={user} setLocalLoading={setLocalLoading} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Public Dictionaries</h2>
        <p className="text-gray-600">
          Available public dictionaries that can enhance your understanding of technical terms.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2 bg-candilingo-purple/5">
            <CardTitle className="flex items-center text-xl">
              <Book className="h-5 w-5 mr-2 text-candilingo-purple" />
              Technical Dictionary
            </CardTitle>
            <CardDescription>
              Comprehensive list of technical terms and definitions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">500+ Terms</Badge>
              <Badge variant="outline">Software Development</Badge>
              <Badge variant="outline">IT</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our complete technical dictionary includes definitions for common technical terms 
              used in software development, IT, and related fields.
            </p>
            <div className="flex justify-between items-center">
              <Link to="/glossary">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open Dictionary
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2 bg-candilingo-pink/5">
            <CardTitle className="flex items-center text-xl">
              <Book className="h-5 w-5 mr-2 text-candilingo-pink" />
              <span className="text-candilingo-pink">AI Glossary</span>
            </CardTitle>
            <CardDescription>
              Artificial Intelligence and Machine Learning terminology
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">200+ Terms</Badge>
              <Badge variant="outline">Artificial Intelligence</Badge>
              <Badge variant="outline">Machine Learning</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A specialized glossary focusing on AI and ML terminology to help you understand 
              the rapidly evolving field of artificial intelligence.
            </p>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                Open Glossary
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2 bg-candilingo-teal/5">
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="h-5 w-5 mr-2 text-candilingo-teal" />
              TechLingo Wiki
            </CardTitle>
            <CardDescription>
              Crowdsourced technical terminology database
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">Community-Driven</Badge>
              <Badge variant="outline">Categorized</Badge>
              <Badge variant="outline">Regularly Updated</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our TechLingo Wiki is a collaborative database of technical terms that is constantly 
              evolving with contributions from our community.
            </p>
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setSelectedView('techlingo')}
                variant="outline" 
                size="sm" 
                className="flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Open TechLingo Wiki
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicDictionariesSection;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";

interface ResourcesPanelProps {
  activeTab: string;
}

const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ activeTab }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Resources</h2>
      
      {activeTab === 'documentation' && (
        <div className="grid gap-4 md:grid-cols-2">
          <ResourceCard 
            title="User Guide" 
            description="Learn how to use the platform effectively"
            link="https://docs.candilingo.com/guide"
          />
          <ResourceCard 
            title="API Documentation" 
            description="Integrate with our API"
            link="https://docs.candilingo.com/api"
          />
          <ResourceCard 
            title="Extension Setup" 
            description="Install and configure your browser extension"
            link="https://docs.candilingo.com/extension"
          />
          <ResourceCard 
            title="FAQ" 
            description="Frequently asked questions"
            link="https://docs.candilingo.com/faq"
          />
        </div>
      )}
      
      {activeTab === 'roadmap' && (
        <Card>
          <CardHeader>
            <CardTitle>Product Roadmap</CardTitle>
            <CardDescription>
              Our upcoming features and improvements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <RoadmapItem 
                title="AI-Powered Term Suggestions" 
                description="Automatically suggest terms to add to your glossary based on your content." 
                timeframe="Q2 2023" 
                status="development"
              />
              <RoadmapItem 
                title="Advanced Analytics" 
                description="Track how your team uses glossaries and identify knowledge gaps." 
                timeframe="Q3 2023" 
                status="planned"
              />
              <RoadmapItem 
                title="Mobile App" 
                description="Access your glossaries on iOS and Android." 
                timeframe="Q4 2023" 
                status="planned"
              />
              <RoadmapItem 
                title="Team Collaboration Tools" 
                description="Comment, suggest edits, and approve changes to glossary terms." 
                timeframe="Q1 2024" 
                status="researching"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-candilingo-blue hover:text-candilingo-blue-dark transition-colors"
        >
          View Documentation <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

interface RoadmapItemProps {
  title: string;
  description: string;
  timeframe: string;
  status: 'planned' | 'researching' | 'development' | 'testing' | 'completed';
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ title, description, timeframe, status }) => {
  const getStatusBadge = () => {
    const statusColors = {
      planned: 'bg-gray-200 text-gray-800',
      researching: 'bg-blue-100 text-blue-800',
      development: 'bg-yellow-100 text-yellow-800',
      testing: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800'
    };
    
    const statusLabels = {
      planned: 'Planned',
      researching: 'Researching',
      development: 'In Development',
      testing: 'Testing',
      completed: 'Completed'
    };
    
    return (
      <span className={`${statusColors[status]} px-2 py-1 rounded-full text-xs font-medium`}>
        {statusLabels[status]}
      </span>
    );
  };
  
  return (
    <div className="border-b pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{timeframe}</span>
          {getStatusBadge()}
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ResourcesPanel;

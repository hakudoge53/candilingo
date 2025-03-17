
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, ExternalLink, Github, HelpCircle, Mail, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

      {activeTab === 'faq' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5 text-candilingo-purple" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Common questions about using Candilingo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create a new glossary?</AccordionTrigger>
                <AccordionContent>
                  To create a new glossary, navigate to the "Glossaries" tab in your dashboard, click on the "Create New Glossary" button, provide a name and description, and click "Create".
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I invite team members?</AccordionTrigger>
                <AccordionContent>
                  Go to the "Organization" tab, click on "Invite Member", enter their email address and select their role, then click "Send Invitation". They'll receive an email with instructions to join.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does the browser extension work?</AccordionTrigger>
                <AccordionContent>
                  Once installed, the extension automatically highlights technical terms on web pages based on your active glossaries. Click on any highlighted term to see its definition.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What are the different user roles?</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Owner:</strong> Full access to organization settings, billing, and member management.</li>
                    <li><strong>Manager:</strong> Can manage organization resources and team members.</li>
                    <li><strong>Team Lead:</strong> Can lead projects and manage team assignments.</li>
                    <li><strong>Employee:</strong> Standard access to shared resources.</li>
                    <li><strong>Consultant:</strong> Limited access to specific resources.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I export my glossaries?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can export any glossary to CSV or JSON format. Open the glossary you want to export, click on the "Export" button in the top right, and select your preferred format.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {activeTab === 'support' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-candilingo-teal" />
                Email Support
              </CardTitle>
              <CardDescription>
                Get help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Our support team is available Monday through Friday, 9AM-5PM EST.
              </p>
              <Button className="w-full" onClick={() => window.location.href = 'mailto:support@candilingo.com'}>
                <Mail className="mr-2 h-4 w-4" /> support@candilingo.com
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-candilingo-coral" />
                Phone Support
              </CardTitle>
              <CardDescription>
                Call our customer service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Available for premium subscribers Monday through Friday, 9AM-5PM EST.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = 'tel:+18005551234'}>
                <Phone className="mr-2 h-4 w-4" /> +1 (800) 555-1234
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-candilingo-purple" />
                Privacy Policy
              </CardTitle>
              <CardDescription>
                How we handle your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                At Candilingo, we take your privacy seriously. Our comprehensive privacy policy outlines how we collect, use, and protect your data.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.open('/privacy-policy', '_blank')}>
                <Shield className="mr-2 h-4 w-4" /> View Privacy Policy
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResourcesPanel;

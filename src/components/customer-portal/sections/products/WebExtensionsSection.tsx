
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Globe, ScrollText, ArrowRight } from "lucide-react";

const WebExtensionsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-candilingo-pink" />
        <h3 className="text-xl font-semibold text-candilingo-pink">Web Extensions</h3>
      </div>

      <div className="space-y-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-2 border-b bg-gray-50">
            <CardTitle className="text-lg font-semibold text-candilingo-purple">Step 1 - Select your Browser</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 hover:border-candilingo-pink hover:bg-candilingo-pink/5">
                <Chrome className="h-10 w-10 mb-2" />
                <span>Google Chrome</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 hover:border-candilingo-pink hover:bg-candilingo-pink/5">
                <Globe className="h-10 w-10 mb-2" />
                <span>Microsoft Edge</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 hover:border-candilingo-pink hover:bg-candilingo-pink/5">
                <Globe className="h-10 w-10 mb-2" />
                <span>Firefox</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 hover:border-candilingo-pink hover:bg-candilingo-pink/5">
                <Globe className="h-10 w-10 mb-2" />
                <span>Safari</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2 border-b bg-gray-50">
            <CardTitle className="text-lg font-semibold text-candilingo-purple">Step 2 - Install Extension</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-600 mb-4">Follow the link & install our browser extension to start using Candilingo in your daily workflow.</p>
            <Button className="bg-candilingo-pink hover:bg-candilingo-lightpink">
              Follow link & Install <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2 border-b bg-gray-50">
            <CardTitle className="text-lg font-semibold text-candilingo-purple">Step 3 - Log in & Resume work</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-600 mb-4">Log in to the extension with your Candilingo account to access your dictionaries and settings.</p>
            <Button className="bg-candilingo-teal hover:bg-candilingo-lightteal">
              <ScrollText className="mr-2 h-4 w-4" />
              Log in & Resume work
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebExtensionsSection;

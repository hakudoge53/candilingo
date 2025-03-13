
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InstallationGuideProps {
  handleWebExtensionCheckout: (browser: string) => Promise<void>;
}

const InstallationGuide = ({ handleWebExtensionCheckout }: InstallationGuideProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-candilingo-purple">Installation Guide</CardTitle>
        <CardDescription>Follow these simple steps to install Candilingo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Chrome Installation</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Complete the purchase process</li>
              <li>Download the extension from the Chrome Web Store</li>
              <li>Click "Add to Chrome" in the top right</li>
              <li>Confirm by clicking "Add extension" in the popup</li>
            </ol>
            <Button 
              variant="pink" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => handleWebExtensionCheckout('chrome')}
            >
              Get Chrome Extension
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Firefox Installation</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Complete the purchase process</li>
              <li>Visit the Firefox Add-ons page for Candilingo</li>
              <li>Click "Add to Firefox"</li>
              <li>Confirm by clicking "Add" in the dialog</li>
            </ol>
            <Button 
              variant="pink" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => handleWebExtensionCheckout('firefox')}
            >
              Get Firefox Add-on
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Edge Installation</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Complete the purchase process</li>
              <li>Open the Edge Add-ons page for Candilingo</li>
              <li>Click "Get" and then "Add extension"</li>
              <li>The extension will install automatically</li>
            </ol>
            <Button 
              variant="pink" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => handleWebExtensionCheckout('edge')}
            >
              Get Edge Add-on
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2 text-candilingo-purple">Safari Installation</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Complete the purchase process</li>
              <li>Open Safari and go to Preferences</li>
              <li>Go to the Extensions tab</li>
              <li>Search for "Candilingo" and click Install</li>
            </ol>
            <Button 
              variant="pink" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => handleWebExtensionCheckout('safari')}
            >
              Get Safari Extension
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstallationGuide;

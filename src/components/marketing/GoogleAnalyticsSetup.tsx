
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Clipboard, Info, BarChart4 } from "lucide-react";

const GoogleAnalyticsSetup = () => {
  const [gaId, setGaId] = useState('');
  const [isImplemented, setIsImplemented] = useState(false);
  const { toast } = useToast();

  const trackingCodeSnippet = `
<!-- Google Analytics Tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId || 'GA_MEASUREMENT_ID'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gaId || 'GA_MEASUREMENT_ID'}');
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(trackingCodeSnippet);
    toast({
      title: "Code copied!",
      description: "Google Analytics tracking code copied to clipboard."
    });
  };

  const handleImplement = () => {
    if (!gaId) {
      toast({
        title: "Error",
        description: "Please enter your Google Analytics Measurement ID",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would save the GA ID to user settings
    // and potentially inject the GA script into the app
    setIsImplemented(true);
    toast({
      title: "Success!",
      description: "Google Analytics has been configured for your account."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-50 p-3 rounded-full">
          <BarChart4 className="w-6 h-6 text-techlex-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Google Analytics</h2>
          <p className="text-gray-600">
            Track visitor behavior, conversion rates, and campaign performance with Google Analytics.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p>To set up Google Analytics, you'll need a Google Analytics 4 property and a Measurement ID.</p>
          <a 
            href="https://analytics.google.com/analytics/web/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium inline-flex items-center mt-1"
          >
            Go to Google Analytics Dashboard
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="ga-id" className="block text-sm font-medium text-gray-700 mb-1">
            Google Analytics Measurement ID (Format: G-XXXXXXXXXX)
          </label>
          <Input
            id="ga-id"
            placeholder="G-XXXXXXXXXX"
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            className="mb-2"
          />
          <p className="text-xs text-gray-500">
            You can find your Measurement ID in your Google Analytics property settings.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Tracking Code</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={handleCopyCode}
            >
              <Clipboard className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
          <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
              {trackingCodeSnippet}
            </pre>
          </div>
          <p className="text-xs text-gray-500">
            Add this code to the &lt;head&gt; section of your website to enable Google Analytics tracking.
          </p>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button 
            onClick={handleImplement}
            className="bg-techlex-blue hover:bg-techlex-blue/90"
            disabled={isImplemented}
          >
            {isImplemented ? "Analytics Configured" : "Save Analytics Configuration"}
          </Button>
          
          {isImplemented && (
            <span className="text-green-600 text-sm font-medium flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Successfully configured
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalyticsSetup;

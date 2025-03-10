
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Info, Target } from "lucide-react";

const GoogleAdsSetup = () => {
  const [conversionId, setConversionId] = useState('');
  const [conversionLabel, setConversionLabel] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const { toast } = useToast();

  const conversionTrackingCode = `
<!-- Global site tag (gtag.js) - Google Ads: ${conversionId || 'AW-CONVERSION_ID'} -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${conversionId || 'AW-CONVERSION_ID'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${conversionId || 'AW-CONVERSION_ID'}');
</script>

<!-- Event snippet for Conversion action (custom) -->
<script>
  gtag('event', 'conversion', {
    'send_to': '${conversionId || 'AW-CONVERSION_ID'}/${conversionLabel || 'CONVERSION_LABEL'}',
    'value': 1.0,
    'currency': 'EUR'
  });
</script>
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(conversionTrackingCode);
    toast({
      title: "Code copied!",
      description: "Google Ads conversion tracking code copied to clipboard."
    });
  };

  const handleSaveConfig = () => {
    if (!conversionId) {
      toast({
        title: "Error",
        description: "Please enter your Google Ads Conversion ID",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would save the configuration to user settings
    setIsSetup(true);
    toast({
      title: "Success!",
      description: "Google Ads configuration has been saved."
    });
  };

  // Placeholder sample ad templates
  const adTemplates = [
    {
      title: "Recruit Technical Talent 50% Faster",
      description: "TechLex EU's AI helps you understand tech CVs instantly. Try our browser extension today!"
    },
    {
      title: "Tech Recruitment Made Simple",
      description: "Don't know your Python from your PHP? TechLex EU translates tech jargon instantly."
    },
    {
      title: "Hire Better Tech Talent",
      description: "Make informed decisions with TechLex EU's AI-powered tech term explanations."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-green-50 p-3 rounded-full">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Google Ads Integration</h2>
          <p className="text-gray-600">
            Track conversions and optimize your Google Ads campaigns for recruiting software.
          </p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-green-700">
          <p>You'll need your Google Ads account and conversion tracking information to complete this setup.</p>
          <a 
            href="https://ads.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-700 hover:underline font-medium inline-flex items-center mt-1"
          >
            Go to Google Ads Dashboard
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="conversion-id" className="block text-sm font-medium text-gray-700 mb-1">
              Google Ads Conversion ID
            </label>
            <Input
              id="conversion-id"
              placeholder="AW-XXXXXXXXXX"
              value={conversionId}
              onChange={(e) => setConversionId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="conversion-label" className="block text-sm font-medium text-gray-700 mb-1">
              Conversion Label (optional)
            </label>
            <Input
              id="conversion-label"
              placeholder="XXXXXXXXXXXXXXXXXX"
              value={conversionLabel}
              onChange={(e) => setConversionLabel(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Conversion Tracking Code</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={handleCopyCode}
            >
              Copy Code
            </Button>
          </div>
          <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
              {conversionTrackingCode}
            </pre>
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="text-sm font-medium mb-3">Sample Ad Copy Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {adTemplates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 bg-white">
                <h4 className="font-medium text-sm mb-1">{template.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs h-7"
                  onClick={() => {
                    navigator.clipboard.writeText(`${template.title}\n${template.description}`);
                    toast({
                      title: "Ad template copied",
                      description: "You can now paste this into your Google Ads campaign."
                    });
                  }}
                >
                  Copy Template
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button 
            onClick={handleSaveConfig}
            className="bg-techlex-blue hover:bg-techlex-blue/90"
            disabled={isSetup}
          >
            {isSetup ? "Ads Tracking Configured" : "Save Ads Configuration"}
          </Button>
          
          {isSetup && (
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

export default GoogleAdsSetup;

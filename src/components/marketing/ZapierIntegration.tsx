
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Code, ArrowRight, Zap, Info, ExternalLink } from "lucide-react";

const ZapierIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      // Instead, we'll show a more informative message
      toast({
        title: "Request Sent",
        description: "The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sample Zap templates
  const zapTemplates = [
    {
      name: "Add new TechLex leads to HubSpot",
      description: "When a new lead is created in TechLex, automatically add them to HubSpot CRM.",
      link: "https://zapier.com/apps/hubspot/integrations/webhook"
    },
    {
      name: "Send Slack notifications for new signups",
      description: "Get notified in Slack when a new user signs up for TechLex EU.",
      link: "https://zapier.com/apps/slack/integrations/webhook"
    },
    {
      name: "Create Trello cards for feature requests",
      description: "When a user submits a feature request, create a card in your Trello board.",
      link: "https://zapier.com/apps/trello/integrations/webhook"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-yellow-50 p-3 rounded-full">
          <Zap className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Zapier Integration</h2>
          <p className="text-gray-600">
            Connect TechLex EU with 3,000+ apps using Zapier's automation platform.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-700">
          <p>Zapier allows you to connect TechLex EU with thousands of other apps without any coding. Create automated workflows called "Zaps" to save time and reduce manual work.</p>
          <a 
            href="https://zapier.com/apps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-800 hover:underline font-medium inline-flex items-center mt-1"
          >
            Browse Zapier Integrations
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">1. Set up a Zap in Zapier</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Go to <a href="https://zapier.com/app/editor" target="_blank" rel="noopener noreferrer" className="text-techlex-blue hover:underline">Zapier.com</a> and log in to your account.</li>
            <li>Click "Create Zap" and select "Webhooks by Zapier" as your trigger app.</li>
            <li>Choose "Catch Hook" as the trigger event.</li>
            <li>Copy the webhook URL provided by Zapier.</li>
            <li>Paste the URL below to test the connection.</li>
          </ol>
        </div>

        <h3 className="text-sm font-medium">2. Connect your webhook</h3>
        <form onSubmit={handleTrigger} className="space-y-3">
          <div>
            <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 mb-1">
              Zapier Webhook URL
            </label>
            <Input
              id="webhook-url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          <Button 
            type="submit"
            className="bg-techlex-blue hover:bg-techlex-blue/90"
            disabled={isLoading}
          >
            {isLoading ? (
              "Sending test data..."
            ) : (
              <>
                Test Webhook Connection
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <h3 className="text-sm font-medium mt-6">3. Complete your Zap setup</h3>
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
          <p>After testing the webhook, return to Zapier to:</p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Set up the action app (the app that will receive the data).</li>
            <li>Map the data fields from TechLex EU to your chosen app.</li>
            <li>Test and turn on your Zap.</li>
          </ol>
        </div>

        <div className="pt-6">
          <h3 className="text-sm font-medium mb-3">Popular Zap Templates</h3>
          <div className="space-y-3">
            {zapTemplates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <a 
                    href={template.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-techlex-blue hover:text-techlex-blue/80 font-medium text-xs flex items-center"
                  >
                    Use Template
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Advanced: Developer API</h3>
          <div className="bg-gray-900 text-gray-300 rounded-md p-4 font-mono text-xs">
            <pre>
              {`// Example TechLex EU webhook payload
{
  "event": "new_user_signup",
  "timestamp": "2023-11-20T14:30:00Z",
  "data": {
    "user_id": "usr_12345",
    "email": "user@example.com",
    "plan": "professional",
    "source": "website"
  }
}`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            See our <a href="#" className="text-techlex-blue hover:underline">API documentation</a> for more details on webhook payloads and custom integrations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZapierIntegration;

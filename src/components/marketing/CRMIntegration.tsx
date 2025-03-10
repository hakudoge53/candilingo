
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Key, Briefcase, ArrowRight, CheckCircle } from "lucide-react";

const CRMIntegration = () => {
  const [selectedCRM, setSelectedCRM] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!selectedCRM) {
      toast({
        title: "Error",
        description: "Please select a CRM system",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your API key",
        variant: "destructive",
      });
      return;
    }

    if (selectedCRM === "hubspot" || selectedCRM === "salesforce" && !subdomain) {
      toast({
        title: "Error",
        description: "Please enter your subdomain",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would validate and save the API key and connection
    setIsConnected(true);
    toast({
      title: "Success!",
      description: `Your ${getCRMName(selectedCRM)} account has been connected.`
    });
  };

  const getCRMName = (crmId: string) => {
    switch(crmId) {
      case "hubspot": return "HubSpot";
      case "salesforce": return "Salesforce";
      case "zoho": return "Zoho CRM";
      case "pipedrive": return "Pipedrive";
      default: return crmId;
    }
  };

  const dataFields = [
    { name: "Contact Name", mapped: true },
    { name: "Email Address", mapped: true },
    { name: "Phone Number", mapped: true },
    { name: "Company Name", mapped: true },
    { name: "Job Title", mapped: true },
    { name: "Lead Source", mapped: true },
    { name: "TechLex User Status", mapped: true },
    { name: "Package Tier", mapped: true },
    { name: "Team Size", mapped: false },
    { name: "Technical Specialization", mapped: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-purple-50 p-3 rounded-full">
          <Briefcase className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">CRM Integration</h2>
          <p className="text-gray-600">
            Connect your Customer Relationship Management system to automatically sync leads and customers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="crm-system" className="block text-sm font-medium text-gray-700 mb-1">
            Select your CRM
          </label>
          <Select
            value={selectedCRM}
            onValueChange={setSelectedCRM}
          >
            <SelectTrigger id="crm-system" className="w-full">
              <SelectValue placeholder="Select a CRM system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hubspot">HubSpot</SelectItem>
              <SelectItem value="salesforce">Salesforce</SelectItem>
              <SelectItem value="zoho">Zoho CRM</SelectItem>
              <SelectItem value="pipedrive">Pipedrive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedCRM && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                  API Key / Access Token
                </label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pr-10"
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {(selectedCRM === "hubspot" || selectedCRM === "salesforce") && (
                <div>
                  <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedCRM === "hubspot" ? "HubSpot Portal ID" : "Salesforce Instance URL"}
                  </label>
                  <Input
                    id="subdomain"
                    placeholder={selectedCRM === "hubspot" ? "12345678" : "mycompany.my.salesforce.com"}
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Data fields that will be synced:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dataFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2 text-sm">
                    <span>{field.name}</span>
                    {field.mapped ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mapped
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
                        Optional
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleConnect}
                className="bg-techlex-blue hover:bg-techlex-blue/90"
                disabled={isConnected}
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Connected to {getCRMName(selectedCRM)}
                  </>
                ) : (
                  <>
                    Connect to {getCRMName(selectedCRM)}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              {isConnected && (
                <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
                  <h4 className="font-medium text-green-800 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    CRM Connection Successful
                  </h4>
                  <p className="text-green-700 text-sm mt-1">
                    Your {getCRMName(selectedCRM)} account is now connected. New leads and customer data will be automatically synced.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CRMIntegration;

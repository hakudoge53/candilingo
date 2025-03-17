
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Chrome, Firefox, Monitor, Settings, Download, Eye, EyeOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WebExtensionsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Web Extensions</h2>
        <Button variant="purple">
          <Settings className="mr-2 h-4 w-4" /> Extension Settings
        </Button>
      </div>
      
      <Tabs defaultValue="browser" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browser">Browser Extensions</TabsTrigger>
          <TabsTrigger value="settings">Extension Settings</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browser" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExtensionCard 
              title="Chrome Extension"
              description="Highlight and define technical terms directly in your browser."
              icon={<Chrome className="h-6 w-6" />}
              status="active"
              installUrl="https://chrome.google.com/webstore"
            />
            
            <ExtensionCard 
              title="Firefox Extension"
              description="Highlight and define technical terms directly in your browser."
              icon={<Firefox className="h-6 w-6" />}
              status="available"
              installUrl="https://addons.mozilla.org"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Extension Usage</CardTitle>
              <CardDescription>Monitor how your team is using the browser extensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MetricCard 
                  title="Active Users"
                  value="24"
                  change="+12%"
                  changeType="positive"
                />
                <MetricCard 
                  title="Terms Highlighted"
                  value="1,458"
                  change="+32%"
                  changeType="positive"
                />
                <MetricCard 
                  title="Definitions Viewed"
                  value="892"
                  change="-5%"
                  changeType="negative"
                />
                <MetricCard 
                  title="Avg. Daily Usage"
                  value="18 min"
                  change="+8%"
                  changeType="positive"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extension Configuration</CardTitle>
              <CardDescription>Customize how the extensions work for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Setting</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Auto-highlight technical terms</TableCell>
                    <TableCell>Automatically highlight technical terms found in your glossaries</TableCell>
                    <TableCell><Switch defaultChecked /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Show definitions on hover</TableCell>
                    <TableCell>Display term definitions when users hover over highlighted terms</TableCell>
                    <TableCell><Switch defaultChecked /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Track term usage analytics</TableCell>
                    <TableCell>Collect anonymous usage data for term highlights and definitions viewed</TableCell>
                    <TableCell><Switch defaultChecked /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Enable glossary selection</TableCell>
                    <TableCell>Allow users to select which glossaries to use for highlighting</TableCell>
                    <TableCell><Switch /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button>Save Configuration</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Excluded Websites</CardTitle>
              <CardDescription>Configure websites where the extension should not run</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">example.com <button className="ml-1 text-xs">×</button></Badge>
                  <Badge variant="outline">internal-tools.company.com <button className="ml-1 text-xs">×</button></Badge>
                  <Badge variant="outline">dashboard.app <button className="ml-1 text-xs">×</button></Badge>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Add website domain..." className="flex-1 px-3 py-2 border rounded" />
                  <Button variant="outline">Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extension Analytics</CardTitle>
              <CardDescription>View usage statistics for your browser extensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded">
                <div className="text-center">
                  <Monitor className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">Analytics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Terms</CardTitle>
              <CardDescription>The most frequently viewed technical terms</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Term</TableHead>
                    <TableHead>Glossary</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">API</TableCell>
                    <TableCell>Tech Terms</TableCell>
                    <TableCell>245</TableCell>
                    <TableCell className="text-green-600">↑ 12%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Docker</TableCell>
                    <TableCell>DevOps</TableCell>
                    <TableCell>198</TableCell>
                    <TableCell className="text-green-600">↑ 8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">React</TableCell>
                    <TableCell>Frontend</TableCell>
                    <TableCell>176</TableCell>
                    <TableCell className="text-red-600">↓ 4%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kubernetes</TableCell>
                    <TableCell>DevOps</TableCell>
                    <TableCell>152</TableCell>
                    <TableCell className="text-green-600">↑ 22%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ExtensionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'available' | 'pending';
  installUrl: string;
}

const ExtensionCard = ({ title, description, icon, status, installUrl }: ExtensionCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="bg-candilingo-purple/10 p-2 rounded-full text-candilingo-purple">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <StatusBadge status={status} />
          {status === 'active' && (
            <span className="text-xs text-gray-500">Version 1.2.4</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {status === 'active' ? (
          <Button variant="outline" className="w-full">
            <Settings className="mr-2 h-4 w-4" /> Configure
          </Button>
        ) : (
          <Button className="w-full bg-candilingo-purple">
            <Download className="mr-2 h-4 w-4" /> Install Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface StatusBadgeProps {
  status: 'active' | 'available' | 'pending';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <Eye className="w-3 h-3 mr-1" />,
          label: 'Active'
        };
      case 'available':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          icon: <Download className="w-3 h-3 mr-1" />,
          label: 'Available'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <EyeOff className="w-3 h-3 mr-1" />,
          label: 'Pending'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: null,
          label: status
        };
    }
  };

  const { bg, text, icon, label } = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
      {icon}
      {label}
    </span>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

const MetricCard = ({ title, value, change, changeType }: MetricCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-sm ${getChangeColor()}`}>{change}</p>
      </div>
    </div>
  );
};

export default WebExtensionsPanel;

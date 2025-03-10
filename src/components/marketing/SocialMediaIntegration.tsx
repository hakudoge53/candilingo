
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Share2, Globe, Link as LinkIcon, Share } from "lucide-react";

const SocialMediaIntegration = () => {
  const [socialAccounts, setSocialAccounts] = useState({
    linkedin: { enabled: false, username: "" },
    twitter: { enabled: false, username: "" },
    facebook: { enabled: false, username: "" }
  });
  const [shareEnabled, setShareEnabled] = useState(false);
  const { toast } = useToast();

  const handleTogglePlatform = (platform: keyof typeof socialAccounts) => {
    setSocialAccounts(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        enabled: !prev[platform].enabled
      }
    }));
  };

  const handleUsernameChange = (platform: keyof typeof socialAccounts, username: string) => {
    setSocialAccounts(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        username
      }
    }));
  };

  const handleSaveSettings = () => {
    // Validate that enabled platforms have usernames
    let hasError = false;
    Object.entries(socialAccounts).forEach(([platform, details]) => {
      if (details.enabled && !details.username) {
        toast({
          title: "Missing information",
          description: `Please enter your ${platform.charAt(0).toUpperCase() + platform.slice(1)} username/page`,
          variant: "destructive",
        });
        hasError = true;
      }
    });

    if (hasError) return;

    // Save social media settings
    toast({
      title: "Settings saved",
      description: "Your social media integration settings have been updated."
    });
  };

  const handleGenerateShareLink = () => {
    // Generate a shareable link
    const shareableLink = "https://techlex.eu/r/?ref=user123";
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Link copied!",
      description: "Your unique referral link has been copied to clipboard."
    });
  };

  // Sample social sharing content
  const sharingContent = [
    {
      platform: "linkedin",
      title: "LinkedIn Post Template",
      content: "I've been using TechLex EU to decode technical jargon in CVs. It's a game-changer for recruitment professionals! #TechRecruitment #AI #TechLex"
    },
    {
      platform: "twitter",
      title: "Twitter/X Post Template",
      content: "🚀 Just discovered @TechLexEU - an AI browser extension that explains tech terms instantly. Perfect for recruiters! Try it: techlex.eu #TechRecruiting"
    },
    {
      platform: "facebook",
      title: "Facebook Post Template",
      content: "Struggling to understand technical CVs? TechLex EU has been helping me decode tech jargon with its smart AI extension. Check it out if you're in recruitment!"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="bg-indigo-50 p-3 rounded-full">
          <Share2 className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Social Media Integration</h2>
          <p className="text-gray-600">
            Connect your social media accounts and easily share your TechLex experience.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Connect Your Social Accounts</h3>
          
          <div className="space-y-2">
            {/* LinkedIn */}
            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-xs text-gray-500">Connect to share and track engagement</p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={socialAccounts.linkedin.enabled}
                  onCheckedChange={() => handleTogglePlatform('linkedin')}
                  id="linkedin-toggle"
                />
              </div>
            </div>
            
            {socialAccounts.linkedin.enabled && (
              <div className="ml-11 mb-2">
                <label htmlFor="linkedin-username" className="block text-xs font-medium text-gray-700 mb-1">
                  LinkedIn Username or Page URL
                </label>
                <Input
                  id="linkedin-username"
                  placeholder="username or linkedin.com/in/username"
                  value={socialAccounts.linkedin.username}
                  onChange={(e) => handleUsernameChange('linkedin', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            )}

            {/* Twitter */}
            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-sky-100 rounded-md flex items-center justify-center text-sky-500 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Twitter/X</h4>
                  <p className="text-xs text-gray-500">Share updates and connect with followers</p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={socialAccounts.twitter.enabled}
                  onCheckedChange={() => handleTogglePlatform('twitter')}
                  id="twitter-toggle"
                />
              </div>
            </div>
            
            {socialAccounts.twitter.enabled && (
              <div className="ml-11 mb-2">
                <label htmlFor="twitter-username" className="block text-xs font-medium text-gray-700 mb-1">
                  Twitter/X Username (without @)
                </label>
                <Input
                  id="twitter-username"
                  placeholder="username"
                  value={socialAccounts.twitter.username}
                  onChange={(e) => handleUsernameChange('twitter', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            )}

            {/* Facebook */}
            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-700 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Facebook</h4>
                  <p className="text-xs text-gray-500">Share with your network</p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={socialAccounts.facebook.enabled}
                  onCheckedChange={() => handleTogglePlatform('facebook')}
                  id="facebook-toggle"
                />
              </div>
            </div>
            
            {socialAccounts.facebook.enabled && (
              <div className="ml-11 mb-2">
                <label htmlFor="facebook-username" className="block text-xs font-medium text-gray-700 mb-1">
                  Facebook Page URL or Username
                </label>
                <Input
                  id="facebook-username"
                  placeholder="username or facebook.com/pagename"
                  value={socialAccounts.facebook.username}
                  onChange={(e) => handleUsernameChange('facebook', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-700 mr-2" />
              <h3 className="text-sm font-medium">Website Social Sharing</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={shareEnabled}
                onCheckedChange={setShareEnabled}
                id="share-toggle"
              />
              <Label htmlFor="share-toggle" className="text-sm">
                {shareEnabled ? "Enabled" : "Disabled"}
              </Label>
            </div>
          </div>
          
          {shareEnabled && (
            <p className="text-xs text-gray-600">
              Social sharing buttons will be displayed on your public profile and landing pages.
            </p>
          )}
        </div>

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-3">Share TechLex EU</h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="flex items-center w-full justify-between"
              onClick={handleGenerateShareLink}
            >
              <div className="flex items-center">
                <LinkIcon className="w-4 h-4 mr-2" />
                <span>Generate Shareable Link</span>
              </div>
              <span className="text-xs text-gray-500">Earn referral credits</span>
            </Button>
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium">Social Sharing Templates</h4>
              {sharingContent.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-3 text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-xs">{item.title}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(item.content);
                        toast({
                          title: "Copied!",
                          description: `${item.title} has been copied to clipboard.`
                        });
                      }}
                    >
                      <Share className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSaveSettings}
            className="bg-techlex-blue hover:bg-techlex-blue/90"
          >
            Save Social Media Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;

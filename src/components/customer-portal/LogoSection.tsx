
import React, { useState } from 'react';
import LogoUploader from '@/components/LogoUploader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface LogoSectionProps {
  title?: string;
  description?: string;
}

const LogoSection: React.FC<LogoSectionProps> = ({
  title = "Company Logo",
  description = "Upload your company logo to personalize your dashboard."
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  const handleLogoUpload = (url: string) => {
    setLogoUrl(url);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {logoUrl ? (
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="max-w-xs mx-auto">
              <AspectRatio ratio={3/1} className="bg-white">
                <img 
                  src={logoUrl} 
                  alt="Company logo" 
                  className="object-contain w-full h-full"
                />
              </AspectRatio>
            </div>
            
            <div className="flex justify-end mt-4">
              <LogoUploader 
                onLogoUpload={handleLogoUpload} 
                aspectRatio={3/1}
                maxWidth={300}
                maxHeight={100}
              />
            </div>
          </div>
        ) : (
          <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center bg-gray-50">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-400 mb-2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            
            <p className="text-sm text-gray-500 mb-4">No logo uploaded yet</p>
            
            <LogoUploader 
              onLogoUpload={handleLogoUpload}
              aspectRatio={3/1}
              maxWidth={300}
              maxHeight={100}
            />
          </div>
        )}
        
        <div className="text-sm text-gray-500 p-4 bg-gray-100 rounded-md">
          <h4 className="font-medium mb-1">Logo specifications:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Recommended dimensions: 300px × 100px</li>
            <li>Aspect ratio: 3:1 (width:height)</li>
            <li>Supported formats: PNG, JPG, SVG</li>
            <li>Maximum file size: 2MB</li>
            <li>Transparent background recommended</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoSection;

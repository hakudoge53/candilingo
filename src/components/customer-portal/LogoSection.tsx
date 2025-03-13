
import React, { useState, useEffect } from 'react';
import LogoUploader from '@/components/LogoUploader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LogoSectionProps {
  title?: string;
  description?: string;
}

const LogoSection: React.FC<LogoSectionProps> = ({
  title = "Company Logo",
  description = "Upload your company logo to personalize your dashboard."
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeUser } = useAuth();
  
  // Fetch the user's logo when component mounts
  useEffect(() => {
    const fetchUserLogo = async () => {
      if (!activeUser?.id) return;
      
      try {
        setIsLoading(true);
        
        // Try to get the user's profile which might contain a logo URL
        const { data, error } = await supabase
          .from('profiles')
          .select('logo_url')
          .eq('id', activeUser.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching logo:', error);
        } else if (data && data.logo_url) {
          setLogoUrl(data.logo_url);
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserLogo();
  }, [activeUser?.id]);
  
  const handleLogoUpload = async (url: string) => {
    if (!activeUser?.id) {
      toast.error('You must be logged in to upload a logo.');
      return;
    }
    
    setLogoUrl(url);
    
    try {
      // Update the user's profile with the new logo URL
      const { error } = await supabase
        .from('profiles')
        .update({ logo_url: url })
        .eq('id', activeUser.id);
        
      if (error) {
        throw error;
      }
      
      toast.success('Logo updated successfully.');
    } catch (error) {
      console.error('Failed to save logo to profile:', error);
      toast.error('Failed to save logo to your profile. Please try again.');
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : logoUrl ? (
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

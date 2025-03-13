
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LogoUploader from "@/components/ui/logo-uploader";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

interface LogoSectionProps {
  className?: string;
}

const LogoSection = ({ className = '' }: LogoSectionProps) => {
  const { activeUser } = useAuth();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserLogo = async () => {
      if (!activeUser?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('logo_url')
          .eq('id', activeUser.id)
          .maybeSingle();
        
        if (data && data.logo_url) {
          setLogoUrl(data.logo_url);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    
    fetchUserLogo();
  }, [activeUser]);

  const handleLogoSelected = async (file: File, dataUrl: string) => {
    if (!activeUser?.id || file.size === 0) return;
    
    setIsUploading(true);
    
    try {
      // If there's an empty file, it means we're clearing the logo
      if (file.size === 0) {
        // Update profile to remove logo
        const { error } = await supabase
          .from('profiles')
          .update({ logo_url: null })
          .eq('id', activeUser.id);
        
        if (error) throw error;
        
        setLogoUrl(null);
        toast.success("Logo removed successfully");
        return;
      }
      
      // Upload file to storage
      const filePath = `logos/${activeUser.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
      
      // Update profile with logo URL
      const { error } = await supabase
        .from('profiles')
        .update({ logo_url: data.publicUrl })
        .eq('id', activeUser.id);
      
      if (error) throw error;
      
      setLogoUrl(data.publicUrl);
      toast.success("Logo updated successfully");
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      toast.error(error.message || "Failed to upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-candilingo-purple">Your Company Logo</CardTitle>
        <CardDescription>
          Upload your company logo to customize your experience.
          Ideal size: 300×100px (3:1 ratio)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LogoUploader 
          onLogoSelected={handleLogoSelected}
          currentLogoUrl={logoUrl || undefined}
        />
        
        {isUploading && (
          <div className="mt-2 text-sm text-center text-gray-500">
            Uploading logo...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogoSection;

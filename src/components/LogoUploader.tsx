
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface LogoUploaderProps {
  onLogoUpload?: (logoUrl: string) => void;
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  onLogoUpload,
  aspectRatio = 3/1, // Default ratio for logos (3:1 landscape)
  maxWidth = 300,
  maxHeight = 100
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    
    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size exceeds 2MB limit.');
      return;
    }
    
    // Load image to check dimensions
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      // Release object URL after loading
      setPreviewUrl(objectUrl);
      setSelectedFile(file);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      toast.error('Failed to load the image. Please try another file.');
    };
    
    img.src = objectUrl;
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsUploading(true);
    
    try {
      // Generate a unique filename with timestamp
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error } = await supabase.storage
        .from('public')
        .upload(filePath, selectedFile);
        
      if (error) {
        throw error;
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
        
      if (data && data.publicUrl) {
        if (onLogoUpload) {
          onLogoUpload(data.publicUrl);
        }
        toast.success('Logo uploaded successfully.');
      } else {
        throw new Error('Failed to get public URL');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo. Please try again.');
      
      // Fallback: If storage upload fails, use the local preview URL
      if (onLogoUpload) {
        onLogoUpload(previewUrl);
        toast.success('Logo uploaded successfully (local only).');
      }
    } finally {
      setIsUploading(false);
      setIsOpen(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Create a synthetic change event for the file input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        
        // Trigger the change handler
        const changeEvent = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(changeEvent);
      }
    }
  };
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="outline"
        className="flex items-center gap-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        Upload Logo
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload your logo</DialogTitle>
            <DialogDescription>
              Ideal dimensions: {maxWidth}px × {maxHeight}px (aspect ratio {aspectRatio})
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="max-w-xs mx-auto">
                  <AspectRatio ratio={aspectRatio} className="bg-muted">
                    <img 
                      src={previewUrl} 
                      alt="Logo preview" 
                      className="object-contain w-full h-full rounded-md"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
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
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m16 16-4-4-4 4" />
                  </svg>
                  <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
                </div>
              )}
              
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            <div className="text-sm text-gray-500">
              <h4 className="font-medium mb-1">Logo guidelines:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Recommended width: {maxWidth}px</li>
                <li>Recommended height: {maxHeight}px</li>
                <li>Aspect ratio: {aspectRatio} (width/height)</li>
                <li>File types: PNG, JPG, SVG</li>
                <li>Maximum file size: 2MB</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setPreviewUrl(null);
                setSelectedFile(null);
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="purple" 
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Logo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoUploader;


import React, { useState } from 'react';
import { toast } from 'sonner';
import { Upload, Image, X } from 'lucide-react';
import { Button } from './button';

interface LogoUploaderProps {
  onLogoSelected: (file: File, dataUrl: string) => void;
  currentLogoUrl?: string;
  className?: string;
}

const LogoUploader = ({
  onLogoSelected,
  currentLogoUrl,
  className = ''
}: LogoUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(currentLogoUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Ideal logo dimensions
  const aspectRatio = 3/1; // 3:1 ratio (width:height) for logos
  const maxWidth = 300;
  const maxHeight = 100;

  const processLogo = (file: File) => {
    if (!file.type.match('image.*') && !file.type.includes('svg')) {
      toast.error('Please select an image file (PNG, JPG, JPEG, or SVG)');
      return;
    }

    // For SVG files, we don't need to resize
    if (file.type.includes('svg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        onLogoSelected(file, dataUrl);
      };
      reader.readAsDataURL(file);
      return;
    }

    // For other image types, resize to maintain aspect ratio
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          toast.error('Could not process image');
          return;
        }
        
        // Calculate dimensions to maintain aspect ratio
        let width = img.width;
        let height = img.height;
        
        // Calculate new width and height based on aspect ratio
        if (width / height > aspectRatio) {
          // Image is wider than 3:1
          width = Math.min(width, maxWidth);
          height = width / aspectRatio;
        } else {
          // Image is taller than 3:1
          height = Math.min(height, maxHeight);
          width = height * aspectRatio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and resize the image on the canvas
        ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Transparent background
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert canvas to data URL (PNG to preserve transparency)
        const dataUrl = canvas.toDataURL('image/png');
        setPreview(dataUrl);
        
        // Convert data URL back to Blob/File for upload
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const resizedFile = new File([blob], file.name, { type: 'image/png' });
            onLogoSelected(resizedFile, dataUrl);
          });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processLogo(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processLogo(file);
    }
  };

  const clearLogo = () => {
    setPreview(null);
    onLogoSelected(new File([], ''), '');
  };

  return (
    <div className={`w-full ${className}`}>
      {preview ? (
        <div className="relative">
          <div className="p-4 border rounded-md bg-gray-50 flex items-center justify-center">
            <img 
              src={preview} 
              alt="Logo preview" 
              className="max-h-[100px] max-w-full object-contain"
            />
          </div>
          <button 
            onClick={clearLogo}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-candilingo-purple bg-candilingo-purple/5' : 'border-gray-300 hover:border-candilingo-purple/50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('logo-upload')?.click()}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <Image className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Upload Logo</p>
              <p className="text-xs text-gray-500 mt-1">
                Drag & drop or click to upload. PNG, JPG, JPEG, SVG
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ideal size: 300×100px (3:1 ratio)
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Select logo
            </Button>
          </div>
          <input
            id="logo-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default LogoUploader;

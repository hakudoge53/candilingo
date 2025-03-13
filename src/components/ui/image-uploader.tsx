
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Upload, ImageIcon, X } from 'lucide-react';
import { Button } from './button';

interface ImageUploaderProps {
  onImageSelected: (file: File, dataUrl: string) => void;
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  currentImageUrl?: string;
  label?: string;
}

const ImageUploader = ({
  onImageSelected,
  aspectRatio = 16/9, // Default aspect ratio (widescreen)
  maxWidth = 1200,
  maxHeight = 800,
  className = '',
  currentImageUrl,
  label = 'Upload Image'
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [isDragging, setIsDragging] = useState(false);

  const processImage = (file: File) => {
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file (PNG, JPG, or JPEG)');
      return;
    }

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
        
        // Calculate new width and height based on aspect ratio and maxWidth/maxHeight
        if (width / height > aspectRatio) {
          // Image is wider than the target aspect ratio
          width = Math.min(width, maxWidth);
          height = width / aspectRatio;
        } else {
          // Image is taller than the target aspect ratio
          height = Math.min(height, maxHeight);
          width = height * aspectRatio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and resize the image on the canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert canvas to data URL (JPEG with 90% quality)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setPreview(dataUrl);
        
        // Convert data URL back to Blob/File for upload
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
            onImageSelected(resizedFile, dataUrl);
          });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
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
      processImage(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelected(new File([], ''), '');
  };

  return (
    <div className={`w-full ${className}`}>
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Uploaded preview" 
            className="w-full h-auto rounded-md object-cover"
          />
          <button 
            onClick={clearImage}
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
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <ImageIcon className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-gray-500 mt-1">
                Drag & drop or click to upload. PNG, JPG, JPEG
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Recommended size: {maxWidth}x{maxHeight} or {aspectRatio.toFixed(1)} aspect ratio
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Select file
            </Button>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

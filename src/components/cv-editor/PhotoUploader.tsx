import { useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploaderProps {
  photoUrl: string;
  onPhotoChange: (url: string) => void;
  label: string;
  optional: string;
}

export const PhotoUploader = ({ photoUrl, onPhotoChange, label, optional }: PhotoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      {!photoUrl ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-3 p-8 border-2 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer bg-secondary/20 hover:bg-secondary/40"
        >
          <div className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-primary" />
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{optional}</p>
            <p className="text-xs text-muted-foreground mt-1">Glissez-déposez ou cliquez</p>
          </div>
        </div>
      ) : (
        <div className="relative inline-block">
          <img src={photoUrl} alt="Photo CV" className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg" />
          <Button
            onClick={() => onPhotoChange('')}
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

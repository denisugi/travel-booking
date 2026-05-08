import { useState, useRef } from 'react';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  className?: string;
}

export const FileUpload = ({
  accept = 'image/*',
  multiple = false,
  maxSize = 5,
  value,
  onChange,
  className,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles: string[] = [];

    for (const file of files) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      // Create object URL for preview
      const url = URL.createObjectURL(file);
      validFiles.push(url);
    }

    if (validFiles.length > 0) {
      if (multiple) {
        onChange([...(Array.isArray(value) ? value : value ? [value] : []), ...validFiles]);
      } else {
        onChange(validFiles[0]);
      }
    }
  };

  const removeFile = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newValue = [...value];
      URL.revokeObjectURL(newValue[index]);
      newValue.splice(index, 1);
      onChange(newValue);
    } else {
      URL.revokeObjectURL(value as string);
      onChange('');
    }
  };

  const values = multiple ? (Array.isArray(value) ? value : value ? [value] : []) : (value ? [value] : []);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50',
          error && 'border-destructive'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileSelect}
        />
        <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground mb-1">
          <span className="font-medium text-foreground">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          {accept === 'image/*' ? 'Images' : 'Files'} up to {maxSize}MB
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Preview */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map((url, index) => (
            <div key={String(url)} className="relative group">
              {accept === 'image/*' ? (
                <img
                  src={String(url)}
                  alt={`Preview ${index + 1}`}
                  className="h-24 w-full object-cover rounded-lg border"
                />
              ) : (
                <div className="h-24 w-full flex items-center justify-center rounded-lg border bg-muted">
                  <File className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <button
                type="button"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

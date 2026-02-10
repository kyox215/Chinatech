import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Loader2, ImageOff } from 'lucide-react';

interface UnifiedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  containerClassName?: string;
  imageClassName?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  objectFit?: 'contain' | 'cover' | 'fill';
}

export function UnifiedImage({
  src,
  alt,
  width = 24,
  height = 24,
  className,
  containerClassName,
  imageClassName,
  aspectRatio = 'square',
  objectFit = 'contain',
  ...props
}: UnifiedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Define aspect ratio classes
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: 'aspect-auto',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-50 flex items-center justify-center border border-slate-100", 
        aspectClasses[aspectRatio],
        containerClassName
      )}
      style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse z-10">
          <Loader2 className="w-1/3 h-1/3 text-slate-300 animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
          <ImageOff className="w-1/2 h-1/2" />
        </div>
      ) : (
        /* Using standard img for external SVGs if Next Image causes issues with vector data, 
           but here we use Next Image as configured. 
           Wait, simpleicons are SVGs. Next/Image works but requires configuration.
           For safety with external SVGs that might not have dimensions, sometimes standard img is safer.
           However, let's try a hybrid approach: use Next Image but allow fallback.
           Actually, for simpleicons CDN, simple <img> is often robust enough and avoids "unconfigured host" errors if config didn't reload.
           But I already updated next.config.ts. Let's use standard img for flexibility with SVGs that might scale weirdly in Next Image.
           
           Actually, the user asked for "Unified display effect... lazy load".
           Let's use a standard <img> tag wrapped with our logic for consistency.
        */
        <img
          src={src}
          alt={alt}
          className={cn(
            "transition-all duration-300 ease-in-out w-full h-full",
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
            objectFit === 'contain' ? 'object-contain' : 'object-cover',
            imageClassName
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) {
    return (
      <div className="aspect-square bg-card border border-border rounded-sm overflow-hidden grain relative">
        <div className="w-full h-full flex items-center justify-center text-muted text-sm tracking-wider-3 uppercase">
          {alt}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="aspect-square bg-card border border-border overflow-hidden relative">
        <img
          src={images[active]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 5).map((url, i) => (
            <button
              key={url + i}
              onClick={() => setActive(i)}
              className={`aspect-square border overflow-hidden transition-colors ${
                active === i ? 'border-accent' : 'border-border hover:border-accent/50'
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

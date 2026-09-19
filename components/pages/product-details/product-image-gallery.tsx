'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { LightBox } from '@/components/shared/light-box';
import { Expand } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const slides = images.map((src) => ({
    src,
    alt: title,
  }));

  return (
    <div className='space-y-4'>
      <button
        className='group relative block w-full aspect-square overflow-hidden rounded-sm bg-slate-100'
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          alt={`${title} - image ${activeIndex + 1}`}
          className='size-full object-cover'
          fill
          priority
          sizes='(max-width: 1024px) 100vw, 50vw'
          src={images[activeIndex]}
        />
        <span className='absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/10'>
          <Expand className='size-8 text-white opacity-0 transition group-hover:opacity-100' />
        </span>
      </button>

      {images.length > 1 && (
        <div className='flex gap-3'>
          {images.map((image, index) => (
            <button
              className={cn(
                'relative size-20 overflow-hidden rounded-sm bg-slate-100 ring-2 ring-offset-2 transition-all',
                index === activeIndex
                  ? 'ring-[#004643]'
                  : 'ring-transparent hover:ring-[#004643]/30',
              )}
              key={image}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                alt={`${title} thumbnail ${index + 1}`}
                className='size-full object-cover'
                fill
                sizes='80px'
                src={image}
              />
            </button>
          ))}
        </div>
      )}

      <LightBox
        isOpen={lightboxOpen}
        close={() => setLightboxOpen(false)}
        images={slides}
        currentImageIndex={activeIndex}
        setCurrentImageIndex={setActiveIndex}
      />
    </div>
  );
}

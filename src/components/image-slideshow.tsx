'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ImageSlideshowProps = {
  images?: string[];
};

export function ImageSlideshow({ images: propImages }: ImageSlideshowProps) {
  const images =
    propImages && propImages.length > 0
      ? propImages
      : PlaceHolderImages.map((img) => img.imageUrl);

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((src, index) => {
              const placeholder = PlaceHolderImages.find(p => p.imageUrl === src);
              return (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/9] w-full">
                  <div className="absolute top-0 left-0 w-full bg-black/50 text-white p-3 flex justify-between items-center text-sm md:text-lg font-medium z-10">
                    <span>
                      Slide {index + 1} / {images.length}
                    </span>
                    <span>{placeholder?.description || 'Untitled'}</span>
                  </div>
                  <Image
                    src={src}
                    alt={placeholder?.description || `Slideshow image ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint={placeholder?.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </CarouselItem>
            )})}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
      </CardContent>
    </Card>
  );
}

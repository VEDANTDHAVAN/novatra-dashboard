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
  initialImages?: string[];
};

export function ImageSlideshow({ initialImages }: ImageSlideshowProps) {
  const images =
    initialImages && initialImages.length > 0
      ? initialImages
      : PlaceHolderImages.map((img) => img.imageUrl);

  const hints = PlaceHolderImages.map((img) => img.imageHint);

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
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={src}
                    alt={`Slideshow image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    data-ai-hint={hints[index] || 'abstract art'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
      </CardContent>
    </Card>
  );
}

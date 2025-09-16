import { LiveBids } from '@/components/live-bids';
import { ImageSlideshow } from '@/components/image-slideshow';
import { CountdownTimer } from '@/components/countdown-timer';
import { BidForm } from '@/components/bid-form';
import { generateSlideshowImages } from '@/ai/flows/generate-slideshow-images';
import { Gavel } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function Home() {
  let imageDataUris: string[] = [];
  try {
    const response = await generateSlideshowImages({
      prompt:
        'A modern and sleek auction house interior with a large digital screen displaying bids, high-end art on the walls, and a diverse group of bidders.',
      numberOfImages: 3,
    });
    imageDataUris = response.imageDataUris;
  } catch (error) {
    console.error('Failed to generate slideshow images:', error);
    // Fallback to placeholder images if AI generation fails
    imageDataUris = PlaceHolderImages.map((img) => img.imageUrl);
  }

  return (
    <div className="bg-background min-h-screen font-body text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <Gavel className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">
            BidBlitz Dashboard
          </h1>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <LiveBids />
          </div>

          <div className="lg:col-span-6">
            <ImageSlideshow initialImages={imageDataUris} />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <CountdownTimer />
            <BidForm />
          </div>
        </div>
      </main>
    </div>
  );
}

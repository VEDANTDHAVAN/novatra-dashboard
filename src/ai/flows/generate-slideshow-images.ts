'use server';
/**
 * @fileOverview A Genkit flow that generates images for a slideshow based on a text prompt.
 *
 * - generateSlideshowImages - A function that generates slideshow images based on a text prompt.
 * - GenerateSlideshowImagesInput - The input type for the generateSlideshowImages function.
 * - GenerateSlideshowImagesOutput - The return type for the generateSlideshowImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSlideshowImagesInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the images to generate for the slideshow.'),
  numberOfImages: z.number().min(1).max(5).default(3).describe('The number of images to generate.'),
});
export type GenerateSlideshowImagesInput = z.infer<typeof GenerateSlideshowImagesInputSchema>;

const GenerateSlideshowImagesOutputSchema = z.object({
  imageDataUris: z.array(z.string()).describe('An array of image data URIs in base64 format.'),
});
export type GenerateSlideshowImagesOutput = z.infer<typeof GenerateSlideshowImagesOutputSchema>;

export async function generateSlideshowImages(input: GenerateSlideshowImagesInput): Promise<GenerateSlideshowImagesOutput> {
  return generateSlideshowImagesFlow(input);
}

const generateSlideshowImagesFlow = ai.defineFlow(
  {
    name: 'generateSlideshowImagesFlow',
    inputSchema: GenerateSlideshowImagesInputSchema,
    outputSchema: GenerateSlideshowImagesOutputSchema,
  },
  async input => {
    const imageDataUris: string[] = [];

    for (let i = 0; i < input.numberOfImages; i++) {
      const {media} = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `${input.prompt} (image ${i + 1} of ${input.numberOfImages})`,
      });
      if (media) {
        imageDataUris.push(media.url);
      }
    }

    return {imageDataUris};
  }
);

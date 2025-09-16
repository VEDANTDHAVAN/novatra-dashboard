'use server';

/**
 * @fileOverview Provides suggested bid values for the bidding form.
 *
 * - suggestBidValues - A function that returns suggested values for the team name and bid amount.
 * - SuggestBidValuesInput - The input type for the suggestBidValues function.
 * - SuggestBidValuesOutput - The return type for the suggestBidValues function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBidValuesInputSchema = z.object({}).describe('No input needed.');
export type SuggestBidValuesInput = z.infer<typeof SuggestBidValuesInputSchema>;

const SuggestBidValuesOutputSchema = z.object({
  teamName: z.string().describe('A suggested team name.'),
  bidAmount: z.number().describe('A suggested bid amount.'),
});
export type SuggestBidValuesOutput = z.infer<typeof SuggestBidValuesOutputSchema>;

export async function suggestBidValues(input: SuggestBidValuesInput): Promise<SuggestBidValuesOutput> {
  return suggestBidValuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBidValuesPrompt',
  input: {schema: SuggestBidValuesInputSchema},
  output: {schema: SuggestBidValuesOutputSchema},
  prompt: `You are a creative assistant helping users quickly get started with bidding.

  Suggest a team name and a bid amount to get them started. Be creative and fun with the team name.
  The bid amount should be a reasonable number.

  Team Name: {{teamName}}
  Bid Amount: {{bidAmount}}`,
});

const suggestBidValuesFlow = ai.defineFlow(
  {
    name: 'suggestBidValuesFlow',
    inputSchema: SuggestBidValuesInputSchema,
    outputSchema: SuggestBidValuesOutputSchema,
  },
  async () => {
    const {output} = await ai.generate({
      prompt: 'Suggest a creative team name and a reasonable bid amount to get them started bidding.',
      model: 'googleai/gemini-2.5-flash',
      outputSchema: SuggestBidValuesOutputSchema,
    });
    return output!;
  }
);

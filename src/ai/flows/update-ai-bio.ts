// 'use server';
/**
 * @fileOverview AI-powered bio generator that dynamically updates the 'About Me' section.
 *
 * - updateAiBio - A function to generate/update the AI bio.
 * - UpdateAiBioInput - The input type for the updateAiBio function.
 * - UpdateAiBioOutput - The return type for the updateAiBio function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpdateAiBioInputSchema = z.object({
  name: z.string().describe('Your name.'),
  jobTitle: z.string().describe('Your current job title.'),
  experience: z.string().describe('A summary of your work experience.'),
  skills: z.string().describe('A list of your skills, separated by commas.'),
  projects: z.string().describe('A list of your notable projects, separated by commas.'),
});
export type UpdateAiBioInput = z.infer<typeof UpdateAiBioInputSchema>;

const UpdateAiBioOutputSchema = z.object({
  bio: z.string().describe('A generated biography summarizing the provided details.'),
});
export type UpdateAiBioOutput = z.infer<typeof UpdateAiBioOutputSchema>;

export async function updateAiBio(input: UpdateAiBioInput): Promise<UpdateAiBioOutput> {
  return updateAiBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'updateAiBioPrompt',
  input: {schema: UpdateAiBioInputSchema},
  output: {schema: UpdateAiBioOutputSchema},
  prompt: `You are a professional bio writer. Generate a compelling "About Me" section for a portfolio, 
  summarizing the following details. The tone should be engaging, professional, and highlight the individual's capabilities.

  Name: {{{name}}}
  Job Title: {{{jobTitle}}}
  Experience: {{{experience}}}
  Skills: {{{skills}}}
  Projects: {{{projects}}}
  `,
});

const updateAiBioFlow = ai.defineFlow(
  {
    name: 'updateAiBioFlow',
    inputSchema: UpdateAiBioInputSchema,
    outputSchema: UpdateAiBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

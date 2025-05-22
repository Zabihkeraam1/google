// src/ai/flows/generate-ai-bio.ts
'use server';
/**
 * @fileOverview An AI-powered bio generator flow.
 *
 * - generateAiBio - A function that generates an AI-powered bio.
 * - GenerateAiBioInput - The input type for the generateAiBio function.
 * - GenerateAiBioOutput - The return type for the generateAiBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiBioInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  jobTitle: z.string().describe('The job title of the person.'),
  experience: z.string().describe('A summary of the person\'s experience.'),
  skills: z.array(z.string()).describe('A list of the person\'s skills.'),
  projects: z.array(z.string()).describe('A list of the person\'s projects.'),
});
export type GenerateAiBioInput = z.infer<typeof GenerateAiBioInputSchema>;

const GenerateAiBioOutputSchema = z.object({
  bio: z.string().describe('The generated biography.'),
});
export type GenerateAiBioOutput = z.infer<typeof GenerateAiBioOutputSchema>;

export async function generateAiBio(input: GenerateAiBioInput): Promise<GenerateAiBioOutput> {
  return generateAiBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiBioPrompt',
  input: {schema: GenerateAiBioInputSchema},
  output: {schema: GenerateAiBioOutputSchema},
  prompt: `You are a professional biography writer. You will generate a biography for a person based on their details.

Name: {{{name}}}
Job Title: {{{jobTitle}}}
Experience: {{{experience}}}
Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Projects: {{#each projects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Write a compelling and engaging biography.`,
});

const generateAiBioFlow = ai.defineFlow(
  {
    name: 'generateAiBioFlow',
    inputSchema: GenerateAiBioInputSchema,
    outputSchema: GenerateAiBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

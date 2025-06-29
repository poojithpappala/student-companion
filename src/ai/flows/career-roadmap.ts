
'use server';
/**
 * @fileOverview Generates a personalized AI career roadmap for students.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { careers } from '@/lib/constants';
import {
  CareerRoadmapInputSchema,
  type CareerRoadmapInput,
  CareerRoadmapOutputSchema,
  type CareerRoadmapOutput,
} from '@/ai/schemas';

export async function generateCareerRoadmap(input: CareerRoadmapInput): Promise<CareerRoadmapOutput> {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("Google API Key not configured. Please add it to your .env file.");
    }
    const career = careers.find(c => c.id === input.careerId);
    return careerRoadmapFlow({...input, careerName: career?.name || 'the selected field'});
}

const prompt = ai.definePrompt({
  name: 'careerRoadmapPrompt',
  input: {schema: CareerRoadmapInputSchema.extend({ careerName: z.string() })},
  output: {schema: CareerRoadmapOutputSchema},
  prompt: `You are an expert AI career coach for university students. Your task is to create a personalized, actionable career roadmap for one academic year.

  Generate a list of specific, actionable steps for a student with the following profile:

  - Career Goal: {{{careerName}}}
  - Current Year: {{{currentYear}}}
  - Stated Interests: {{{interests}}}
  - Current Skills: {{{skills}}}

  Based on this profile, create a list of 5-7 roadmap items for their **{{currentYear}}**. The items should cover a mix of categories: Academics, Skills, Projects, Networking, and Internships.
  For each item, provide a clear title, a relevant category, and a concise, actionable description.
  Focus on providing practical advice that will help the student build a strong profile for their career goal.
  `,
});

const careerRoadmapFlow = ai.defineFlow(
  {
    name: 'careerRoadmapFlow',
    inputSchema: CareerRoadmapInputSchema.extend({ careerName: z.string() }),
    outputSchema: CareerRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

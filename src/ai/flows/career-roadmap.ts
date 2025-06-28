'use server';
/**
 * @fileOverview Generates a personalized AI career roadmap for students.
 *
 * - generateCareerRoadmap - A function to get a personalized career roadmap.
 * - CareerRoadmapInput - The input type.
 * - CareerRoadmapOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { careers } from '@/lib/constants';

const CareerRoadmapInputSchema = z.object({
  careerId: z.string().describe("The ID of the user's chosen career path."),
  interests: z.string().describe("The user's personal and professional interests."),
  skills: z.string().describe("The user's current skills."),
  currentYear: z.enum(['1st Year', '2nd Year', '3rd Year', 'Final Year']).describe("The user's current year of study."),
});
export type CareerRoadmapInput = z.infer<typeof CareerRoadmapInputSchema>;

const RoadmapItemSchema = z.object({
    title: z.string().describe('The title of the roadmap activity.'),
    category: z.enum(['Academics', 'Skills', 'Projects', 'Networking', 'Internships']).describe('The category of the activity.'),
    description: z.string().describe('A brief description of what to do for this activity.'),
});

const CareerRoadmapOutputSchema = z.object({
  roadmapItems: z.array(RoadmapItemSchema).describe('A list of personalized roadmap items for the student for the current year.'),
});
export type CareerRoadmapOutput = z.infer<typeof CareerRoadmapOutputSchema>;

export async function generateCareerRoadmap(input: CareerRoadmapInput): Promise<CareerRoadmapOutput> {
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

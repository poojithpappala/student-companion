
'use server';
/**
 * @fileOverview An AI agent that recommends a career path based on a student's self-assessment.
 *
 * - recommendCareer - A function that returns a single career recommendation and justification.
 * - CareerAssessmentInput - The input type for the recommendCareer function.
 * - CareerRecommendation - The return type for the recommendCareer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { careers } from '@/lib/constants';

const CareerAssessmentInputSchema = z.object({
  grade: z.string().describe('The student\'s current grade level (e.g., 9th, 10th, 11th, 12th).'),
  subjects: z.string().describe('The student\'s favorite subjects in school.'),
  hobbies: z.string().describe('The student\'s hobbies and interests outside of school.'),
  personality: z.string().describe('A brief description of the student\'s personality traits (e.g., creative, analytical, team player).'),
  workStyle: z.string().describe("The student's preferred style of working (e.g., solving puzzles, teamwork, hands-on creation)."),
  ambition: z.string().describe("The student's long-term career ambitions or desired impact."),
});
export type CareerAssessmentInput = z.infer<typeof CareerAssessmentInputSchema>;

const CareerRecommendationSchema = z.object({
  recommendedCareerId: z.string().describe(`The ID of the single best-fit career. Must be one of: ${careers.map(c => c.id).join(', ')}`),
  justification: z.string().describe("A friendly, encouraging paragraph explaining why this career is a great fit for the student, based on their inputs."),
});
export type CareerRecommendation = z.infer<typeof CareerRecommendationSchema>;

export async function recommendCareer(input: CareerAssessmentInput): Promise<CareerRecommendation> {
  return careerAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerAssessmentPrompt',
  input: {schema: CareerAssessmentInputSchema},
  output: {schema: CareerRecommendationSchema},
  prompt: `You are an expert, friendly, and encouraging AI career counselor for high school students.
  Your task is to analyze a student's profile and recommend the single best career path for them from a predefined list.

  **Student Profile:**
  - Grade Level: {{{grade}}}
  - Favorite Subjects: {{{subjects}}}
  - Hobbies and Interests: {{{hobbies}}}
  - Personality: {{{personality}}}
  - Preferred Work Style: {{{workStyle}}}
  - Ambitions/Goals: {{{ambition}}}

  **Available Career Paths:**
  ${careers.map(c => `- ${c.name} (id: ${c.id})`).join('\n')}

  **Your Task:**
  1.  Carefully review the student's **entire profile**, paying close attention to how their ambitions, work style, and personality align with the available careers.
  2.  Select the **single most suitable career ID** from the list above.
  3.  Write a warm, positive, and personalized justification (2-3 sentences) explaining *why* you're recommending this path. Connect their subjects, hobbies, personality, work style, and ambitions to the career choice directly. For example, "Your goal to '{{{ambition}}}' and your love for {{{subjects}}} makes you a natural fit for..."

  Provide your response in the required JSON format.
  `,
});

const careerAssessmentFlow = ai.defineFlow(
  {
    name: 'careerAssessmentFlow',
    inputSchema: CareerAssessmentInputSchema,
    outputSchema: CareerRecommendationSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

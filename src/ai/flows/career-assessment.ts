
'use server';
/**
 * @fileOverview An AI agent that recommends a career path based on a student's self-assessment.
 */

import {ai} from '@/ai/genkit';
import { careers } from '@/lib/constants';
import {
  CareerAssessmentInputSchema,
  type CareerAssessmentInput,
  CareerRecommendationSchema,
  type CareerRecommendation,
} from '@/ai/schemas';

export async function recommendCareer(input: CareerAssessmentInput): Promise<CareerRecommendation> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
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

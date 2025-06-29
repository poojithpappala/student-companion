
'use server';
/**
 * @fileOverview An AI agent that suggests graduate school programs.
 */

import {ai} from '@/ai/genkit';
import {
  GraduateSchoolFinderInputSchema,
  type GraduateSchoolFinderInput,
  GraduateSchoolFinderOutputSchema,
  type GraduateSchoolFinderOutput,
} from '@/ai/schemas';

export async function findGraduatePrograms(input: GraduateSchoolFinderInput): Promise<GraduateSchoolFinderOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
  return graduateSchoolFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'graduateSchoolFinderPrompt',
  input: {schema: GraduateSchoolFinderInputSchema},
  output: {schema: GraduateSchoolFinderOutputSchema},
  prompt: `You are an expert AI higher education and admissions advisor.
  Your task is to suggest 3 to 5 suitable graduate programs based on a student's preferences.

  **Student Preferences:**
  - Field of Study: {{{fieldOfStudy}}}
  - Desired Degree: {{{degreeType}}}
  - Preferred Country: {{{countryPreference}}}

  **Instructions:**
  - Based on your knowledge, find 3-5 top-tier universities offering strong graduate programs that match the student's preferences.
  - For each suggestion, provide the university's name, the specific program name (e.g., "M.S. in Computer Science"), its location, and a concise reason explaining its strengths (e.g., "Renowned for its AI research faculty and strong industry connections.").
  - Tailor the suggestions to be highly relevant and prestigious if possible.

  Provide your response in the required JSON format.
  `,
});

const graduateSchoolFinderFlow = ai.defineFlow(
  {
    name: 'graduateSchoolFinderFlow',
    inputSchema: GraduateSchoolFinderInputSchema,
    outputSchema: GraduateSchoolFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

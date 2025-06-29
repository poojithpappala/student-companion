
'use server';
/**
 * @fileOverview An AI agent that suggests colleges based on student preferences.
 */

import {ai} from '@/ai/genkit';
import {
  CollegeExplorerInputSchema,
  type CollegeExplorerInput,
  CollegeExplorerOutputSchema,
  type CollegeExplorerOutput,
} from '@/ai/schemas';

export async function getCollegeSuggestions(input: CollegeExplorerInput): Promise<CollegeExplorerOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
  return collegeExplorerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'collegeExplorerPrompt',
  input: {schema: CollegeExplorerInputSchema},
  output: {schema: CollegeExplorerOutputSchema},
  prompt: `You are an expert AI college guidance counselor.
  Your task is to suggest 3 to 5 suitable colleges or universities based on a high school student's preferences.

  **Student Preferences:**
  - Current Grade: {{{grade}}}
  - Desired Major/Field: {{{desiredMajor}}}
  - Location Preference: {{{locationPreference}}}

  **Instructions:**
  - Based on your knowledge, find 3-5 well-regarded colleges that are strong in the desired major and fit the location preference.
  - For each college, provide its name, location, and a concise, one-sentence description highlighting why it's a good choice for that major.
  - Tailor the suggestions to be realistic and relevant for a student in the specified grade.

  Provide your response in the required JSON format.
  `,
});

const collegeExplorerFlow = ai.defineFlow(
  {
    name: 'collegeExplorerFlow',
    inputSchema: CollegeExplorerInputSchema,
    outputSchema: CollegeExplorerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

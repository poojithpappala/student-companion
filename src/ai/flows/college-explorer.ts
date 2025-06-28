
'use server';
/**
 * @fileOverview An AI agent that suggests colleges based on student preferences.
 *
 * - getCollegeSuggestions - A function that returns a list of college suggestions.
 * - CollegeExplorerInput - The input type for the function.
 * - CollegeExplorerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CollegeExplorerInputSchema = z.object({
  grade: z.string().describe("The student's current grade level."),
  desiredMajor: z.string().describe('The major or field of study the student is interested in.'),
  locationPreference: z.string().describe('The student\'s preferred location (e.g., "California, USA", "near Boston", "anywhere in the UK", or "any").'),
});
export type CollegeExplorerInput = z.infer<typeof CollegeExplorerInputSchema>;

const CollegeSuggestionSchema = z.object({
    name: z.string().describe("The full name of the college or university."),
    location: z.string().describe("The city and state/country of the college."),
    description: z.string().describe("A brief, one-sentence summary of what makes this college a good suggestion for the student's desired major."),
});
export type CollegeSuggestion = z.infer<typeof CollegeSuggestionSchema>;

const CollegeExplorerOutputSchema = z.object({
  colleges: z.array(CollegeSuggestionSchema).describe('A list of 3-5 college suggestions.'),
});
export type CollegeExplorerOutput = z.infer<typeof CollegeExplorerOutputSchema>;

export async function getCollegeSuggestions(input: CollegeExplorerInput): Promise<CollegeExplorerOutput> {
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

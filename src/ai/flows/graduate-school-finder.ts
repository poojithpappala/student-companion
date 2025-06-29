'use server';
/**
 * @fileOverview An AI agent that suggests graduate school programs.
 *
 * - findGraduatePrograms - A function that returns a list of program suggestions.
 * - GraduateSchoolFinderInput - The input type for the function.
 * - GraduateSchoolFinderOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GraduateSchoolFinderInputSchema = z.object({
  fieldOfStudy: z.string().describe('The field of study the student is interested in (e.g., Computer Science, Finance).'),
  degreeType: z.enum(["Master's", "PhD", "Any"]).describe('The type of graduate degree the student is seeking.'),
  countryPreference: z.string().describe('The student\'s preferred country for study (e.g., "USA", "Canada", "anywhere").'),
});
export type GraduateSchoolFinderInput = z.infer<typeof GraduateSchoolFinderInputSchema>;

const ProgramSuggestionSchema = z.object({
    universityName: z.string().describe("The full name of the university."),
    programName: z.string().describe("The specific name of the suggested graduate program."),
    location: z.string().describe("The city and country of the university."),
    reason: z.string().describe("A brief, one or two-sentence summary of why this program is a top choice, mentioning its strengths or reputation."),
});

export const GraduateSchoolFinderOutputSchema = z.object({
  programs: z.array(ProgramSuggestionSchema).describe('A list of 3-5 graduate program suggestions.'),
});
export type GraduateSchoolFinderOutput = z.infer<typeof GraduateSchoolFinderOutputSchema>;

export async function findGraduatePrograms(input: GraduateSchoolFinderInput): Promise<GraduateSchoolFinderOutput> {
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

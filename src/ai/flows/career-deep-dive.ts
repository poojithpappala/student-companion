
'use server';
/**
 * @fileOverview An AI agent that provides a detailed overview of a specific career.
 *
 * - getCareerDeepDive - A function that returns a detailed breakdown of a career.
 * - CareerDeepDiveInput - The input type for the function.
 * - CareerDeepDiveOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerDeepDiveInputSchema = z.object({
  careerName: z.string().describe("The name of the career to provide a deep dive on."),
});
export type CareerDeepDiveInput = z.infer<typeof CareerDeepDiveInputSchema>;

const CareerDeepDiveOutputSchema = z.object({
  introduction: z.string().describe("A brief, engaging one-paragraph introduction to the career path."),
  whatYouDo: z.array(z.string()).describe("A list of 3-5 key day-to-day responsibilities or activities."),
  keySkills: z.array(z.string()).describe("A list of 4-6 essential hard and soft skills required for this career."),
  futureOutlook: z.string().describe("A one-paragraph summary of the future job outlook, trends, and growth potential for this career."),
  relatedCareers: z.array(z.object({
    name: z.string().describe("The name of a related career path."),
    description: z.string().describe("A one-sentence description of why it's a related or alternative path."),
  })).describe("A list of 3 related career paths students might also consider."),
});
export type CareerDeepDiveOutput = z.infer<typeof CareerDeepDiveOutputSchema>;

export async function getCareerDeepDive(input: CareerDeepDiveInput): Promise<CareerDeepDiveOutput> {
  return careerDeepDiveFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerDeepDivePrompt',
  input: {schema: CareerDeepDiveInputSchema},
  output: {schema: CareerDeepDiveOutputSchema},
  prompt: `You are an expert career counselor AI, creating an engaging and informative deep dive for a high school student interested in a career in **{{{careerName}}}**.

  Your task is to provide a structured, encouraging, and easy-to-understand overview of this career path.

  **Career to analyze:** {{{careerName}}}

  **Instructions:**
  1.  **Introduction:** Write a single, compelling paragraph that introduces what a {{{careerName}}} professional does and why it's an exciting field.
  2.  **What You'll Do:** List 3 to 5 bullet points of typical day-to-day tasks or responsibilities.
  3.  **Key Skills:** List 4 to 6 of the most important technical and soft skills needed to succeed.
  4.  **Future Outlook:** In one paragraph, describe the job growth, future trends, and potential of this career. Keep it positive and forward-looking.
  5.  **Related Careers:** Suggest 3 other career paths that are related. For each, provide its name and a single sentence explaining the connection or why a student might like it if they're interested in {{{careerName}}}.

  Generate the response in the required JSON format.
  `,
});

const careerDeepDiveFlow = ai.defineFlow(
  {
    name: 'careerDeepDiveFlow',
    inputSchema: CareerDeepDiveInputSchema,
    outputSchema: CareerDeepDiveOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


'use server';
/**
 * @fileOverview An AI agent that provides a detailed overview of a specific career.
 */

import {ai} from '@/ai/genkit';
import {
  CareerDeepDiveInputSchema,
  type CareerDeepDiveInput,
  CareerDeepDiveOutputSchema,
  type CareerDeepDiveOutput,
} from '@/ai/schemas';

export async function getCareerDeepDive(input: CareerDeepDiveInput): Promise<CareerDeepDiveOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
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
  6.  **Suggested Courses:** Recommend 3 real or realistic-sounding online courses or certifications that would be beneficial for upskilling in this field. For each, provide its name and the platform it might be on (e.g., Coursera, edX, Udacity).

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

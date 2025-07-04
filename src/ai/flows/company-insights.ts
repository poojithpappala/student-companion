
'use server';
/**
 * @fileOverview An AI agent that provides insights about a company.
 */

import {ai} from '@/ai/genkit';
import {
  CompanyInsightsInputSchema,
  type CompanyInsightsInput,
  CompanyInsightsOutputSchema,
  type CompanyInsightsOutput,
} from '@/ai/schemas';

export async function getCompanyInsights(input: CompanyInsightsInput): Promise<CompanyInsightsOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
  return companyInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'companyInsightsPrompt',
  input: {schema: CompanyInsightsInputSchema},
  output: {schema: CompanyInsightsOutputSchema},
  prompt: `You are an expert career research assistant.
  Your goal is to provide students with a comprehensive overview of a company they might want to work for.

  Based on your knowledge, generate a detailed report for the following company: {{{companyName}}}

  The report should be well-structured and formatted in clean HTML. Use tags like <h4> for section titles, <ul> and <li> for lists, and <p> for paragraphs. Do not include <html>, <head>, or <body> tags. Include the following sections if possible:
  - **Company Culture**: Describe the work environment, values, and what it's like to work there.
  - **Interview Process**: Detail the typical stages of the interview process. Include common types of questions asked (e.g., behavioral, technical, case studies) and tips for preparation.
  - **Work-Life Balance**: Provide insights into the typical work hours, remote work policies, and overall employee well-being.
  - **Career Growth**: Discuss opportunities for advancement and learning within the company.

  Provide clear, actionable, and helpful information for a student preparing for job applications.
  `,
});

const companyInsightsFlow = ai.defineFlow(
  {
    name: 'companyInsightsFlow',
    inputSchema: CompanyInsightsInputSchema,
    outputSchema: CompanyInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

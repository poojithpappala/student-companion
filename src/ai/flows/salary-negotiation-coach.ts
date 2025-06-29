// src/ai/flows/salary-negotiation-coach.ts
'use server';
/**
 * @fileOverview Provides AI-driven tips and strategies for salary negotiation based on job offer details.
 */

import {ai} from '@/ai/genkit';
import {
  SalaryNegotiationInputSchema,
  type SalaryNegotiationInput,
  SalaryNegotiationOutputSchema,
  type SalaryNegotiationOutput,
} from '@/ai/schemas';


export async function salaryNegotiationCoach(input: SalaryNegotiationInput): Promise<SalaryNegotiationOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
  return salaryNegotiationCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salaryNegotiationCoachPrompt',
  input: {schema: SalaryNegotiationInputSchema},
  output: {schema: SalaryNegotiationOutputSchema},
  prompt: `You are an AI-powered salary negotiation coach. A graduating student will provide you with their job offer details, and you will provide them with a negotiation strategy to maximize their starting salary.

  Job Title: {{{jobTitle}}}
  Company Name: {{{companyName}}}
  Base Salary: {{{baseSalary}}}
  Location: {{{location}}}
  Years of Experience: {{{yearsOfExperience}}}
  Benefits: {{{benefits}}}
  Strengths: {{{strengths}}}
  Other Offers: {{{otherOffers}}}
  Desired Salary: {{{desiredSalary}}}

  Based on this information, provide the student with a comprehensive salary negotiation strategy, including:

  - A detailed negotiation strategy that includes specific steps and talking points.
  - Justification points for the desired salary based on the student's skills, experience, and market value.
  - Salary benchmark data for similar roles in the same location.
  - Suggestions for counter-offers and alternative benefits to negotiate.
  - Motivational and confidence-boosting advice for the negotiation process.

  Ensure the advice is practical, actionable, and tailored to the student's specific situation.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  }
});

const salaryNegotiationCoachFlow = ai.defineFlow(
  {
    name: 'salaryNegotiationCoachFlow',
    inputSchema: SalaryNegotiationInputSchema,
    outputSchema: SalaryNegotiationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

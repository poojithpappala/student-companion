// src/ai/flows/salary-negotiation-coach.ts
'use server';
/**
 * @fileOverview Provides AI-driven tips and strategies for salary negotiation based on job offer details.
 *
 * - salaryNegotiationCoach - A function that takes job offer details as input and returns negotiation tips.
 * - SalaryNegotiationInput - The input type for the salaryNegotiationCoach function.
 * - SalaryNegotiationOutput - The return type for the salaryNegotiationCoach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalaryNegotiationInputSchema = z.object({
  jobTitle: z.string().describe('The job title for the offered position.'),
  companyName: z.string().describe('The name of the company offering the job.'),
  baseSalary: z.number().describe('The base salary offered for the position.'),
  location: z.string().describe('The location of the job (city, state).'),
  yearsOfExperience: z.number().describe('The candidate\'s years of experience.'),
  benefits: z.string().describe('A description of the benefits package offered.'),
  strengths: z.string().describe('The candidate\'s key strengths and accomplishments relevant to the role.'),
  otherOffers: z.string().describe('Details of any other job offers the candidate has received.'),
  desiredSalary: z.number().describe('The candidate\'s desired salary range.'),
});
export type SalaryNegotiationInput = z.infer<typeof SalaryNegotiationInputSchema>;

const SalaryNegotiationOutputSchema = z.object({
  negotiationStrategy: z.string().describe('A detailed strategy for negotiating a higher salary.'),
  justificationPoints: z.string().describe('Specific points to justify the desired salary based on skills, experience, and market value.'),
  marketData: z.string().describe('Salary benchmark data for similar roles in the same location.'),
  counterOfferSuggestions: z.string().describe('Suggestions for counter-offers and alternative benefits to negotiate.'),
  confidenceBoost: z.string().describe('Motivational and confidence-boosting advice for the negotiation process.'),
});
export type SalaryNegotiationOutput = z.infer<typeof SalaryNegotiationOutputSchema>;

export async function salaryNegotiationCoach(input: SalaryNegotiationInput): Promise<SalaryNegotiationOutput> {
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
  `,config: {
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

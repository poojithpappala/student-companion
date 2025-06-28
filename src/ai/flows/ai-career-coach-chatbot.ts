// src/ai/flows/ai-career-coach-chatbot.ts
'use server';
/**
 * @fileOverview An AI career coach chatbot.
 *
 * - aiCareerCoachChatbot - A function that handles the chatbot interactions.
 * - AiCareerCoachChatbotInput - The input type for the aiCareerCoachChatbot function.
 * - AiCareerCoachChatbotOutput - The return type for the aiCareerCoachChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCareerCoachChatbotInputSchema = z.object({
  stage: z.string().describe('The user\'s current stage (Before/During/After Undergrad).'),
  careerId: z.string().optional().describe('The user\'s selected career ID.'),
  year: z.string().optional().describe('The user\'s current year of study (1st/2nd/3rd/Final).'),
  question: z.string().describe('The user\'s question for the career coach.'),
});
export type AiCareerCoachChatbotInput = z.infer<typeof AiCareerCoachChatbotInputSchema>;

const AiCareerCoachChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type AiCareerCoachChatbotOutput = z.infer<typeof AiCareerCoachChatbotOutputSchema>;

export async function aiCareerCoachChatbot(input: AiCareerCoachChatbotInput): Promise<AiCareerCoachChatbotOutput> {
  return aiCareerCoachChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCareerCoachChatbotPrompt',
  input: {schema: AiCareerCoachChatbotInputSchema},
  output: {schema: AiCareerCoachChatbotOutputSchema},
  prompt: `You are a helpful AI career coach chatbot for students.

  You provide personalized guidance based on the student's current stage, career interests, and academic year.
  Use the following information to provide relevant and helpful answers to the student's questions.

  Stage: {{{stage}}}
  Career ID: {{#if careerId}}{{{careerId}}}{{else}}Not selected yet{{/if}}
  Year: {{#if year}}{{{year}}}{{else}}Not specified{{/if}}

  Question: {{{question}}}

  Answer:`
});

const aiCareerCoachChatbotFlow = ai.defineFlow(
  {
    name: 'aiCareerCoachChatbotFlow',
    inputSchema: AiCareerCoachChatbotInputSchema,
    outputSchema: AiCareerCoachChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

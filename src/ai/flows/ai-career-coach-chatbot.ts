// src/ai/flows/ai-career-coach-chatbot.ts
'use server';
/**
 * @fileOverview An AI career coach chatbot.
 */

import {ai} from '@/ai/genkit';
import {
  AiCareerCoachChatbotInputSchema,
  type AiCareerCoachChatbotInput,
  AiCareerCoachChatbotOutputSchema,
  type AiCareerCoachChatbotOutput,
} from '@/ai/schemas';

export async function aiCareerCoachChatbot(input: AiCareerCoachChatbotInput): Promise<AiCareerCoachChatbotOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
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

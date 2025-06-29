
'use server';
/**
 * @fileOverview A resume analysis AI agent.
 */

import {ai} from '@/ai/genkit';
import {
  AnalyzeResumeInputSchema,
  type AnalyzeResumeInput,
  AnalyzeResumeOutputSchema,
  type AnalyzeResumeOutput,
} from '@/ai/schemas';


export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Google API Key not configured. Please add it to your .env file.");
  }
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert AI career coach and resume reviewer. Your task is to provide a detailed, constructive, and in-depth analysis of a student's resume to help them land more interviews.

Analyze the provided resume.
Resume: {{media url=resumeDataUri}}

Provide a comprehensive analysis based on the output schema.
- **Overall Score**: Give a score from 0-100 based on modern recruiting standards, ATS compatibility, clarity, and impact.
- **First Impression**: What is your immediate, one-sentence takeaway?
- **Summary**: Provide a high-level summary of the resume's strengths and weaknesses.
- **Section-by-Section Feedback**: Break down the resume into its core sections (e.g., Contact Info, Summary/Objective, Experience, Projects, Education, Skills). For each section, provide a score from 1-10 and specific, constructive feedback. Be honest but encouraging. Format the feedback for each section as a single string, using markdown for paragraphs.
- **Actionable Tips**: List the top 3-5 most critical and actionable changes the student should make to see the biggest improvement. These should be very specific (e.g., "Quantify your achievement in the 'Software Developer Intern' role by adding a metric, like 'Increased API response time by 15%'").
`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

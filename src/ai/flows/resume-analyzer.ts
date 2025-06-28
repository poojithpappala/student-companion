'use server';
/**
 * @fileOverview A resume analysis AI agent.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const ResumeSectionFeedbackSchema = z.object({
  section: z.string().describe("The name of the resume section (e.g., 'Contact Information', 'Experience', 'Education', 'Skills')."),
  score: z.number().describe("A score from 1 to 10 for this specific section."),
  feedback: z.string().describe("Detailed feedback for this section, formatted as a single string with markdown for paragraphs."),
});

const AnalyzeResumeOutputSchema = z.object({
  overallScore: z.number().describe('An overall score for the resume, from 0 to 100.'),
  firstImpression: z.string().describe('A brief, one-sentence first impression of the resume.'),
  summary: z.string().describe("A high-level summary of the resume's strengths and weaknesses."),
  sectionBySectionFeedback: z.array(ResumeSectionFeedbackSchema).describe('Detailed feedback for each major section of the resume.'),
  actionableTips: z.array(z.string()).describe('A list of the top 3-5 most important, actionable tips for immediate improvement.'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
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

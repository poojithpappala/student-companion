// src/ai/schemas.ts
import {z} from 'zod';
import { careers } from '@/lib/constants';

// From ai-career-coach-chatbot.ts
export const AiCareerCoachChatbotInputSchema = z.object({
  stage: z.string().describe('The user\'s current stage (Before/During/After Undergrad).'),
  careerId: z.string().optional().describe('The user\'s selected career ID.'),
  year: z.string().optional().describe('The user\'s current year of study (1st/2nd/3rd/Final).'),
  question: z.string().describe('The user\'s question for the career coach.'),
});
export type AiCareerCoachChatbotInput = z.infer<typeof AiCareerCoachChatbotInputSchema>;

export const AiCareerCoachChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type AiCareerCoachChatbotOutput = z.infer<typeof AiCareerCoachChatbotOutputSchema>;


// From career-assessment.ts
export const CareerAssessmentInputSchema = z.object({
  grade: z.string().describe('The student\'s current grade level (e.g., 9th, 10th, 11th, 12th).'),
  subjects: z.string().describe('The student\'s favorite subjects in school.'),
  hobbies: z.string().describe('The student\'s hobbies and interests outside of school.'),
  personality: z.string().describe('A brief description of the student\'s personality traits (e.g., creative, analytical, team player).'),
  workStyle: z.string().describe("The student's preferred style of working (e.g., solving puzzles, teamwork, hands-on creation)."),
  ambition: z.string().describe("The student's long-term career ambitions or desired impact."),
});
export type CareerAssessmentInput = z.infer<typeof CareerAssessmentInputSchema>;

export const CareerRecommendationSchema = z.object({
  recommendedCareerId: z.string().describe(`The ID of the single best-fit career. Must be one of: ${careers.map(c => c.id).join(', ')}`),
  justification: z.string().describe("A friendly, encouraging paragraph explaining why this career is a great fit for the student, based on their inputs."),
});
export type CareerRecommendation = z.infer<typeof CareerRecommendationSchema>;


// From career-deep-dive.ts
export const CareerDeepDiveInputSchema = z.object({
  careerName: z.string().describe("The name of the career to provide a deep dive on."),
});
export type CareerDeepDiveInput = z.infer<typeof CareerDeepDiveInputSchema>;

export const CareerDeepDiveOutputSchema = z.object({
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


// From career-roadmap.ts
const RoadmapItemSchema = z.object({
    title: z.string().describe('The title of the roadmap activity.'),
    category: z.enum(['Academics', 'Skills', 'Projects', 'Networking', 'Internships']).describe('The category of the activity.'),
    description: z.string().describe('A brief description of what to do for this activity.'),
});

export const CareerRoadmapInputSchema = z.object({
  careerId: z.string().describe("The ID of the user's chosen career path."),
  interests: z.string().describe("The user's personal and professional interests."),
  skills: z.string().describe("The user's current skills."),
  currentYear: z.enum(['1st Year', '2nd Year', '3rd Year', 'Final Year']).describe("The user's current year of study."),
});
export type CareerRoadmapInput = z.infer<typeof CareerRoadmapInputSchema>;

export const CareerRoadmapOutputSchema = z.object({
  roadmapItems: z.array(RoadmapItemSchema).describe('A list of personalized roadmap items for the student for the current year.'),
});
export type CareerRoadmapOutput = z.infer<typeof CareerRoadmapOutputSchema>;


// From college-explorer.ts
export const CollegeExplorerInputSchema = z.object({
  grade: z.string().describe("The student's current grade level."),
  desiredMajor: z.string().describe('The major or field of study the student is interested in.'),
  locationPreference: z.string().describe('The student\'s preferred location (e.g., "California, USA", "near Boston", "anywhere in the UK", or "any").'),
});
export type CollegeExplorerInput = z.infer<typeof CollegeExplorerInputSchema>;

export const CollegeSuggestionSchema = z.object({
    name: z.string().describe("The full name of the college or university."),
    location: z.string().describe("The city and state/country of the college."),
    description: z.string().describe("A brief, one-sentence summary of what makes this college a good suggestion for the student's desired major."),
});
export type CollegeSuggestion = z.infer<typeof CollegeSuggestionSchema>;

export const CollegeExplorerOutputSchema = z.object({
  colleges: z.array(CollegeSuggestionSchema).describe('A list of 3-5 college suggestions.'),
});
export type CollegeExplorerOutput = z.infer<typeof CollegeExplorerOutputSchema>;


// From company-insights.ts
export const CompanyInsightsInputSchema = z.object({
  companyName: z.string().describe('The name of the company to research.'),
});
export type CompanyInsightsInput = z.infer<typeof CompanyInsightsInputSchema>;

export const CompanyInsightsOutputSchema = z.object({
  report: z.string().describe('A detailed report on the company, formatted as clean HTML.'),
});
export type CompanyInsightsOutput = z.infer<typeof CompanyInsightsOutputSchema>;


// From graduate-school-finder.ts
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


// From resume-analyzer.ts
export const AnalyzeResumeInputSchema = z.object({
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

export const AnalyzeResumeOutputSchema = z.object({
  overallScore: z.number().describe('An overall score for the resume, from 0 to 100.'),
  firstImpression: z.string().describe('A brief, one-sentence first impression of the resume.'),
  summary: z.string().describe("A high-level summary of the resume's strengths and weaknesses."),
  sectionBySectionFeedback: z.array(ResumeSectionFeedbackSchema).describe('Detailed feedback for each major section of the resume.'),
  actionableTips: z.array(z.string()).describe('A list of the top 3-5 most important, actionable tips for immediate improvement.'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;


// From salary-negotiation-coach.ts
export const SalaryNegotiationInputSchema = z.object({
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

export const SalaryNegotiationOutputSchema = z.object({
  negotiationStrategy: z.string().describe('A detailed strategy for negotiating a higher salary.'),
  justificationPoints: z.string().describe('Specific points to justify the desired salary based on skills, experience, and market value.'),
  marketData: z.string().describe('Salary benchmark data for similar roles in the same location.'),
  counterOfferSuggestions: z.string().describe('Suggestions for counter-offers and alternative benefits to negotiate.'),
  confidenceBoost: z.string().describe('Motivational and confidence-boosting advice for the negotiation process.'),
});
export type SalaryNegotiationOutput = z.infer<typeof SalaryNegotiationOutputSchema>;

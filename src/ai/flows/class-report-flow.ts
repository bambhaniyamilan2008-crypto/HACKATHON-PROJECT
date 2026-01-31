'use server';

/**
 * @fileOverview AI flow for generating smart class-wise reports.
 * 
 * - generateClassReport - A function that generates a detailed class analysis using AI.
 * - ClassReportInput - The input type for the flow.
 * - ClassReportOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ClassReportInputSchema = z.object({
  className: z.string().describe('The name of the class (e.g., Class 10A).'),
  averageAttendance: z.number().describe('Average attendance percentage for the class.'),
  subjectsPerformance: z.array(z.object({
    subject: z.string(),
    averageScore: z.number(),
    passPercentage: z.number(),
  })).describe('Performance data for each subject taught in the class.'),
});

export type ClassReportInput = z.infer<typeof ClassReportInputSchema>;

const ClassReportOutputSchema = z.object({
  summary: z.string().describe('A high-level executive summary of the class performance.'),
  strengths: z.array(z.string()).describe('List of key academic or behavioral strengths.'),
  weaknesses: z.array(z.string()).describe('Areas where the class needs improvement.'),
  recommendations: z.array(z.string()).describe('Actionable advice for teachers and parents.'),
  attendanceAnalysis: z.string().describe('Analysis of the attendance patterns.'),
});

export type ClassReportOutput = z.infer<typeof ClassReportOutputSchema>;

export async function generateClassReport(input: ClassReportInput): Promise<ClassReportOutput> {
  return classReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classReportPrompt',
  input: { schema: ClassReportInputSchema },
  output: { schema: ClassReportOutputSchema },
  prompt: `You are a senior academic director. Analyze the following data for {{{className}}} and provide a detailed, insightful report.

  Class Metrics:
  - Average Attendance: {{averageAttendance}}%
  
  Subject Performance:
  {{#each subjectsPerformance}}
  - {{subject}}: Avg Score {{averageScore}}/100, Pass Rate {{passPercentage}}%
  {{/each}}

  Your report should:
  1. Provide a professional summary of the class's current standing.
  2. Identify specific strengths (e.g., "Exceptional performance in Mathematics").
  3. Identify critical weaknesses (e.g., "Attendance dip on Fridays" or "Low pass rate in Chemistry").
  4. Offer at least 3 actionable recommendations for the faculty.
  5. Analyze the attendance in context of academic performance.`,
});

const classReportFlow = ai.defineFlow(
  {
    name: 'classReportFlow',
    inputSchema: ClassReportInputSchema,
    outputSchema: ClassReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('AI failed to generate a valid class report.');
    return output;
  }
);

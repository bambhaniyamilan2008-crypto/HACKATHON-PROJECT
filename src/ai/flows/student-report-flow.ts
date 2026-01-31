'use server';

/**
 * @fileOverview AI flow for generating personalized student progress reports.
 * 
 * - generateStudentReport - A function that generates a detailed student analysis using AI.
 * - StudentReportInput - The input type for the flow.
 * - StudentReportOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StudentReportInputSchema = z.object({
  studentName: z.string().describe('The full name of the student.'),
  className: z.string().describe('The student\'s class.'),
  grades: z.array(z.object({
    subject: z.string(),
    score: z.number(),
    grade: z.string(),
  })).describe('List of subjects and their respective scores/grades.'),
  attendance: z.number().describe('Student\'s attendance percentage.'),
});

export type StudentReportInput = z.infer<typeof StudentReportInputSchema>;

const StudentReportOutputSchema = z.object({
  narrative: z.string().describe('A personalized narrative summary of the student\'s performance.'),
  strengths: z.array(z.string()).describe('Key academic strengths.'),
  improvements: z.array(z.string()).describe('Specific areas needing focus.'),
  parentAdvice: z.string().describe('Actionable advice for the parents.'),
  studentMotivation: z.string().describe('A motivating message for the student.'),
});

export type StudentReportOutput = z.infer<typeof StudentReportOutputSchema>;

export async function generateStudentReport(input: StudentReportInput): Promise<StudentReportOutput> {
  return studentReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentReportPrompt',
  input: { schema: StudentReportInputSchema },
  output: { schema: StudentReportOutputSchema },
  prompt: `You are a dedicated class teacher. Analyze the academic record of {{{studentName}}} in Class {{{className}}} and write a comprehensive progress report.

  Academic Data:
  - Attendance: {{attendance}}%
  {{#each grades}}
  - {{subject}}: Score {{score}}/100 (Grade {{grade}})
  {{/each}}

  Your report must:
  1. Write a warm, professional narrative about the student's overall progress.
  2. Highlight at least 2 specific academic strengths.
  3. Identify 2 focus areas where the student can improve.
  4. Provide constructive, encouraging advice for the parents to support learning at home.
  5. End with a short, highly motivating quote or message tailored to this student's performance level.`,
});

const studentReportFlow = ai.defineFlow(
  {
    name: 'studentReportFlow',
    inputSchema: StudentReportInputSchema,
    outputSchema: StudentReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('AI failed to generate a valid student report.');
    return output;
  }
);

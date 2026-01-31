'use server';

/**
 * @fileOverview AI flow for generating personalized study schedules.
 *
 * - generateStudyPlan - A function that generates an optimized study schedule using AI.
 * - StudyPlanInput - The input type for the flow.
 * - StudyPlanOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SubjectInputSchema = z.object({
  name: z.string().describe('Name of the subject.'),
  examDate: z.string().describe('Date of the exam for this subject.'),
  difficulty: z.number().min(1).max(3).describe('Difficulty level (1 = Easy, 2 = Medium, 3 = Hard).'),
});

const StudyPlanInputSchema = z.object({
  subjects: z.array(SubjectInputSchema).describe('List of subjects to be scheduled.'),
  dailyHours: z.number().describe('Total available study hours per day.'),
});

export type StudyPlanInput = z.infer<typeof StudyPlanInputSchema>;

const DailyScheduleSchema = z.object({
  day: z.string().describe('Day of the week.'),
  tasks: z.array(z.object({
    subject: z.string(),
    duration: z.string().describe('Duration in hours (e.g., 2 hours).'),
    topic: z.string().describe('Focus topic for this session.'),
  })),
});

const StudyPlanOutputSchema = z.object({
  weeklyPlan: z.array(DailyScheduleSchema).describe('A 7-day study plan.'),
  prioritizationLogic: z.string().describe('Explanation of how the plan was prioritized.'),
});

export type StudyPlanOutput = z.infer<typeof StudyPlanOutputSchema>;

export async function generateStudyPlan(input: StudyPlanInput): Promise<StudyPlanOutput> {
  return studyPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyPlannerPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: StudyPlanInputSchema },
  output: { schema: StudyPlanOutputSchema },
  prompt: `You are an expert academic counselor. Create a personalized weekly study plan (Monday to Sunday) based on the following data:

  Subjects & Details:
  {{#each subjects}}
  - {{name}}: Exam on {{examDate}}, Difficulty: {{difficulty}} (where 3 is Hardest, 1 is Easiest)
  {{/each}}

  Available Study Time: {{dailyHours}} hours per day.

  Rules for scheduling:
  1. Priority: Subjects with exams occurring sooner must appear more frequently in the early part of the week.
  2. Time Allocation: Subjects with higher difficulty (e.g., 3) should be allocated significantly more hours than lower difficulty subjects (e.g., 1).
  3. Balance: Ensure a variety of subjects within a single day if possible, but keep focus sessions meaningful (at least 1 hour).
  4. Reasoning: Provide a brief explanation in 'prioritizationLogic' about why certain subjects were prioritized.
  5. Format: Return a strict JSON response matching the provided schema.`,
});

const studyPlannerFlow = ai.defineFlow(
  {
    name: 'studyPlannerFlow',
    inputSchema: StudyPlanInputSchema,
    outputSchema: StudyPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('AI failed to generate a valid study plan.');
    return output;
  }
);

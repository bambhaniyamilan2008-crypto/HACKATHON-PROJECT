'use server';

/**
 * @fileOverview AI flow for generating smart school timetables.
 *
 * - generateSmartTimetable - A function that generates an optimized timetable using AI.
 * - TimetableInput - The input type for the flow.
 * - TimetableOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TimetableInputSchema = z.object({
  className: z.string().describe('The name of the class (e.g., Grade 10A).'),
  teachers: z.array(z.object({
    name: z.string(),
    subject: z.string()
  })).describe('List of available teachers and their subjects.'),
  constraints: z.string().optional().describe('Any specific scheduling constraints (e.g., no Math after 2 PM).'),
});

export type TimetableInput = z.infer<typeof TimetableInputSchema>;

const TimetableEntrySchema = z.object({
  time: z.string().describe('Time slot string (e.g., 09:00 - 09:50).'),
  subject: z.string().describe('Subject name.'),
  teacher: z.string().describe('Teacher name.')
});

const TimetableOutputSchema = z.object({
  schedule: z.object({
    Monday: z.array(TimetableEntrySchema),
    Tuesday: z.array(TimetableEntrySchema),
    Wednesday: z.array(TimetableEntrySchema),
    Thursday: z.array(TimetableEntrySchema),
    Friday: z.array(TimetableEntrySchema),
  }).describe('The weekly schedule object with keys for each day: Monday, Tuesday, Wednesday, Thursday, Friday.'),
  optimizationReason: z.string().describe('A brief explanation of why this schedule was chosen.')
});

export type TimetableOutput = z.infer<typeof TimetableOutputSchema>;

export async function generateSmartTimetable(input: TimetableInput): Promise<TimetableOutput> {
  return smartTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTimetablePrompt',
  input: { schema: TimetableInputSchema },
  output: { schema: TimetableOutputSchema },
  prompt: `You are an expert school administrator. Create a balanced and optimized weekly timetable for {{{className}}}.

  Available Teachers and Subjects:
  {{#each teachers}}
  - {{name}}: {{subject}}
  {{/each}}

  {{#if constraints}}
  Constraints:
  {{{constraints}}}
  {{/if}}

  Rules for the Timetable:
  1. Generate a schedule for Monday, Tuesday, Wednesday, Thursday, and Friday.
  2. The schedule MUST contain exactly 5 periods per day.
  3. The 4th period (12:00 - 12:50) MUST be named 'Lunch' with no teacher assigned.
  4. Ensure a fair distribution of core subjects (Mathematics, Physics, Chemistry, English) using the provided teacher list.
  5. The keys in the 'schedule' object MUST be EXACTLY "Monday", "Tuesday", "Wednesday", "Thursday", and "Friday" (Case Sensitive).
  6. Return a valid JSON object matching the requested schema.`,
});

const smartTimetableFlow = ai.defineFlow(
  {
    name: 'smartTimetableFlow',
    inputSchema: TimetableInputSchema,
    outputSchema: TimetableOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('AI failed to generate a valid timetable structure.');
    return output;
  }
);

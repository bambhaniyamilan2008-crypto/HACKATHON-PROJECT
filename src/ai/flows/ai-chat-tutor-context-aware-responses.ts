'use server';

/**
 * @fileOverview Implements the AI Chat Tutor flow, which incorporates school curriculum,
 * teacher notes, and past exams to provide context-aware responses to student questions.
 *
 * - aiChatTutorContextAwareResponses - A function that processes student questions and returns context-aware answers.
 * - AIChatTutorContextAwareResponsesInput - The input type for the aiChatTutorContextAwareResponses function.
 * - AIChatTutorContextAwareResponsesOutput - The return type for the aiChatTutorContextAwareResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Mock data schemas representing school curriculum, teacher notes, and past exams.
const CurriculumSchema = z.string().describe('The school curriculum information.');
const TeacherNotesSchema = z.string().describe('Teacher notes related to the student question.');
const PastExamsSchema = z.string().describe('Past exam questions and answers relevant to the student question.');

const AIChatTutorContextAwareResponsesInputSchema = z.object({
  question: z.string().describe('The student question.'),
  curriculum: CurriculumSchema.optional(),
  teacherNotes: TeacherNotesSchema.optional(),
  pastExams: PastExamsSchema.optional(),
});
export type AIChatTutorContextAwareResponsesInput = z.infer<typeof AIChatTutorContextAwareResponsesInputSchema>;

const AIChatTutorContextAwareResponsesOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the student question, incorporating context.'),
});
export type AIChatTutorContextAwareResponsesOutput = z.infer<typeof AIChatTutorContextAwareResponsesOutputSchema>;

export async function aiChatTutorContextAwareResponses(input: AIChatTutorContextAwareResponsesInput): Promise<AIChatTutorContextAwareResponsesOutput> {
  return aiChatTutorContextAwareResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatTutorContextAwareResponsesPrompt',
  input: {schema: AIChatTutorContextAwareResponsesInputSchema},
  output: {schema: AIChatTutorContextAwareResponsesOutputSchema},
  prompt: `You are an AI Chat Tutor that answers student questions.

  Incorporate the following information to provide a relevant and helpful answer:

  {% if curriculum %}Curriculum: {{{curriculum}}}\n{% endif %}
  {% if teacherNotes %}Teacher Notes: {{{teacherNotes}}}\n{% endif %}
  {% if pastExams %}Past Exams: {{{pastExams}}}\n{% endif %}

  Question: {{{question}}}
  Answer: `,
});

const aiChatTutorContextAwareResponsesFlow = ai.defineFlow(
  {
    name: 'aiChatTutorContextAwareResponsesFlow',
    inputSchema: AIChatTutorContextAwareResponsesInputSchema,
    outputSchema: AIChatTutorContextAwareResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

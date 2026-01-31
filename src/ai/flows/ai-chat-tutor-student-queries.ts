'use server';

/**
 * @fileOverview AI Chat Tutor for students, providing help with schoolwork.
 *
 * - aiChatTutorStudentQueries - A function that handles student questions and provides answers.
 * - AIChatTutorStudentQueriesInput - The input type for the aiChatTutorStudentQueries functionAIChatTutorStudentQueriesInput - AIChatTutorStudentQueriesOutput - The return type for the aiChatTutorStudentQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatTutorStudentQueriesInputSchema = z.object({
  question: z.string().describe('The student’s question about their schoolwork.'),
  context: z.string().optional().describe('Any additional context or information relevant to the question.'),
});
export type AIChatTutorStudentQueriesInput = z.infer<typeof AIChatTutorStudentQueriesInputSchema>;

const AIChatTutorStudentQueriesOutputSchema = z.object({
  answer: z.string().describe('The AI Chat Tutor’s answer to the student’s question.'),
});
export type AIChatTutorStudentQueriesOutput = z.infer<typeof AIChatTutorStudentQueriesOutputSchema>;

export async function aiChatTutorStudentQueries(input: AIChatTutorStudentQueriesInput): Promise<AIChatTutorStudentQueriesOutput> {
  return aiChatTutorStudentQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatTutorStudentQueriesPrompt',
  input: {schema: AIChatTutorStudentQueriesInputSchema},
  output: {schema: AIChatTutorStudentQueriesOutputSchema},
  prompt: `You are an AI Chat Tutor designed to help students with their schoolwork.

  You will be given a question and any relevant context.
  Your goal is to provide a clear, concise, and helpful answer to the student.

  Question: {{{question}}}

  {{#if context}}
  Context: {{{context}}}
  {{/if}}
  `,
});

const aiChatTutorStudentQueriesFlow = ai.defineFlow(
  {
    name: 'aiChatTutorStudentQueriesFlow',
    inputSchema: AIChatTutorStudentQueriesInputSchema,
    outputSchema: AIChatTutorStudentQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

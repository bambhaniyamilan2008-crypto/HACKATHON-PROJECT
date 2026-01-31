
'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Book, Clock, HelpCircle, ArrowRight } from 'lucide-react';

const practiceTests = [
  {
    subject: 'Mathematics',
    title: 'Algebra Fundamentals',
    questions: 20,
    duration: 45,
  },
  {
    subject: 'Physics',
    title: 'Newtonian Mechanics',
    questions: 15,
    duration: 30,
  },
  {
    subject: 'Chemistry',
    title: 'The World Wars',
    questions: 25,
    duration: 30,
  },
  {
    subject: 'English Literature',
    title: 'Shakespearean Plays',
    questions: 15,
    duration: 25,
  },
  {
    subject: 'Chemistry',
    title: 'The Periodic Table',
    questions: 30,
    duration: 40,
  },
    {
    subject: 'Biology',
    title: 'Cellular Structures',
    questions: 20,
    duration: 25,
  },
];

export default function PracticeTestsPage() {
  return (
    <div>
      <PageHeader
        title="Practice Tests"
        description="Hone your skills and prepare for your exams."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {practiceTests.map((test, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Book className="h-5 w-5" />
                 </div>
                <CardTitle className="text-xl">{test.title}</CardTitle>
              </div>
              <CardDescription>{test.subject}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                <div className='flex items-center gap-2'>
                    <HelpCircle size={16} />
                    <span>{test.questions} Questions</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Clock size={16} />
                    <span>{test.duration} min</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <span>Start Test</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

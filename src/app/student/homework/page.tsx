
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Book, FileUp, Paperclip, Send } from 'lucide-react';

type Assignment = {
  subject: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  grade?: string;
};

const homeworkAssignments: Assignment[] = [
  {
    subject: 'Mathematics',
    title: 'Algebra II - Problem Set 3',
    dueDate: '2024-08-15',
    status: 'Pending',
  },
  {
    subject: 'Physics',
    title: 'Lab Report: Thermodynamics',
    dueDate: '2024-08-12',
    status: 'Submitted',
  },
  {
    subject: 'Chemistry',
    title: 'Essay: The Renaissance Period',
    dueDate: '2024-08-10',
    status: 'Graded',
    grade: 'A-',
  },
  {
    subject: 'English Literature',
    title: 'Character Analysis of Hamlet',
    dueDate: '2024-08-20',
    status: 'Pending',
  },
];

export default function HomeworkPage() {
  const [open, setOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const handleOpenDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Submitting assignment...');
    setOpen(false);
  };

  return (
    <div>
      <PageHeader title="Homework" description="View and submit your homework." />
      <Card>
        <CardHeader>
          <CardTitle>Your Assignments</CardTitle>
          <CardDescription>
            Here is a list of your current and past homework assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {homeworkAssignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{assignment.subject}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        assignment.status === 'Pending'
                          ? 'destructive'
                          : assignment.status === 'Submitted'
                          ? 'secondary'
                          : 'default'
                      }
                    >
                      {assignment.status}
                       {assignment.status === 'Graded' && ` (${assignment.grade})`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {assignment.status === 'Pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(assignment)}
                      >
                        Submit
                      </Button>
                    )}
                     {assignment.status === 'Submitted' && (
                      <Button variant="ghost" size="sm" disabled>
                        Submitted
                      </Button>
                    )}
                     {assignment.status === 'Graded' && (
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.subject}: {selectedAssignment?.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="submission-text">Submission Notes</Label>
                <Textarea
                  id="submission-text"
                  placeholder="Add any notes for your teacher here."
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file-upload">Attach File</Label>
                 <div className="relative">
                  <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="file-upload" type="file" className="pl-10" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Submit Assignment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

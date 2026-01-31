
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Download, FileUp, Paperclip, Send } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Material = {
  title: string;
  subject: string;
  type: 'Notes' | 'Slides' | 'Video' | 'Own';
  date: string;
  uploadedBy: string;
};

const materials: Material[] = [
  {
    title: 'Chapter 5: Light & Optics',
    subject: 'Physics',
    type: 'Notes',
    date: '2024-08-01',
    uploadedBy: 'Dobariya sir',
  },
  {
    title: 'The Great Gatsby - Chapter Summary',
    subject: 'English',
    type: 'Slides',
    date: '2024-07-28',
    uploadedBy: 'Mr. Davis',
  },
  {
    title: 'My Algebra Notes - Chapter 2',
    subject: 'Mathematics',
    type: 'Own',
    date: '2024-07-25',
    uploadedBy: 'Alex Johnson',
  },
];

export default function MaterialsPage() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploading material...');
    setOpen(false);
  };

  return (
    <div>
      <PageHeader title="Study Materials" description="Access and manage your study materials.">
        <Button onClick={() => setOpen(true)}>
          <FileUp className="mr-2 h-4 w-4" />
          Upload Materials
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Materials</CardTitle>
          <CardDescription>Download materials or upload your own notes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{material.title}</TableCell>
                  <TableCell>{material.subject}</TableCell>
                  <TableCell>
                    <Badge variant={material.type === 'Own' ? 'default' : 'secondary'}>{material.type}</Badge>
                  </TableCell>
                  <TableCell>{material.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
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
            <DialogTitle>Upload Study Material</DialogTitle>
            <DialogDescription>
              Share your notes or other helpful materials with yourself.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="material-title">Title</Label>
                <Input id="material-title" placeholder="e.g., My History Notes" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="material-subject">Subject</Label>
                <Input id="material-subject" placeholder="e.g., History" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file-upload">Attach File</Label>
                <div className="relative">
                  <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="file-upload" type="file" required className="pl-10" />
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
                <FileUp className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Edit, PlusCircle, Trash2, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

interface Notice {
  id: number;
  title: string;
  date: string;
  audience: string;
  content: string;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting Announcement',
    date: 'July 20, 2024',
    audience: 'Parents, Teachers',
    content: 'The quarterly Parent-Teacher meeting is scheduled for August 5th, 2024. All parents are requested to attend to discuss their child\'s progress.',
  },
  {
    id: 2,
    title: 'Holiday for National Day',
    date: 'July 18, 2024',
    audience: 'All',
    content: 'The school will remain closed on August 15th, 2024, on account of National Day.',
  },
   {
    id: 3,
    title: 'Science Fair Submissions',
    date: 'July 15, 2024',
    audience: 'Students (Grade 9-12)',
    content: 'Students interested in participating in the Annual Science Fair must submit their project proposals by July 30th, 2024.',
  },
];

export default function Page() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    audience: 'All',
    content: '',
  });
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both a title and content for the notice.",
      });
      return;
    }

    const noticeToAdd: Notice = {
      id: Date.now(),
      title: newNotice.title,
      audience: newNotice.audience,
      content: newNotice.content,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    setNotices([noticeToAdd, ...notices]);
    setIsCreateOpen(false);
    setNewNotice({ title: '', audience: 'All', content: '' });
    
    toast({
      title: "Notice Published",
      description: "The notice has been successfully posted to the school board.",
    });
  };

  const handleEditClick = (notice: Notice) => {
    setEditingNotice(notice);
    setIsEditOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.title || !editingNotice.content) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Notice title and content cannot be empty.",
      });
      return;
    }

    setNotices(notices.map(n => n.id === editingNotice.id ? editingNotice : n));
    setIsEditOpen(false);
    setEditingNotice(null);

    toast({
      title: "Notice Updated",
      description: "The changes have been saved successfully.",
    });
  };

  const deleteNotice = (id: number) => {
    setNotices(notices.filter(n => n.id !== id));
    toast({
      title: "Notice Deleted",
      description: "The notice has been removed from the board.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Notice Board" description="Manage school-wide notices.">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Publish New Notice</DialogTitle>
              <DialogDescription>
                Post an announcement for students, parents, or staff.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Notice Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Annual Sports Day" 
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select 
                  value={newNotice.audience} 
                  onValueChange={(val) => setNewNotice({...newNotice, audience: val})}
                >
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Students & Staff</SelectItem>
                    <SelectItem value="Teachers">Teachers Only</SelectItem>
                    <SelectItem value="Parents">Parents Only</SelectItem>
                    <SelectItem value="Students">Students Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Notice Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write the details of the announcement here..." 
                  rows={5}
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  <Bell className="mr-2 h-4 w-4" />
                  Publish Notice
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Edit Notice Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
            <DialogDescription>
              Modify the existing announcement details.
            </DialogDescription>
          </DialogHeader>
          {editingNotice && (
            <form onSubmit={handleUpdate} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Notice Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({...editingNotice, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-audience">Target Audience</Label>
                <Select 
                  value={editingNotice.audience} 
                  onValueChange={(val) => setEditingNotice({...editingNotice, audience: val})}
                >
                  <SelectTrigger id="edit-audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Students & Staff</SelectItem>
                    <SelectItem value="Teachers">Teachers Only</SelectItem>
                    <SelectItem value="Parents">Parents Only</SelectItem>
                    <SelectItem value="Students">Students Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Notice Content</Label>
                <Textarea 
                  id="edit-content" 
                  rows={5}
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({...editingNotice, content: e.target.value})}
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid gap-6">
        {notices.length === 0 ? (
          <Card className="border-dashed p-12 text-center text-muted-foreground">
            No active notices. Create one to keep the school informed.
          </Card>
        ) : notices.map((notice) => (
          <Card key={notice.id} className="group transition-all hover:border-primary/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{notice.title}</CardTitle>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{notice.audience}</span>
                        <span>•</span>
                        <span>Posted on {notice.date}</span>
                    </div>
                </div>
                 <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleEditClick(notice)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteNotice(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{notice.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

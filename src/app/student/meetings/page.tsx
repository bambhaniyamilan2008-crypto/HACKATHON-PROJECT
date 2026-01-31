'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  PlusCircle, 
  CheckCircle2, 
  Timer, 
  AlertCircle,
  MoreHorizontal,
  Save,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const initialMeetings = [
  {
    id: 'MT001',
    teacher: 'Mr. Vinesh Patel',
    subject: 'Mathematics',
    purpose: 'Doubt Clearing: Calculus & Limits',
    date: '2024-08-20',
    time: '10:30 AM',
    status: 'Approved',
    category: 'Doubt Solution',
    priority: 'High'
  },
  {
    id: 'MT002',
    teacher: 'Mr. Dobariya Sir',
    subject: 'Physics',
    purpose: 'Lab Project Final Review',
    date: '2024-08-22',
    time: '02:00 PM',
    status: 'Pending',
    category: 'Academic',
    priority: 'Medium'
  }
];

const faculty = [
  { id: 'T001', name: 'Mr. Vinesh Patel', subject: 'Mathematics' },
  { id: 'T002', name: 'Mr. Dobariya Sir', subject: 'Physics' },
  { id: 'T003', name: 'Mr. Bhavesh Gohil', subject: 'English' },
  { id: 'T004', name: 'Mr. Mohan Baraiya', subject: 'Chemistry' },
  { id: 'T005', name: 'Mr. Kirit Mavani', subject: 'Art' }
];

export default function StudentMeetingsPage() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    teacherId: '',
    purpose: '',
    date: '',
    time: '',
    category: 'Doubt Solution',
    priority: 'Medium'
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.teacherId || !newRequest.purpose || !newRequest.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select a teacher and specify the meeting purpose.",
      });
      return;
    }

    const selectedTeacher = faculty.find(f => f.id === newRequest.teacherId);
    const requestToAdd = {
      id: `MT00${meetings.length + 1}`,
      teacher: selectedTeacher?.name || 'Unknown',
      subject: selectedTeacher?.subject || 'General',
      purpose: newRequest.purpose,
      date: newRequest.date,
      time: newRequest.time || 'TBD',
      status: 'Pending',
      category: newRequest.category,
      priority: newRequest.priority
    };

    setMeetings([requestToAdd, ...meetings]);
    setIsRequestOpen(false);
    setNewRequest({ teacherId: '', purpose: '', date: '', time: '', category: 'Doubt Solution', priority: 'Medium' });
    
    toast({
      title: "Consultation Request Dispatched",
      description: `Your doubt solution request has been sent to ${requestToAdd.teacher}.`,
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader 
          title="Academic Consultation" 
          description="Schedule one-on-one sessions with faculty for doubt solutions and academic guidance."
        >
          <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
                <PlusCircle className="h-5 w-5" />
                <span className="font-black uppercase tracking-tighter text-xs">New Consultation</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
              <div className="bg-primary p-8 text-primary-foreground">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black tracking-tighter uppercase">Request Solution</DialogTitle>
                  <DialogDescription className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                    Define your doubt or discussion topic
                  </DialogDescription>
                </DialogHeader>
              </div>
              <form onSubmit={handleSendRequest} className="grid gap-6 p-8">
                <div className="grid gap-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Faculty Member</Label>
                  <Select 
                    value={newRequest.teacherId} 
                    onValueChange={(val) => setNewRequest({...newRequest, teacherId: val})}
                  >
                    <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                      <SelectValue placeholder="Select Faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      {faculty.map(f => (
                        <SelectItem key={f.id} value={f.id} className="font-bold">{f.name} ({f.subject})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Session Type</Label>
                    <Select 
                      value={newRequest.category} 
                      onValueChange={(val) => setNewRequest({...newRequest, category: val})}
                    >
                      <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Doubt Solution">Doubt Solution</SelectItem>
                        <SelectItem value="Academic">Academic Review</SelectItem>
                        <SelectItem value="Career">Career Guidance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Priority</Label>
                    <Select 
                      value={newRequest.priority} 
                      onValueChange={(val) => setNewRequest({...newRequest, priority: val})}
                    >
                      <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Target Date</Label>
                    <Input 
                      type="date" 
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newRequest.date}
                      onChange={(e) => setNewRequest({...newRequest, date: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Preferred Time</Label>
                    <Input 
                      type="text" 
                      placeholder="e.g. 10:30 AM"
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newRequest.time}
                      onChange={(e) => setNewRequest({...newRequest, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject Context / Doubt Details</Label>
                  <Textarea 
                    placeholder="Provide a brief context of your doubt..."
                    className="rounded-xl bg-muted/30 border-none font-bold min-h-[100px]"
                    value={newRequest.purpose}
                    onChange={(e) => setNewRequest({...newRequest, purpose: e.target.value})}
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full rounded-2xl h-14 bg-primary font-black uppercase tracking-tighter shadow-xl">
                    <Save className="mr-2 h-5 w-5" />
                    Dispatch Request
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </PageHeader>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-primary text-primary-foreground rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pb-4 px-10 pt-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-black tracking-tighter uppercase">Consultation Registry</CardTitle>
            </div>
            <CardDescription className="text-white/60 font-bold uppercase tracking-widest text-[9px]">Official record of academic one-on-one sessions</CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <div className="p-6 rounded-[2rem] bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner">
              <p className="text-sm font-medium leading-relaxed italic opacity-90">
                Total active requests: {meetings.filter(m => m.status === 'Pending').length} | 
                Approved sessions: {meetings.filter(m => m.status === 'Approved').length}
              </p>
            </div>
          </CardContent>
        </Card>

        {meetings.length === 0 ? (
          <Card className="border-dashed py-24 text-center rounded-[2.5rem] bg-muted/5">
            <Video className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No active consultation records found</p>
          </Card>
        ) : (
          meetings.map((meeting) => (
            <Card key={meeting.id} className="border-none shadow-xl bg-background rounded-[2.5rem] overflow-hidden group hover:scale-[1.01] transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className={cn(
                    "w-2",
                    meeting.status === 'Approved' ? 'bg-green-500' : 
                    meeting.status === 'Pending' ? 'bg-orange-500' : 'bg-muted'
                  )} />
                  <div className="flex-1 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner group-hover:bg-primary group-hover:text-white transition-colors">
                        <User className="h-10 w-10" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl font-black uppercase tracking-tight truncate">{meeting.teacher}</h3>
                          <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-tighter px-4 py-1">
                            {meeting.subject}
                          </Badge>
                          <Badge className="rounded-full bg-accent text-accent-foreground font-black text-[9px] uppercase tracking-widest border-none">
                            {meeting.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground font-semibold text-sm flex items-center gap-3">
                          <HelpCircle className="h-4 w-4 text-accent" />
                          {meeting.purpose}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 bg-muted/30 p-6 rounded-[2.5rem] border shadow-inner">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Target Date</span>
                        <div className="flex items-center gap-2 font-black text-sm uppercase">
                          <Calendar className="h-4 w-4 text-primary" />
                          {meeting.date}
                        </div>
                      </div>
                      <div className="hidden md:block w-px h-12 bg-border" />
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Reserved Slot</span>
                        <div className="flex items-center gap-2 font-black text-sm uppercase">
                          <Clock className="h-4 w-4 text-primary" />
                          {meeting.time}
                        </div>
                      </div>
                      <div className="hidden md:block w-px h-12 bg-border" />
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Status</span>
                        <Badge 
                          className={cn(
                            "rounded-full px-5 py-1.5 font-black text-[10px] uppercase tracking-tighter border-2 shadow-sm",
                            meeting.status === 'Approved' ? 'bg-green-500/10 text-green-600 border-green-200' :
                            meeting.status === 'Pending' ? 'bg-orange-500/10 text-orange-600 border-orange-200' :
                            'bg-muted text-muted-foreground border-muted'
                          )}
                          variant="outline"
                        >
                          {meeting.status === 'Approved' ? <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> : <Timer className="mr-2 h-3.5 w-3.5 animate-pulse" />}
                          {meeting.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/10 text-primary h-14 w-14 transition-all hover:scale-110">
                            <MoreHorizontal className="h-8 w-8" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-[2rem] w-64 p-3 shadow-2xl border-none bg-background/95 backdrop-blur-md">
                          <DropdownMenuLabel className="font-black uppercase tracking-widest text-[9px] text-muted-foreground px-4 py-3">Management Options</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest py-4 px-4 hover:bg-primary/10 transition-colors">
                            <Video className="h-4 w-4 text-primary" /> Virtual Classroom
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest py-4 px-4 hover:bg-primary/10 transition-colors">
                            <MessageSquare className="h-4 w-4 text-primary" /> Send Notes
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center gap-3 py-4 px-4 hover:bg-destructive/10 transition-colors">
                            <AlertCircle className="h-4 w-4" /> Cancel Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

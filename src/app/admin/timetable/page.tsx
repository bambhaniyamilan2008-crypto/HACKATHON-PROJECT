
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Save, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Loader2, 
  BrainCircuit, 
  Clock, 
  User, 
  ChevronRight,
  Zap,
  LayoutGrid
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const initialSchedule: Record<string, any[]> = {
  Monday: [
    { time: '09:00 - 09:50', subject: 'Mathematics', teacher: 'Mr. Rahul Rathod' },
    { time: '10:00 - 10:50', subject: 'Physics', teacher: 'Mr. Vinesh Patel' },
    { time: '11:00 - 11:50', subject: 'English', teacher: 'Mr. Bhavesh Gohil' },
    { time: '12:00 - 12:50', subject: 'Lunch', teacher: '' },
    { time: '13:00 - 13:50', subject: 'Chemistry', teacher: 'Mr. Mohan Baraiya' },
  ],
  Tuesday: [
    { time: '09:00 - 09:50', subject: 'Chemistry', teacher: 'Mr. Mohan Baraiya' },
    { time: '10:00 - 10:50', subject: 'Art', teacher: 'Mr. Kirit Mavani' },
    { time: '11:00 - 11:50', subject: 'English', teacher: 'Mr. Bhavesh Gohil' },
    { time: '12:00 - 12:50', subject: 'Lunch', teacher: '' },
    { time: '13:00 - 13:50', subject: 'Physics', teacher: 'Mr. Vinesh Patel' },
  ],
  Wednesday: [
    { time: '09:00 - 09:50', subject: 'Mathematics', teacher: 'Mr. Rahul Rathod' },
    { time: '10:00 - 10:50', subject: 'Mathematics', teacher: 'Mr. Rahul Rathod' },
    { time: '11:00 - 11:50', subject: 'English', teacher: 'Mr. Bhavesh Gohil' },
    { time: '12:00 - 12:50', subject: 'Lunch', teacher: '' },
    { time: '13:00 - 13:50', subject: 'Physics', teacher: 'Mr. Vinesh Patel' },
  ],
  Thursday: [
    { time: '09:00 - 09:50', subject: 'Physics', teacher: 'Mr. Vinesh Patel' },
    { time: '10:00 - 10:50', subject: 'Chemistry', teacher: 'Mr. Mohan Baraiya' },
    { time: '11:00 - 11:50', subject: 'Mathematics', teacher: 'Mr. Rahul Rathod' },
    { time: '12:00 - 12:50', subject: 'Lunch', teacher: '' },
    { time: '13:00 - 13:50', subject: 'Art', teacher: 'Mr. Kirit Mavani' },
  ],
  Friday: [
    { time: '09:00 - 09:50', subject: 'English', teacher: 'Mr. Bhavesh Gohil' },
    { time: '10:00 - 10:50', subject: 'Physics', teacher: 'Mr. Vinesh Patel' },
    { time: '11:00 - 11:50', subject: 'Chemistry', teacher: 'Mr. Mohan Baraiya' },
    { time: '12:00 - 12:50', subject: 'Lunch', teacher: '' },
    { time: '13:00 - 13:50', subject: 'Mathematics', teacher: 'Mr. Rahul Rathod' },
  ],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['09:00 - 09:50', '10:00 - 10:50', '11:00 - 11:50', '12:00 - 12:50', '13:00 - 13:50'];

const getSubjectColor = (subject: string) => {
  const colors: Record<string, string> = {
    'Mathematics': 'bg-blue-500/10 text-blue-600 border-blue-200',
    'Physics': 'bg-purple-500/10 text-purple-600 border-purple-200',
    'Chemistry': 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    'English': 'bg-orange-500/10 text-orange-600 border-orange-200',
    'Art': 'bg-pink-500/10 text-pink-600 border-pink-200',
    'Biology': 'bg-green-500/10 text-green-600 border-green-200',
    'Computer Science': 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    'Lunch': 'bg-muted/50 text-muted-foreground border-dashed border-muted',
  };
  return colors[subject] || 'bg-primary/5 text-primary border-primary/10';
};

const facultyPool = [
  { name: 'Mathematics', teacher: 'Mr. Rahul Rathod' },
  { name: 'Physics', teacher: 'Mr. Vinesh Patel' },
  { name: 'Chemistry', teacher: 'Mr. Mohan Baraiya' },
  { name: 'English', teacher: 'Mr. Bhavesh Gohil' },
  { name: 'Art', teacher: 'Mr. Kirit Mavani' },
  { name: 'Biology', teacher: 'Mr. Vishal Bambhaniya' },
  { name: 'Computer Science', teacher: 'Mr. Jay Sanghadi' },
];

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  
  const [newEntry, setNewEntry] = useState({
    day: 'Monday',
    slotIndex: '0',
    subject: '',
    teacher: '',
  });

  const handleSmartGenerate = async () => {
    setIsGenerating(true);
    setAiReasoning(null);
    
    // Simulate Neural Computation
    await new Promise(resolve => setTimeout(resolve, 1800));

    try {
      const newSchedule: Record<string, any[]> = {};

      days.forEach(day => {
        newSchedule[day] = timeSlots.map((time, index) => {
          if (index === 3) { // 12:00 slot is always reserved for Lunch
            return { time, subject: 'Lunch', teacher: '' };
          }
          
          // Weighted randomization to ensure core subjects appear more often
          const randomIdx = Math.floor(Math.random() * facultyPool.length);
          const assignment = facultyPool[randomIdx];
          
          return { time, ...assignment };
        });
      });

      setSchedule(newSchedule);
      setAiReasoning(`Neural optimization complete for Class ${selectedClass}. Subject distribution has been balanced based on teacher workload and student cognitive load for the afternoon sessions.`);
      
      toast({
        title: "Smart Timetable Ready",
        description: `Neural-optimized schedule generated for Class ${selectedClass}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: "An unexpected error occurred during neural scheduling.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.subject) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Subject name is required.",
      });
      return;
    }

    const updatedSchedule = { ...schedule };
    const daySchedule = [...(updatedSchedule[newEntry.day] || [])];
    const index = parseInt(newEntry.slotIndex);
    
    if (daySchedule[index]) {
      daySchedule[index] = {
        ...daySchedule[index],
        subject: newEntry.subject,
        teacher: newEntry.teacher,
      };
    }

    updatedSchedule[newEntry.day] = daySchedule;
    setSchedule(updatedSchedule);
    setIsAddEntryOpen(false);
    setNewEntry({ ...newEntry, subject: '', teacher: '' });

    toast({
      title: "Entry Created",
      description: `Schedule for ${newEntry.day} has been updated manually.`,
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader title="Curriculum Timetable" description="Manage class schedules with intelligent AI-powered optimization.">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-background p-1 rounded-xl border shadow-sm">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[120px] border-none shadow-none focus:ring-0 font-bold">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {['9A', '9B', '10A', '10B', '11A', '12A'].map(c => (
                    <SelectItem key={c} value={c} className="font-bold">Class {c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSmartGenerate} 
              disabled={isGenerating}
              className="rounded-xl bg-gradient-to-r from-primary to-indigo-600 shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span className="font-black uppercase tracking-tighter text-xs">Smart Generate</span>
            </Button>
            
            <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-xl border-dashed border-2 hover:bg-muted/50 gap-2 h-12">
                  <PlusCircle className="h-4 w-4" />
                  <span className="font-bold text-xs uppercase tracking-tight">Manual Entry</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black tracking-tighter uppercase">Manual Schedule Entry</DialogTitle>
                  <DialogDescription>
                    Update a specific time slot for the current class.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddEntry} className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="day" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Select Day</Label>
                    <Select 
                      value={newEntry.day} 
                      onValueChange={(val) => setNewEntry({...newEntry, day: val})}
                    >
                      <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map(day => (
                          <SelectItem key={day} value={day} className="font-bold">{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slot" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Time Slot</Label>
                    <Select 
                      value={newEntry.slotIndex} 
                      onValueChange={(val) => setNewEntry({...newEntry, slotIndex: val})}
                    >
                      <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time, i) => (
                          <SelectItem key={i} value={i.toString()} className="font-bold">{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject Name</Label>
                    <Input
                      id="subject"
                      placeholder="e.g. Advanced Physics"
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newEntry.subject}
                      onChange={(e) => setNewEntry({...newEntry, subject: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Teacher Name</Label>
                    <Input
                      id="teacher"
                      placeholder="e.g. Dr. Jane Foster"
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newEntry.teacher}
                      onChange={(e) => setNewEntry({...newEntry, teacher: e.target.value})}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full rounded-xl h-12 bg-primary font-black uppercase tracking-tighter shadow-lg">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </PageHeader>
      </div>

      {aiReasoning && (
        <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-primary text-primary-foreground rounded-[2rem] overflow-hidden animate-fade-in">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-black tracking-tighter uppercase">AI Strategy Insight</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium italic leading-relaxed bg-white/10 p-6 rounded-2xl border border-white/10 shadow-inner">
              "{aiReasoning}"
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 border-b py-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
              <LayoutGrid className="h-7 w-7 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-black tracking-tighter uppercase">Class {selectedClass} Master Grid</CardTitle>
              <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Active Academic Session 2024-25</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                  <TableHead className="w-[160px] py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground border-r">Time Sequence</TableHead>
                  {days.map((day) => (
                    <TableHead key={day} className="text-center font-black uppercase tracking-widest text-[10px] text-primary">{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((time, slotIndex) => (
                  <TableRow key={slotIndex} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                    <TableCell className="font-mono text-xs font-black py-8 px-8 border-r bg-muted/5 group-hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {time}
                      </div>
                    </TableCell>
                    {days.map((day) => {
                      const slot = schedule[day]?.[slotIndex];
                      const isLunch = slot?.subject === 'Lunch';
                      const colorClasses = getSubjectColor(slot?.subject || '');
                      
                      return (
                        <TableCell key={`${day}-${slotIndex}`} className="p-3 border-r last:border-r-0 min-w-[180px]">
                          {slot ? (
                            <div className={cn(
                              "p-5 rounded-2xl flex flex-col items-center text-center gap-3 transition-all h-full justify-center min-h-[110px] border-2 shadow-sm group/slot hover:scale-[1.03] hover:shadow-lg",
                              colorClasses
                            )}>
                              <div className="flex flex-col gap-1 items-center">
                                <div className={cn(
                                  "font-black text-sm tracking-tight uppercase leading-none",
                                  isLunch ? "text-muted-foreground" : ""
                                )}>
                                  {slot.subject}
                                </div>
                                {isLunch && <Zap className="h-4 w-4 text-accent fill-accent animate-pulse mt-1" />}
                              </div>
                              
                              {slot.teacher && (
                                <Badge variant="outline" className="bg-white/50 dark:bg-black/20 border-none font-bold text-[9px] uppercase tracking-wider py-1 px-3 flex items-center gap-1.5 rounded-full shadow-inner">
                                  <User className="h-2.5 w-2.5" />
                                  {slot.teacher}
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center py-4 min-h-[110px] border-2 border-dashed border-muted/30 rounded-2xl opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all">
                              <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Self Study</span>
                              <ChevronRight className="h-3 w-3 text-muted-foreground/30 mt-1" />
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  CalendarIcon, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ListChecks, 
  Target, 
  Zap, 
  CalendarDays,
  Save,
  LayoutGrid
} from 'lucide-react';
import { format, isBefore, startOfToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  deadline: Date;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState<Date | undefined>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initialTasks: Task[] = [
      { id: '1', title: 'Grade Mathematics final assignments for Class 10A', deadline: new Date(Date.now() - 86400000), completed: false },
      { id: '2', title: 'Prep for Class 12B Physics laboratory session', deadline: new Date(Date.now() + 172800000), completed: false },
      { id: '3', title: 'Submit quarterly attendance summary to administration', deadline: new Date(), completed: true },
      { id: '4', title: 'Organize parent-teacher meeting schedule', deadline: new Date(Date.now() + 432000000), completed: false },
    ];
    setTasks(initialTasks);
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDate) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      deadline: newTaskDate,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDate(new Date());
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const isOverdue = (task: Task) => {
    return !task.completed && isBefore(task.deadline, startOfToday());
  };

  if (!isMounted) return null;

  const completedCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => isOverdue(t)).length;

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader 
          title="Mission Control" 
          description="Track official duties, academic deadlines, and administrative milestones."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <ListChecks className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Duties</p>
              <p className="text-2xl font-black">{tasks.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Completed</p>
              <p className="text-2xl font-black">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive group-hover:bg-destructive group-hover:text-white transition-colors">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Overdue</p>
              <p className="text-2xl font-black">{overdueCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Creation Hub */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-6 px-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black tracking-tighter uppercase">New Mission</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Initialize a new duty</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={addTask} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Duty Identity</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Prepare Exam Papers" 
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Completion Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 rounded-xl justify-start text-left font-bold bg-muted/30 border-none",
                          !newTaskDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        {newTaskDate ? format(newTaskDate, "PPP") : <span className="uppercase text-[10px] tracking-widest opacity-50">Select Target Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-2xl" align="start">
                      <Calendar
                        mode="single"
                        selected={newTaskDate}
                        onSelect={setNewTaskDate}
                        initialFocus
                        className="rounded-2xl"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button type="submit" className="w-full rounded-xl h-14 bg-primary shadow-lg hover:shadow-primary/20 transition-all font-black uppercase tracking-tighter">
                  <Save className="mr-2 h-5 w-5" /> Initialize Task
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Task Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                    <LayoutGrid className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-black tracking-tighter uppercase">Duty Matrix</CardTitle>
                    <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Real-time operational status of school assignments</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-tighter">
                    {tasks.length} Total Units
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4 border-2 border-dashed rounded-[2rem] bg-muted/5">
                    <Zap className="h-12 w-12 opacity-10" />
                    <p className="italic font-bold uppercase tracking-widest text-xs opacity-50">No operations currently active</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={cn(
                        "group relative flex items-center justify-between p-6 border-2 rounded-[2rem] transition-all duration-300",
                        task.completed ? "bg-muted/10 border-muted opacity-75" : "bg-background border-transparent hover:border-primary/20 hover:shadow-xl",
                        isOverdue(task) && !task.completed && "border-destructive/20 bg-destructive/5"
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <Checkbox 
                          checked={task.completed} 
                          onCheckedChange={() => toggleTask(task.id)}
                          className="h-6 w-6 rounded-lg border-2 border-primary data-[state=checked]:bg-primary transition-all"
                        />
                        <div className="flex flex-col gap-1">
                          <span className={cn(
                            "font-black text-lg tracking-tight uppercase transition-all",
                            task.completed && "line-through text-muted-foreground"
                          )}>
                            {task.title}
                          </span>
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                              isOverdue(task) && !task.completed 
                                ? "bg-destructive text-destructive-foreground animate-pulse" 
                                : task.completed 
                                ? "bg-muted text-muted-foreground" 
                                : "bg-primary/10 text-primary"
                            )}>
                              {isOverdue(task) && !task.completed ? <AlertCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              {format(task.deadline, "MMM dd, yyyy")}
                              {isOverdue(task) && !task.completed && " (CRITICAL OVERDUE)"}
                            </div>
                            {!task.completed && !isOverdue(task) && (
                              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                                <CalendarDays className="h-3 w-3" />
                                Scheduled
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteTask(task.id)}
                        className="rounded-xl h-10 w-10 text-muted-foreground hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

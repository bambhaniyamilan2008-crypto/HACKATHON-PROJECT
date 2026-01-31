'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Loader2, 
  Clock, 
  BrainCircuit, 
  BookOpen, 
  CalendarDays, 
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';
import { smartGenerateStudyPlan } from '@/app/actions';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Subject {
  name: string;
  examDate: string;
  difficulty: number;
}

export default function StudyPlannerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: 'Advanced Mathematics', examDate: '2024-12-15', difficulty: 3 },
    { name: 'English Literature', examDate: '2024-12-10', difficulty: 1 },
  ]);
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', examDate: '', difficulty: 2 }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: keyof Subject, value: string | number) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const handleGenerate = async () => {
    if (subjects.some(s => !s.name || !s.examDate)) {
      toast({
        variant: "destructive",
        title: "Incomplete Data",
        description: "Please ensure all subject names and exam dates are filled.",
      });
      return;
    }

    setIsGenerating(true);
    const result = await smartGenerateStudyPlan(subjects, dailyHours);
    
    if (result.success && result.data) {
      setPlan(result.data);
      toast({
        title: "Master Plan Ready",
        description: "Your AI-optimized study schedule has been generated.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: "The study engine encountered a problem. Please try again.",
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader 
          title="Intelligent Study Planner" 
          description="Leverage neural scheduling to optimize your exam preparation based on priority and difficulty."
        >
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating} 
            size="lg" 
            className="rounded-2xl h-14 px-8 bg-gradient-to-br from-primary to-accent shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            {isGenerating ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-3 h-5 w-5" />
            )}
            <span className="font-black uppercase tracking-tighter">Generate Master Plan</span>
          </Button>
        </PageHeader>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Input Configuration Column */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-primary/5 p-6 border-b border-primary/10">
              <h3 className="font-black text-lg flex items-center gap-2 uppercase tracking-tight">
                <Target className="h-5 w-5 text-primary" />
                Parameters
              </h3>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <Label htmlFor="daily-hours" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Availability</Label>
                <div className="flex items-center gap-6 p-4 bg-muted/20 rounded-2xl border border-muted">
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-bold text-muted-foreground">Focus Hours / Day</p>
                    <Input 
                      id="daily-hours" 
                      type="number" 
                      min={1} 
                      max={16} 
                      value={dailyHours} 
                      onChange={(e) => setDailyHours(parseInt(e.target.value) || 0)}
                      className="border-none bg-transparent text-3xl font-black p-0 h-auto focus-visible:ring-0 shadow-none"
                    />
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">
                    HR
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subject Matrix</Label>
                  <Button variant="ghost" size="sm" onClick={addSubject} className="rounded-full hover:bg-primary/10 text-primary font-bold">
                    <Plus className="h-4 w-4 mr-1" /> Add Subject
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="group relative p-6 bg-card border-2 rounded-3xl transition-all hover:border-primary/30 hover:shadow-lg">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-destructive text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeSubject(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      
                      <div className="space-y-4">
                        <Input 
                          placeholder="e.g. Quantum Physics" 
                          value={subject.name} 
                          onChange={(e) => updateSubject(index, 'name', e.target.value)} 
                          className="border-none p-0 text-xl font-black bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/30"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground">Exam Date</Label>
                            <Input 
                              type="date" 
                              value={subject.examDate} 
                              onChange={(e) => updateSubject(index, 'examDate', e.target.value)} 
                              className="h-10 rounded-xl bg-muted/30 border-none font-medium text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground">Complexity</Label>
                            <Select 
                              value={subject.difficulty.toString()} 
                              onValueChange={(val) => updateSubject(index, 'difficulty', parseInt(val))}
                            >
                              <SelectTrigger className="h-10 rounded-xl bg-muted/30 border-none font-bold text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1" className="font-bold">Level 1 (Basic)</SelectItem>
                                <SelectItem value="2" className="font-bold">Level 2 (Medium)</SelectItem>
                                <SelectItem value="3" className="font-bold text-destructive">Level 3 (Hard)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 space-y-8">
          {plan ? (
            <div className="animate-fade-in space-y-8">
              <Card className="border-none bg-gradient-to-br from-primary to-accent shadow-2xl rounded-[2rem] text-primary-foreground overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-white/20 text-white border-none backdrop-blur-md uppercase font-black text-[10px] tracking-widest px-3 py-1">Strategy Insight</Badge>
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tighter">AI Prioritization Logic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-lg leading-relaxed font-medium italic italic-shadow">
                    "{plan.prioritizationLogic}"
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Your Weekly Blueprint</h2>
                </div>

                <div className="grid gap-6">
                  {plan.weeklyPlan.map((dayPlan: any, index: number) => (
                    <Card key={index} className="border-none shadow-xl rounded-3xl group overflow-hidden bg-card transition-all hover:translate-x-2">
                      <div className="flex">
                        <div className="w-2 bg-primary group-hover:w-4 transition-all" />
                        <div className="flex-1">
                          <CardHeader className="flex flex-row items-center justify-between py-6">
                            <CardTitle className="text-2xl font-black text-primary">{dayPlan.day}</CardTitle>
                            <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-bold">{dayPlan.tasks.length} SESSIONS</Badge>
                          </CardHeader>
                          <CardContent className="pb-8 space-y-4">
                            {dayPlan.tasks.map((task: any, taskIndex: number) => (
                              <div key={taskIndex} className="group/session relative p-5 rounded-2xl bg-muted/20 border-2 border-transparent hover:border-primary/10 hover:bg-muted/40 transition-all flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-2xl bg-white dark:bg-black/40 flex items-center justify-center shadow-sm">
                                    <BookOpen className="h-6 w-6 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-black text-lg leading-tight">{task.subject}</p>
                                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-1">
                                      <Zap className="h-3 w-3 text-accent fill-accent" />
                                      {task.topic}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-black text-sm flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {task.duration}
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover/session:text-primary transition-colors" />
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center min-h-[600px] border-4 border-dashed rounded-[3rem] text-center p-12 bg-muted/5 group hover:border-primary/20 transition-all">
              <div className="relative">
                <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <BrainCircuit className="h-12 w-12 text-primary group-hover:rotate-12 transition-transform" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-accent animate-pulse" />
              </div>
              <CardTitle className="text-3xl font-black uppercase tracking-tighter">Intelligence Engine Idle</CardTitle>
              <CardDescription className="max-w-[400px] mt-4 text-lg font-medium leading-relaxed">
                Provide your academic subjects, complexity levels, and target dates to initialize the neural study optimizer.
              </CardDescription>
              <div className="mt-8 flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-accent" /> Exam-Focused</span>
                <span className="px-2 opacity-20">|</span>
                <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-accent" /> Priority Balancing</span>
                <span className="px-2 opacity-20">|</span>
                <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-accent" /> Custom Intervals</span>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

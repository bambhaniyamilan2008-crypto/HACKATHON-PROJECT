import {
  CheckCircle2,
  Clock,
  Target,
  Trophy,
  ArrowRight,
  BellRing,
  Flame,
  AlertTriangle,
  Sparkles,
  DollarSign,
  TrendingUp,
  BrainCircuit,
  Zap,
  BookOpen,
  CalendarDays
} from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/dashboard/page-header';
import { StudyStreak } from '@/components/dashboard/study-streak';
import { StudyAnalytics } from '@/components/dashboard/study-charts';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader
          title="Student Intelligence Hub"
          description="Welcome back, Alex. Your neural study map is active and optimized for today's curriculum."
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StudyStreak streakDays={8} /> 
        
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Focus Time</p>
              <p className="text-2xl font-black">28.5 hrs</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-tighter">
                <TrendingUp className="h-3 w-3" /> +12% Efficiency
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors shadow-inner">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Task Mastery</p>
              <p className="text-2xl font-black">12 / 15</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                <CheckCircle2 className="h-3 w-3" /> 80% Complete
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-destructive/5 rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform border-2 border-dashed border-destructive/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-destructive flex items-center justify-center text-white shadow-lg animate-pulse">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-destructive tracking-widest">Fee Overdue</p>
              <p className="text-2xl font-black text-destructive">₹230,000</p>
              <div className="flex items-center gap-1 text-[10px] font-black text-destructive uppercase tracking-tighter underline">
                Action Required
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Learning Analytics</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Cross-curricular performance mapping</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <StudyAnalytics />
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-inner">
                    <CalendarDays className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none text-accent">Mission Deadlines</CardTitle>
                    <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Imminent academic milestones</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" className="rounded-xl font-black uppercase tracking-tighter text-[10px]" asChild>
                  <Link href="/admin/tasks" className="flex items-center gap-2">View All <ArrowRight className="h-3 w-3" /></Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {[
                  { title: 'Mathematics Assignment', desc: 'Unit 4: Integration & Limits', deadline: 'Tomorrow', color: 'text-destructive', bg: 'bg-destructive/10' },
                  { title: 'Physics Lab Report', desc: 'Experiment 8: Optics and Lenses', deadline: 'Friday', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                  { title: 'English Essay', desc: 'Themes in Hamlet', deadline: 'Aug 20', color: 'text-muted-foreground', bg: 'bg-muted/30' },
                ].map((task, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-muted/20 border-b last:border-0 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl ${task.bg} flex items-center justify-center ${task.color}`}>
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">{task.title}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{task.desc}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`rounded-xl font-black uppercase text-[10px] border-none px-4 py-1.5 ${task.bg} ${task.color}`}>
                      {task.deadline}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-8">
          <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-primary text-primary-foreground rounded-[2.5rem] overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-black tracking-tighter uppercase">AI Intelligence</CardTitle>
              </div>
              <CardDescription className="text-white/60 font-bold uppercase tracking-widest text-[9px]">Neural session reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner group hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-white mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white">Time to study Physics</p>
                    <p className="text-[10px] text-white/70 font-medium leading-relaxed mt-1">Optimized for tomorrow's exam window based on 88% accuracy rating.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner group hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <Flame className="h-5 w-5 text-accent mt-0.5 fill-accent" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white">Don't break your streak!</p>
                    <p className="text-[10px] text-white/70 font-medium leading-relaxed mt-1">1 hour study session required to reach Silver Grade (10 days).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center shadow-inner">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none text-green-600">Milestones</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Active achievements & badges</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border-2 border-transparent hover:border-primary/20 transition-all shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-400/20 flex items-center justify-center shadow-inner">
                  <Trophy className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight">Silver Streak Badge</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">7-Day Study Mastery Achieved</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-500/5 border-2 border-transparent hover:border-green-500/20 transition-all shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight">Math Master</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">100% Score: Unit 3 Algebra</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { AIChatTutor } from '@/components/dashboard/student/ai-chat-tutor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookCheck,
  CalendarClock,
  ClipboardCheck,
  Clock,
  User,
  Video,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const schedule = [
  { time: '09:00 - 09:50', subject: 'Mathematics', teacher: 'Vinesh sir' },
  { time: '10:00 - 10:50', subject: 'Physics', teacher: 'Dobariya sir' },
  { time: '11:00 - 11:50', subject: 'English', teacher: 'Mr. Davis' },
  { time: '12:50 - 01:40', subject: 'Chemistry', teacher: 'Mavani sir' },
];

const deadlines = [
    { title: 'Algebra II - Problem Set 3', subject: 'Mathematics', dueDate: 'Aug 15' },
    { title: 'Lab Report: Thermodynamics', subject: 'Physics', dueDate: 'Aug 12' },
    { title: 'Character Analysis of Hamlet', subject: 'English', dueDate: 'Aug 20' },
]

export default function StudentDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader
          title="Hi, Alex!"
          description="Your personalized academic intelligence hub is active."
        >
          <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6" asChild>
              <Link href="/student/timetable">
                  <CalendarClock className="h-5 w-5" />
                  <span className="font-black uppercase tracking-tighter text-xs">Full Timetable</span>
              </Link>
          </Button>
        </PageHeader>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Actions / Doubt Clearing Section */}
          <Card className="border-none shadow-2xl bg-gradient-to-br from-accent to-orange-600 text-white rounded-[2.5rem] overflow-hidden group hover:scale-[1.01] transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter">Struggling with a topic?</CardTitle>
                    <CardDescription className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Instant Doubt Solutions</CardDescription>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-none backdrop-blur-md uppercase font-black text-[10px] tracking-widest px-3 py-1">Priority Service</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6 pb-8">
              <p className="flex-1 text-lg font-medium leading-relaxed italic border-l-4 border-white/30 pl-6 py-2">
                "Don't let doubts pile up. Schedule a 1-on-1 session with your faculty lead or use the AI Tutor for instant help."
              </p>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button className="rounded-2xl h-14 px-8 bg-white text-accent hover:bg-white/90 font-black uppercase tracking-tighter shadow-xl group/btn" asChild>
                  <Link href="/student/meetings">
                    Meet Teacher <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Today's Schedule</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Active classes for session 2024</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {schedule.map((item, i) => (
                  <div key={i} className="group p-6 flex items-center gap-6 hover:bg-primary/[0.02] border-b last:border-0 transition-colors">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-muted/50 border-2 border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 text-muted-foreground group-hover:text-primary transition-all">
                      <Zap className={i === 0 ? "h-6 w-6 fill-primary text-primary" : "h-6 w-6"} />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{item.subject}</p>
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {item.time}</span>
                        <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {item.teacher}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl border-2 font-black uppercase text-[10px] tracking-widest h-10 px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Video className="mr-2 h-3.5 w-3.5" /> Join Room
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-inner">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">AI Neural Tutor</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Context-aware academic support</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
                <AIChatTutor />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <Card className="rounded-3xl border-none shadow-xl bg-primary text-primary-foreground overflow-hidden group">
              <CardContent className="p-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Assignments</p>
                  <p className="text-4xl font-black mt-1">03</p>
                  <p className="text-[10px] font-bold uppercase mt-2 text-white/60">Due this week</p>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <BookCheck className="h-8 w-8 text-white" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-xl bg-background overflow-hidden group border-2 border-primary/5">
              <CardContent className="p-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Attendance</p>
                  <p className="text-4xl font-black mt-1 text-primary">92%</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] font-bold uppercase text-green-600">Active Record</p>
                  </div>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <ClipboardCheck className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shadow-inner">
                  <CalendarClock className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Milestones</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Imminent Deadlines</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {deadlines.map((item, i) => (
                    <div key={i} className="p-6 flex items-start gap-4 hover:bg-muted/20 border-b last:border-0 transition-colors group">
                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                            <ClipboardCheck className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-sm uppercase tracking-tight truncate">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{item.subject}</p>
                            <Badge variant="secondary" className="mt-3 rounded-lg font-black text-[9px] uppercase tracking-tighter border-none bg-muted/50">
                              Target: {item.dueDate}
                            </Badge>
                        </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

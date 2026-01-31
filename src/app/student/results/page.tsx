'use client';

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
import { Download, TrendingUp, BarChart3, GraduationCap, LayoutGrid, Zap, Award } from 'lucide-react';
import { StudentPerformanceChart } from '@/components/dashboard/student/student-performance-chart';
import { cn } from '@/lib/utils';

const latestResults = [
  { subject: 'Mathematics', grade: 'A', score: 95, remarks: 'Excellent Mastery' },
  { subject: 'Physics', grade: 'B+', score: 88, remarks: 'Good Analytical Skills' },
  { subject: 'Chemistry', grade: 'A-', score: 92, remarks: 'Strong Foundation' },
  { subject: 'English Literature', grade: 'B', score: 85, remarks: 'Improving Articulation' },
  { subject: 'Biology', grade: 'C+', score: 78, remarks: 'Review Chapter 4-6' },
];

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader
          title="Curricular Efficiency"
          description="Verified academic performance logs and institutional ranking data."
        >
          <Button variant="outline" className="rounded-xl border-2 font-black uppercase text-[10px] tracking-widest h-12 px-6 shadow-sm hover:shadow-md transition-all">
            <Download className="mr-2 h-4 w-4" />
            Export Official Report
          </Button>
        </PageHeader>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Aggregate Grade</p>
              <p className="text-2xl font-black">B+</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-tighter">
                <TrendingUp className="h-3 w-3" /> Top 15% Rank
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shadow-inner">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Efficiency</p>
              <p className="text-2xl font-black">87.6%</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-tighter">
                <Zap className="h-3 w-3 fill-accent" /> +4% Growth
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors shadow-inner">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Credits</p>
              <p className="text-2xl font-black">438 / 500</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                <LayoutGrid className="h-3 w-3" /> 5 Subjects Logged
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-indigo-600 text-white rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-white/70 tracking-widest">Next Target</p>
              <p className="text-2xl font-black">92% AVG</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-white/90 uppercase tracking-tighter">
                Strategic Goal
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Assessment Matrix</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Term 1 official evaluation log</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                    <TableHead className="py-6 px-10 font-black uppercase tracking-widest text-[10px] text-muted-foreground border-r">Subject Area</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary text-center">Score</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary text-center">Grade</TableHead>
                    <TableHead className="text-right px-10 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Expert Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestResults.map((result) => (
                    <TableRow key={result.subject} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                      <TableCell className="font-black text-lg py-8 px-10 uppercase border-r bg-muted/5 group-hover:bg-primary/5 transition-colors">
                        {result.subject}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xl font-black">{result.score}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={cn(
                            "rounded-xl font-black text-[10px] uppercase tracking-widest px-4 py-1 border-none shadow-sm",
                            result.score >= 90 ? 'bg-green-500 text-white' : 'bg-primary text-white'
                          )}
                        >
                          {result.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-10 font-bold text-sm text-muted-foreground group-hover:text-foreground transition-colors italic">
                        "{result.remarks}"
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-inner">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none text-accent">Velocity</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Monthly accuracy analysis</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 flex flex-col justify-center min-h-[300px]">
              <StudentPerformanceChart />
              <p className="text-[9px] font-black uppercase text-muted-foreground text-center tracking-[0.2em] mt-6">Active Academic Session 2024</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl bg-gradient-to-br from-primary to-indigo-600 text-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                <GraduationCap className="h-6 w-6" /> Honors Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner">
                <p className="text-sm font-bold leading-relaxed mb-4">
                  You are currently tracking for the "Dean's List" honors. Maintain 90%+ in Mathematics to secure the Platinum Badge.
                </p>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[85%]" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-white/60">85% to milestone</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

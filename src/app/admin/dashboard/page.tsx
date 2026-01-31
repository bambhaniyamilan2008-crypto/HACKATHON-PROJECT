'use client';

import {
  Activity,
  ArrowUpRight,
  BookOpen,
  DollarSign,
  Users,
  TrendingUp,
  UserPlus,
  LayoutGrid,
  Zap,
  ArrowRight
} from 'lucide-react';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/dashboard/page-header';
import { StudentEnrollmentChart } from '@/components/dashboard/admin/student-enrollment-chart';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader
          title="Administrative Command"
          description="High-level oversight of school operations, financial health, and institutional growth."
        >
          <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
            <TrendingUp className="h-5 w-5" />
            <span className="font-black uppercase tracking-tighter text-xs">Full Audit Report</span>
          </Button>
        </PageHeader>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors shadow-inner">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Revenue</p>
              <p className="text-2xl font-black">₹45,231</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                <ArrowUpRight className="h-3 w-3" /> +20% This Term
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Student Population</p>
              <p className="text-2xl font-black">2,350</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-tighter">
                <ArrowUpRight className="h-3 w-3" /> +18% New Admits
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Curriculum</p>
              <p className="text-2xl font-black">124</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-tighter">
                <Zap className="h-3 w-3 fill-accent" /> 12 New Courses
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors shadow-inner">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Portal Engagement</p>
              <p className="text-2xl font-black">573</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" /> Live Sessions Now
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-8 shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 border-b py-8 px-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Enrollment Velocity</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">12-Month institutional growth analysis</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-tighter">
                Real-time Data
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <StudentEnrollmentChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 border-b py-8 px-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-inner">
                <UserPlus className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none text-accent">New Intake</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Latest academic registrations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {[
                { name: 'Milan bambhaniya', class: '10A', id: 'milan', email: 'milu.r.b@email.com' },
                { name: 'Parmar mitul', class: '9B', id: 'mitul', email: 'mitul101@email.com' },
                { name: 'Solanki Dhrutam', class: '11C', id: 'dhrutam', email: 'dhrutam.k@email.com' },
                { name: 'Ansh daksh', class: '8A', id: 'ansh', email: 'ansh102@email.com' },
                { name: 'Sanghadi Jay', class: '12A', id: 'jay', email: 'jaylo111@email.com' },
              ].map((student, i) => (
                <div key={student.id} className="group p-6 flex items-center gap-4 hover:bg-primary/[0.02] border-b last:border-0 transition-colors">
                  <Avatar className="h-12 w-12 border-2 border-primary/10 transition-all group-hover:border-primary shadow-sm">
                    <AvatarImage src={`https://picsum.photos/seed/${student.id}/40/40`} alt={student.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-black uppercase text-xs">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black uppercase tracking-tight truncate group-hover:text-primary transition-colors">{student.name}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{student.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="rounded-xl border-accent/20 bg-accent/5 text-accent font-black text-[9px] uppercase tracking-tighter px-3">
                      {student.class}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t bg-muted/10">
              <Button variant="ghost" className="w-full rounded-xl font-black uppercase tracking-widest text-[10px] h-10 group" asChild>
                <Link href="/admin/students" className="flex items-center justify-center gap-2">
                  View Full Registry <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

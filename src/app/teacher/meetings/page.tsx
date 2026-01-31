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
  CheckCircle2, 
  XCircle,
  Timer,
  MoreHorizontal,
  MessageSquare,
  Search,
  Filter,
  HelpCircle,
  LayoutGrid,
  Sparkles,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const initialRequests = [
  {
    id: 'MT002',
    student: 'Aarav Patel',
    studentId: 'S001',
    class: '10A',
    purpose: 'Physics Lab Report: Heat & Thermodynamics Doubt',
    date: '2024-08-22',
    time: '02:00 PM',
    status: 'Pending',
    category: 'Doubt Solution',
    priority: 'Medium'
  },
  {
    id: 'MT003',
    student: 'Riya Shah',
    studentId: 'S002',
    class: '9B',
    purpose: 'Mathematics: Trigonometric Identities Complex Problem',
    date: '2024-08-23',
    time: '11:00 AM',
    status: 'Pending',
    category: 'Doubt Solution',
    priority: 'High'
  },
  {
    id: 'MT001',
    student: 'Milan bambhaniya',
    studentId: 'S006',
    class: '10A',
    purpose: 'Career Guidance: Information Technology Path',
    date: '2024-08-20',
    time: '10:30 AM',
    status: 'Approved',
    category: 'Guidance',
    priority: 'Medium'
  }
];

export default function TeacherMeetingsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast({
      title: `Session ${newStatus}`,
      description: `The consultation request has been updated successfully.`,
    });
  };

  const filteredRequests = requests.filter(r => 
    r.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader 
          title="Consultation Pipeline" 
          description="Strategic management of student doubt sessions and academic guidance requests."
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search student identity..." 
                className="pl-10 w-64 rounded-xl border-none bg-background shadow-inner h-11 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl h-11 w-11 border-none bg-background shadow-sm hover:shadow-md transition-shadow">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </PageHeader>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Timer className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Incoming Requests</p>
              <p className="text-2xl font-black">{requests.filter(r => r.status === 'Pending').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Confirmed Sessions</p>
              <p className="text-2xl font-black">{requests.filter(r => r.status === 'Approved').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Doubt Clearance Rate</p>
              <p className="text-2xl font-black">88%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {filteredRequests.length === 0 ? (
          <Card className="border-dashed py-24 text-center rounded-[2.5rem] bg-muted/5">
            <Zap className="h-12 w-12 mx-auto text-muted-foreground opacity-10 mb-4" />
            <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] opacity-50">No pending consultation requests</p>
          </Card>
        ) : (
          filteredRequests.map((req) => (
            <Card key={req.id} className="border-none shadow-xl bg-background rounded-[2.5rem] overflow-hidden group hover:scale-[1.01] transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className={cn(
                    "w-2",
                    req.status === 'Approved' ? 'bg-green-500' : 
                    req.status === 'Pending' ? 'bg-orange-500' : 'bg-muted'
                  )} />
                  <div className="flex-1 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="h-20 w-20 rounded-3xl bg-accent/5 flex items-center justify-center text-accent shrink-0 shadow-inner group-hover:bg-accent group-hover:text-white transition-colors">
                        <User className="h-10 w-10" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl font-black uppercase tracking-tight truncate">{req.student}</h3>
                          <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent font-black text-[9px] uppercase tracking-tighter px-4 py-1">
                            Class {req.class}
                          </Badge>
                          <Badge className="rounded-full bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest border-none px-3">
                            {req.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground font-semibold text-sm flex items-center gap-3 leading-relaxed">
                          <MessageSquare className="h-4 w-4 text-primary shrink-0" />
                          {req.purpose}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 bg-muted/30 p-6 rounded-[2.5rem] border shadow-inner">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Target Date</span>
                        <div className="flex items-center gap-2 font-black text-sm uppercase">
                          <Calendar className="h-4 w-4 text-primary" />
                          {req.date}
                        </div>
                      </div>
                      <div className="hidden md:block w-px h-12 bg-border" />
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Time Slot</span>
                        <div className="flex items-center gap-2 font-black text-sm uppercase">
                          <Clock className="h-4 w-4 text-primary" />
                          {req.time}
                        </div>
                      </div>
                      <div className="hidden md:block w-px h-12 bg-border" />
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Priority</span>
                        <Badge 
                          className={cn(
                            "rounded-full px-4 py-1 font-black text-[9px] uppercase tracking-widest",
                            req.priority === 'High' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-primary/10 text-primary border-primary/20'
                          )}
                          variant="outline"
                        >
                          {req.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {req.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleAction(req.id, 'Approved')}
                            className="rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-tighter text-[10px] h-14 px-8 shadow-lg transition-all hover:scale-105"
                          >
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleAction(req.id, 'Rejected')}
                            variant="outline"
                            className="rounded-2xl border-2 font-black uppercase tracking-tighter text-[10px] h-14 px-8 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                          >
                            Decline
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-500/10 text-green-600 border-green-200 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                            {req.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="rounded-2xl h-14 w-14 text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all">
                            <Video className="h-6 w-6" />
                          </Button>
                        </div>
                      )}
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

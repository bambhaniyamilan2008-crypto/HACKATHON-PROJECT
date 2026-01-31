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
  Calendar as CalendarIcon, 
  Save, 
  Send, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Timer, 
  GraduationCap, 
  LayoutGrid,
  Search,
  Filter,
  User,
  Zap,
  BookOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const initialExams = [
  {
    id: 'EXM01',
    name: 'Mid-Term Examination',
    class: 'Class 10A',
    subject: 'All Subjects',
    date: '2024-09-15',
    status: 'Upcoming',
  },
  {
    id: 'EXM02',
    name: 'Unit Test 1',
    class: 'Class 12A',
    subject: 'Physics',
    date: '2024-08-20',
    status: 'Completed',
  },
  {
    id: 'EXM03',
    name: 'Final Examination',
    class: 'Class 9B',
    subject: 'All Subjects',
    date: '2025-03-10',
    status: 'Scheduled',
  },
];

const initialResults = [
  { studentId: 'S001', studentName: 'Aarav Patel', exam: 'Unit Test 1', subject: 'Physics', score: '88/100', grade: 'B+' },
  { studentId: 'S002', studentName: 'Riya Shah', exam: 'Unit Test 1', subject: 'Physics', score: '92/100', grade: 'A-' },
  { studentId: 'S003', studentName: 'Devansh Mehta', exam: 'Unit Test 1', subject: 'Physics', score: '85/100', grade: 'B+' },
  { studentId: 'S004', studentName: 'Kavya Joshi', exam: 'Unit Test 1', subject: 'Physics', score: '76/100', grade: 'C+' },
  { studentId: 'S005', studentName: 'Harshil Desai', exam: 'Unit Test 1', subject: 'Physics', score: '90/100', grade: 'A-' },
];

export default function Page() {
  const [exams, setExams] = useState(initialExams);
  const [results, setResults] = useState(initialResults);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newExam, setNewExam] = useState({
    name: '',
    class: '',
    subject: '',
    date: '',
  });

  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExam.name || !newExam.class || !newExam.subject || !newExam.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all exam details.",
      });
      return;
    }

    const examToAdd = {
      id: `EXM0${exams.length + 1}`,
      ...newExam,
      status: 'Scheduled',
    };

    setExams([examToAdd, ...exams]);
    setIsScheduleDialogOpen(false);
    setNewExam({ name: '', class: '', subject: '', date: '' });
    
    toast({
      title: "Exam Scheduled",
      description: `${newExam.name} has been added to the master roster.`,
    });
  };

  const handleNotifyParent = (studentName: string) => {
    toast({
      title: "Intel Sent",
      description: `Results for ${studentName} have been dispatched to guardians.`,
    });
  };

  const handleNotifyAll = () => {
    toast({
      title: "Global Distribution",
      description: "Evaluation metrics have been published to all parents.",
    });
  };

  const filteredExams = exams.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader title="Assessment Center" description="Coordinate global examinations and manage institutional performance metrics.">
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
                <PlusCircle className="h-5 w-5" />
                <span className="font-black uppercase tracking-tighter text-xs">Schedule Mission</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tighter uppercase">Initialize Assessment</DialogTitle>
                <DialogDescription>
                  Define parameters for a new academic assessment cycle.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleScheduleExam} className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cycle Identity</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Unit Test 2"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newExam.name}
                    onChange={(e) => setNewExam({...newExam, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Target Division</Label>
                  <Select 
                    onValueChange={(value) => setNewExam({...newExam, class: value})}
                    value={newExam.class}
                  >
                    <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class 8A" className="font-bold">Class 8A</SelectItem>
                      <SelectItem value="Class 9B" className="font-bold">Class 9B</SelectItem>
                      <SelectItem value="Class 10A" className="font-bold">Class 10A</SelectItem>
                      <SelectItem value="Class 11C" className="font-bold">Class 11C</SelectItem>
                      <SelectItem value="Class 12A" className="font-bold">Class 12A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Curricular Focus</Label>
                  <Select 
                    onValueChange={(value) => setNewExam({...newExam, subject: value})}
                    value={newExam.subject}
                  >
                    <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics" className="font-bold">Mathematics</SelectItem>
                      <SelectItem value="Physics" className="font-bold">Physics</SelectItem>
                      <SelectItem value="Chemistry" className="font-bold">Chemistry</SelectItem>
                      <SelectItem value="English" className="font-bold">English</SelectItem>
                      <SelectItem value="All Subjects" className="font-bold">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Mission Date</Label>
                  <Input
                    id="date"
                    type="date"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newExam.date}
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full rounded-xl h-12 bg-primary font-black uppercase tracking-tighter shadow-lg">
                    <Save className="mr-2 h-4 w-4" />
                    Commit to Schedule
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </PageHeader>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Assessments</p>
              <p className="text-2xl font-black">{exams.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <Timer className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Pending Evaluation</p>
              <p className="text-2xl font-black">{exams.filter(e => e.status === 'Completed').length} Batches</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Institutional Accuracy</p>
              <p className="text-2xl font-black">88% Avg.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 border-b py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <LayoutGrid className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black tracking-tighter uppercase">Academic Intelligence</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Filtering global assessments and student evaluation logs</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Find assessment cycle..." 
                  className="pl-10 w-64 rounded-xl border-none bg-background shadow-inner h-11 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-xl h-11 w-11 border-none bg-background shadow-sm hover:shadow-md">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="exams" className="w-full">
            <div className="px-8 pt-6">
              <TabsList className="inline-flex w-auto p-1 bg-muted/20 rounded-2xl border shadow-inner">
                <TabsTrigger value="exams" className="rounded-xl px-8 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                  <BookOpen className="h-3 w-3" /> Scheduled Cycles
                </TabsTrigger>
                <TabsTrigger value="results" className="rounded-xl px-8 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-accent data-[state=active]:text-white transition-all gap-2">
                  <GraduationCap className="h-3 w-3" /> Performance Logs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="exams" className="mt-6 border-none">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                    <TableHead className="py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Cycle ID</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Assessment Cycle</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Division</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Target Area</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary text-center">Status</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                      <TableCell className="font-mono text-xs font-black py-8 px-8 text-primary/60">{exam.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{exam.name}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" /> {exam.date}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-tighter">
                          {exam.class}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-sm flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-accent fill-accent" />
                          {exam.subject}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={cn(
                            "rounded-xl font-black text-[9px] uppercase tracking-widest px-3 py-1 border-2",
                            exam.status === 'Completed' ? 'bg-green-500/10 text-green-600 border-green-200' : 
                            exam.status === 'Upcoming' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-200' : 
                            'bg-orange-500/10 text-orange-600 border-orange-200'
                          )}
                          variant="outline"
                        >
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button variant="ghost" size="sm" className="rounded-xl font-black uppercase tracking-widest text-[9px] h-9 px-4 hover:bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all">
                          Modify Cycle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="results" className="mt-6 border-none">
              <div className="px-8 pb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Student Intelligence Log</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Verified evaluation metrics for academic term</p>
                </div>
                <Button size="sm" className="rounded-2xl h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-black uppercase tracking-tighter px-6 shadow-lg" onClick={handleNotifyAll}>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Notify All Guardians
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                    <TableHead className="py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Cadet Identity</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-accent">Assessment</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-accent">Curricular Area</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-accent text-center">Efficiency Score</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] text-accent text-center">Efficiency Grade</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.studentId} className="group hover:bg-accent/[0.02] transition-colors border-b last:border-0">
                      <TableCell className="py-8 px-8">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-all">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-black text-sm uppercase tracking-tight group-hover:text-accent transition-colors">{result.studentName}</span>
                            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">ID: {result.studentId}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-xs uppercase tracking-wide">{result.exam}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent font-black text-[9px] uppercase tracking-widest px-3 py-0.5">
                          {result.subject}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-mono font-black text-md">{result.score}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn(
                          "rounded-xl px-4 py-1 font-black text-[10px] border-none shadow-sm",
                          result.grade.startsWith('A') ? 'bg-green-500 text-white' : 'bg-accent text-accent-foreground'
                        )}>
                          {result.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 px-4 rounded-xl text-accent hover:text-accent hover:bg-accent/10 font-black uppercase text-[9px] tracking-widest opacity-0 group-hover:opacity-100 transition-all"
                            onClick={() => handleNotifyParent(result.studentName)}
                          >
                            <Send className="mr-2 h-3.5 w-3.5" /> Dispatch
                          </Button>
                          <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold uppercase tracking-widest text-[9px] border-2">
                            Deep Audit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

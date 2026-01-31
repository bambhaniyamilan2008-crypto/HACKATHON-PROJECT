'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BarChart3, 
  Sparkles, 
  Loader2, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb,
  User,
  Quote,
  TrendingUp,
  BookOpen,
  Calendar,
  ListChecks,
  GraduationCap,
  Search,
  Send,
  LayoutGrid,
  Zap
} from 'lucide-react';
import { smartGenerateClassReport, smartGenerateStudentReport } from '@/app/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { StudentPerformanceChart } from '@/components/dashboard/student/student-performance-chart';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Comprehensive mock data for instant access
const ALL_STUDENTS_ACADEMIC_DATA: Record<string, any> = {
  'Aarav Patel': {
    className: '10A',
    attendance: 96,
    grades: [
      { subject: 'Mathematics', score: 92, grade: 'A' },
      { subject: 'Physics', score: 88, grade: 'A-' },
      { subject: 'Chemistry', score: 94, grade: 'A' },
      { subject: 'English', score: 85, grade: 'B+' },
      { subject: 'Biology', score: 90, grade: 'A-' }
    ],
    trend: [
      { month: 'Jan', score: 82 },
      { month: 'Feb', score: 85 },
      { month: 'Mar', score: 88 },
      { month: 'Apr', score: 91 },
      { month: 'May', score: 92 },
    ]
  },
  'Riya Shah': {
    className: '9B',
    attendance: 89,
    grades: [
      { subject: 'Mathematics', score: 78, grade: 'B' },
      { subject: 'Physics', score: 82, grade: 'B+' },
      { subject: 'Chemistry', score: 75, grade: 'B' },
      { subject: 'History', score: 94, grade: 'A+' },
      { subject: 'English', score: 88, grade: 'A-' }
    ],
    trend: [
      { month: 'Jan', score: 70 },
      { month: 'Feb', score: 75 },
      { month: 'Mar', score: 78 },
      { month: 'Apr', score: 80 },
      { month: 'May', score: 83 },
    ]
  },
  'Milan bambhaniya': {
    className: '10A',
    attendance: 82,
    grades: [
      { subject: 'Mathematics', score: 98, grade: 'A+' },
      { subject: 'Physics', score: 87, grade: 'A-' },
      { subject: 'Chemistry', score: 83, grade: 'B+' },
      { subject: 'English', score: 69, grade: 'C+' },
      { subject: 'Art', score: 92, grade: 'A' }
    ],
    trend: [
      { month: 'Jan', score: 60 },
      { month: 'Feb', score: 65 },
      { month: 'Mar', score: 72 },
      { month: 'Apr', score: 85 },
      { month: 'May', score: 90 },
    ]
  },
  'Devansh Mehta': {
    className: '11C',
    attendance: 94,
    grades: [
      { subject: 'Mathematics', score: 88, grade: 'A-' },
      { subject: 'Physics', score: 90, grade: 'A-' },
      { subject: 'Biology', score: 95, grade: 'A' },
      { subject: 'English', score: 82, grade: 'B+' }
    ],
    trend: [
      { month: 'Jan', score: 85 },
      { month: 'Feb', score: 87 },
      { month: 'Mar', score: 89 },
      { month: 'Apr', score: 92 },
      { month: 'May', score: 94 },
    ]
  },
  'Kavya Joshi': {
    className: '8A',
    attendance: 98,
    grades: [
      { subject: 'Mathematics', score: 96, grade: 'A+' },
      { subject: 'Science', score: 94, grade: 'A' },
      { subject: 'History', score: 90, grade: 'A-' },
      { subject: 'English', score: 92, grade: 'A' }
    ],
    trend: [
      { month: 'Jan', score: 92 },
      { month: 'Feb', score: 94 },
      { month: 'Mar', score: 95 },
      { month: 'Apr', score: 97 },
      { month: 'May', score: 98 },
    ]
  },
  'Harshil Desai': {
    className: '12A',
    attendance: 85,
    grades: [
      { subject: 'Physics', score: 78, grade: 'B' },
      { subject: 'Mathematics', score: 82, grade: 'B+' },
      { subject: 'Computer Science', score: 94, grade: 'A' },
      { subject: 'English', score: 75, grade: 'B' }
    ],
    trend: [
      { month: 'Jan', score: 72 },
      { month: 'Feb', score: 75 },
      { month: 'Mar', score: 78 },
      { month: 'Apr', score: 82 },
      { month: 'May', score: 85 },
    ]
  }
};

const classStudentsData: Record<string, any[]> = {
  '10A': [
    { id: 'S001', name: 'Aarav Patel', math: 92, physics: 88, chemistry: 94, english: 85, biology: 90, grade: 'A' },
    { id: 'S006', name: 'Milan bambhaniya', math: 98, physics: 87, chemistry: 83, english: 69, biology: 75, grade: 'B+' },
    { id: 'S011', name: 'Devansh Mehta', math: 85, physics: 80, chemistry: 82, english: 88, biology: 84, grade: 'A-' },
  ],
  '9B': [
    { id: 'S002', name: 'Riya Shah', math: 78, physics: 82, chemistry: 75, english: 88, history: 94, grade: 'B+' },
    { id: 'S007', name: 'Parmar mitul', math: 95, physics: 90, chemistry: 92, english: 85, history: 80, grade: 'A' },
  ],
  '12A': [
    { id: 'S005', name: 'Harshil Desai', math: 92, physics: 89, cs: 94, english: 85, grade: 'A' },
    { id: 'S010', name: 'Sanghadi Jay', math: 84, physics: 82, cs: 88, english: 80, grade: 'B+' },
  ]
};

export default function ReportsPage() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedStudent, setSelectedStudent] = useState('Aarav Patel');
  const [isGeneratingClass, setIsGeneratingClass] = useState(false);
  const [isGeneratingStudent, setIsGeneratingStudent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [classReport, setClassReport] = useState<any>(null);
  const [studentAIReport, setStudentAIReport] = useState<any>(null);

  const currentStudentData = useMemo(() => {
    return ALL_STUDENTS_ACADEMIC_DATA[selectedStudent] || null;
  }, [selectedStudent]);

  useEffect(() => {
    let isCancelled = false;
    const fetchClassReport = async () => {
      setIsGeneratingClass(true);
      try {
        const result = await smartGenerateClassReport(selectedClass);
        if (!isCancelled && result.success) {
          setClassReport(result.data);
        }
      } catch (e) {
        if (!isCancelled) console.error("Failed to generate class report:", e);
      } finally {
        if (!isCancelled) setIsGeneratingClass(false);
      }
    };
    fetchClassReport();
    return () => { isCancelled = true; };
  }, [selectedClass]);

  useEffect(() => {
    let isCancelled = false;
    const fetchStudentAIReport = async () => {
      if (!selectedStudent) return;
      setIsGeneratingStudent(true);
      setStudentAIReport(null); 
      try {
        const result = await smartGenerateStudentReport(selectedStudent);
        if (!isCancelled) {
          if (result.success) {
            setStudentAIReport(result.data);
          } else {
            console.warn("AI service returned an error:", result.message);
          }
        }
      } catch (e) {
        if (!isCancelled) console.error("Failed to generate student AI insights:", e);
      } finally {
        if (!isCancelled) setIsGeneratingStudent(false);
      }
    };
    fetchStudentAIReport();
    return () => { isCancelled = true; };
  }, [selectedStudent]);

  const handleSendToParent = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Report Sent Successfully",
        description: `The academic report for ${selectedStudent} has been delivered to the parent's registered email and portal.`,
      });
    }, 1500);
  };

  const currentClassStudents = classStudentsData[selectedClass] || [];

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader 
          title="Academic Intelligence Hub" 
          description="AI-driven performance mapping and consolidated institutional reports."
        />
      </div>

      <Tabs defaultValue="class" className="w-full">
        <TabsList className="mb-8 p-1.5 bg-muted/20 rounded-[2rem] border shadow-inner inline-flex w-auto">
          <TabsTrigger value="class" className="rounded-2xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
            <BarChart3 className="h-4 w-4" /> Class Performance
          </TabsTrigger>
          <TabsTrigger value="student" className="rounded-2xl px-8 py-3 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-accent data-[state=active]:text-white transition-all gap-2">
            <User className="h-4 w-4" /> Individual Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="class" className="space-y-8 animate-fade-in">
          <Card className="shadow-xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                    <LayoutGrid className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Class-wise Analysis</CardTitle>
                    <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Consolidated results and neural evaluation</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px] rounded-xl bg-background border-none shadow-sm h-11 font-bold">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      {['9A', '9B', '10A', '11A', '12A'].map(c => (
                        <SelectItem key={c} value={c} className="font-bold">Division {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isGeneratingClass && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                      <TableHead className="py-6 px-10 font-black uppercase tracking-widest text-[10px] text-muted-foreground border-r">Internal ID</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Cadet Identity</TableHead>
                      <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-primary">Math</TableHead>
                      <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-primary">Physics</TableHead>
                      <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-primary">Chem</TableHead>
                      <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-primary">English</TableHead>
                      <TableHead className="text-right px-10 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Final Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentClassStudents.length > 0 ? (
                      currentClassStudents.map((student) => (
                        <TableRow key={student.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                          <TableCell className="font-mono text-xs font-black py-8 px-10 text-primary/60 border-r bg-muted/5 group-hover:bg-primary/5">
                            {student.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{student.name}</span>
                              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Enrollment</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-mono font-black text-md">{student.math}</TableCell>
                          <TableCell className="text-center font-mono font-black text-md">{student.physics}</TableCell>
                          <TableCell className="text-center font-mono font-black text-md">{student.chemistry || student.cs}</TableCell>
                          <TableCell className="text-center font-mono font-black text-md">{student.english}</TableCell>
                          <TableCell className="text-right px-10">
                            <Badge 
                              className={cn(
                                "rounded-xl font-black text-[10px] uppercase tracking-widest px-4 py-1",
                                student.grade.startsWith('A') ? 'bg-green-500 text-white shadow-lg' : 'bg-accent text-accent-foreground shadow-md'
                              )}
                            >
                              {student.grade}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-24 text-muted-foreground italic font-medium">
                          No student data recorded for Class {selectedClass}.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {isGeneratingClass ? (
            <Card className="border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-20 bg-muted/5 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
              <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Synthesizing Class Insights...</p>
            </Card>
          ) : classReport && (
            <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-primary text-primary-foreground rounded-[3rem] overflow-hidden animate-fade-in">
              <CardHeader className="p-10 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Neural Class Insights</CardTitle>
                    <CardDescription className="text-white/60 font-bold uppercase tracking-widest text-[9px] mt-1">Automatic academic performance evaluation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner">
                  <Quote className="h-12 w-12 text-white/10 absolute top-4 right-4" />
                  <p className="text-xl leading-relaxed italic font-medium">
                    "{classReport.summary}"
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black flex items-center gap-2 uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-green-400" /> Key Strengths
                    </h4>
                    <div className="space-y-3">
                      {classReport.strengths.map((s: string, i: number) => (
                        <div key={i} className="text-sm font-bold bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-black flex items-center gap-2 uppercase tracking-widest text-white/80">
                      <AlertCircle className="h-4 w-4 text-orange-400" /> Improvement Targets
                    </h4>
                    <div className="space-y-3">
                      {classReport.weaknesses.map((w: string, i: number) => (
                        <div key={i} className="text-sm font-bold bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                          {w}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="student" className="space-y-8 animate-fade-in">
          <Card className="shadow-xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b py-8 px-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center shadow-inner text-accent">
                    <Search className="h-7 w-7" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase leading-none">Intelligence Profile</CardTitle>
                    <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Deep analysis of individual student velocity</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger className="w-[240px] rounded-xl bg-background border-none shadow-sm h-11 font-bold">
                      <SelectValue placeholder="Select Student" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      {Object.keys(ALL_STUDENTS_ACADEMIC_DATA).map(s => (
                        <SelectItem key={s} value={s} className="font-bold">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>

          {!selectedStudent ? (
            <Card className="flex flex-col items-center justify-center py-32 border-4 border-dashed rounded-[3rem] bg-muted/5">
              <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
              <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Awaiting Selection from Matrix</p>
            </Card>
          ) : currentStudentData && (
            <div className="space-y-8 animate-fade-in">
              <Card className="border-none shadow-2xl overflow-hidden rounded-[3rem] bg-background">
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between border-b bg-muted/30 backdrop-blur-md py-10 px-12 gap-8">
                  <div className="flex items-center gap-8">
                    <div className="h-24 w-24 rounded-[2.5rem] bg-primary flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform">
                      <GraduationCap className="h-12 w-12 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-4xl font-black tracking-tighter uppercase">{selectedStudent}</CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="rounded-full px-4 py-1.5 border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-widest">
                          Division {currentStudentData.className}
                        </Badge>
                        <Badge variant="outline" className="rounded-full px-4 py-1.5 border-green-500/20 bg-green-500/5 text-green-600 font-black text-[10px] uppercase tracking-widest">
                          {currentStudentData.attendance}% Active Presence
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-2xl h-12 px-6 border-2 font-bold uppercase tracking-widest text-[10px] hover:bg-muted/50 transition-all">
                      <Download className="mr-2 h-4 w-4" /> Export Official PDF
                    </Button>
                    <Button 
                      onClick={handleSendToParent} 
                      disabled={isSending}
                      className="rounded-2xl h-12 px-8 bg-accent text-accent-foreground font-black uppercase tracking-tighter shadow-xl hover:scale-105 transition-all"
                    >
                      {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Dispatch to Parent
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-12 space-y-16">
                  {/* Grid Layout for Charts and Tables */}
                  <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7 space-y-8">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-black flex items-center gap-3 text-primary uppercase tracking-tighter">
                          <TrendingUp className="h-6 w-6" /> Performance Velocity
                        </h4>
                        <Badge className="bg-primary/10 text-primary border-none font-bold text-[9px] uppercase tracking-widest">Accuracy Index 2024</Badge>
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-muted/20 shadow-inner border border-white/10 min-h-[350px] flex flex-col justify-center">
                        <StudentPerformanceChart data={currentStudentData.trend} />
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                      <h4 className="text-xl font-black flex items-center gap-3 text-primary uppercase tracking-tighter">
                        <BarChart3 className="h-6 w-6" /> Curricular Mastery
                      </h4>
                      <div className="rounded-[2.5rem] border-2 border-muted overflow-hidden shadow-sm bg-muted/5">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50 border-b-2">
                              <TableHead className="py-5 px-6 font-black uppercase tracking-widest text-[10px]">Area</TableHead>
                              <TableHead className="text-center font-black uppercase tracking-widest text-[10px]">Eff %</TableHead>
                              <TableHead className="text-right px-6 font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentStudentData.grades.map((g: any, i: number) => (
                              <TableRow key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                                <TableCell className="font-bold text-sm py-5 px-6 uppercase">{g.subject}</TableCell>
                                <TableCell className="text-center font-mono text-lg font-black">{g.score}</TableCell>
                                <TableCell className="text-right px-6">
                                  <Badge className={cn(
                                    "text-[9px] px-3 py-1 rounded-xl font-black uppercase tracking-widest border-none shadow-sm",
                                    g.score >= 90 ? 'bg-green-500 text-white' : g.score >= 80 ? 'bg-primary text-white' : 'bg-accent text-accent-foreground'
                                  )}>
                                    {g.grade}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>

                  {/* Redesigned AI Evaluation Section */}
                  <div className="pt-16 border-t-2 border-dashed space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-inner text-accent">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">Neural Insights</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Advanced student behavioral & academic evaluation</p>
                      </div>
                    </div>
                    
                    {isGeneratingStudent ? (
                      <div className="flex flex-col items-center justify-center p-24 bg-accent/5 rounded-[3rem] border-4 border-dashed border-accent/10 gap-6">
                        <Loader2 className="h-12 w-12 animate-spin text-accent" />
                        <p className="text-md font-black uppercase tracking-widest text-accent italic animate-pulse">Drafting Intelligence Profile...</p>
                      </div>
                    ) : studentAIReport ? (
                      <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-10">
                          <div className="relative p-10 bg-muted/30 rounded-[2.5rem] border border-white/10 shadow-inner group">
                            <Quote className="h-16 w-16 text-primary/5 absolute top-6 right-6 transition-transform group-hover:scale-110" />
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium italic">
                              "{studentAIReport.narrative}"
                            </p>
                          </div>

                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="p-8 rounded-[2.5rem] bg-green-500/5 border-2 border-transparent hover:border-green-500/20 transition-all shadow-sm">
                              <h4 className="text-xs font-black flex items-center gap-2 text-green-600 uppercase tracking-widest mb-6 bg-green-500/10 px-4 py-2 rounded-full w-fit">
                                <CheckCircle2 className="h-4 w-4" /> Assets
                              </h4>
                              <ul className="space-y-4">
                                {studentAIReport.strengths?.map((s: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                    <p className="text-sm font-bold leading-relaxed">{s}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-primary/5 border-2 border-transparent hover:border-primary/20 transition-all shadow-sm">
                              <h4 className="text-xs font-black flex items-center gap-2 text-primary uppercase tracking-widest mb-6 bg-primary/10 px-4 py-2 rounded-full w-fit">
                                <Lightbulb className="h-4 w-4" /> Focus Areas
                              </h4>
                              <ul className="space-y-4">
                                {studentAIReport.improvements?.map((s: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <p className="text-sm font-bold leading-relaxed">{s}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <Card className="border-none shadow-xl bg-gradient-to-br from-accent to-orange-600 text-white rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="p-8 pb-4">
                              <CardTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <User className="h-6 w-6" /> Guardian Guide
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0">
                              <p className="text-md font-medium italic leading-relaxed bg-white/10 p-6 rounded-2xl border border-white/10 shadow-inner">
                                "{studentAIReport.parentAdvice}"
                              </p>
                            </CardContent>
                          </Card>

                          <div className="p-8 bg-primary text-primary-foreground rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <Zap className="h-32 w-32 opacity-5 absolute -bottom-8 -right-8 transition-transform group-hover:scale-125" />
                            <div className="relative z-10 space-y-4">
                              <p className="text-lg font-black italic leading-tight text-center">
                                "{studentAIReport.studentMotivation}"
                              </p>
                              <div className="flex items-center justify-center gap-2">
                                <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase tracking-widest">Teacher Endorsed</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-20 text-center border-4 border-dashed rounded-[3rem] text-muted-foreground/30">
                        <p className="italic font-bold uppercase tracking-widest text-xs">Profile Analysis Unavailable</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

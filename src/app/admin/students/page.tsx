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
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  Users, 
  UserPlus, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  GraduationCap, 
  Send, 
  Loader2,
  Filter,
  CheckCircle2,
  LayoutGrid,
  Save,
  User,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { StudentPerformanceChart } from '@/components/dashboard/student/student-performance-chart';
import { cn } from '@/lib/utils';

const initialStudents = [
  { id: 'S001', name: 'Aarav Patel', class: '10A', parentName: 'Rajesh Patel', status: 'Active' },
  { id: 'S002', name: 'Riya Shah', class: '9B', parentName: 'Sanjay Shah', status: 'Active' },
  { id: 'S003', name: 'Devansh Mehta', class: '11C', parentName: 'Amit Mehta', status: 'Active' },
  { id: 'S004', name: 'Kavya Joshi', class: '8A', parentName: 'Mahesh Joshi', status: 'Active' },
  { id: 'S005', name: 'Harshil Desai', class: '12A', parentName: 'Prakash Desai', status: 'Active' },
  { id: 'S006', name: 'Milan bambhaniya', class: '10A', parentName: 'Ramesh bambhaniya', status: 'Active' },
  { id: 'S007', name: 'Parmar mitul', class: '9B', parentName: 'Dilipbhai Parmar', status: 'Active' },
  { id: 'S008', name: 'Solanki Dhrutam', class: '11C', parentName: 'Kanabhai Solanki', status: 'Active' },
  { id: 'S009', name: 'Ansh daksh', class: '8A', parentName: 'Daksh Sharma', status: 'Active' },
  { id: 'S010', name: 'Sanghadi Jay', class: '12A', parentName: 'Kamleshbhai Sanghadi', status: 'Active' },
];

const studentAcademicData: Record<string, any> = {
  'S001': {
    grades: [
      { subject: 'Mathematics', score: 92, grade: 'A' },
      { subject: 'Physics', score: 88, grade: 'A-' },
      { subject: 'Chemistry', score: 94, grade: 'A' },
      { subject: 'English', score: 85, grade: 'B+' },
    ],
    attendance: 96,
  },
  'S002': {
    grades: [
      { subject: 'Mathematics', score: 78, grade: 'B' },
      { subject: 'Physics', score: 82, grade: 'B+' },
      { subject: 'History', score: 94, grade: 'A+' },
      { subject: 'English', score: 88, grade: 'A-' },
    ],
    attendance: 89,
  },
  'S006': {
    grades: [
      { subject: 'Mathematics', score: 98, grade: 'A+' },
      { subject: 'Physics', score: 87, grade: 'A-' },
      { subject: 'Chemistry', score: 83, grade: 'B+' },
      { subject: 'Art', score: 92, grade: 'A' },
    ],
    attendance: 82,
  }
};

const defaultAcademicData = {
  grades: [
    { subject: 'General Science', score: 85, grade: 'B' },
    { subject: 'Social Studies', score: 80, grade: 'B-' },
    { subject: 'Mathematics', score: 75, grade: 'C+' },
    { subject: 'Languages', score: 90, grade: 'A-' },
  ],
  attendance: 90,
};

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isSendingReport, setIsSendingReport] = useState(false);

  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    class: '',
    parentName: '',
  });

  const classes = Array.from(new Set(students.map((s) => s.class))).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  });

  const filteredStudents = students.filter((student) => {
    const matchesTab = activeTab === 'all' || student.class === activeTab;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.id || !newStudent.name || !newStudent.class) {
      toast({
        variant: "destructive",
        title: "Enrollment Error",
        description: "Please provide Admission ID, Name, and Assigned Class.",
      });
      return;
    }

    const studentToAdd = {
      ...newStudent,
      status: 'Active' as const,
    };

    setStudents([studentToAdd, ...students]);
    setIsAddDialogOpen(false);
    setNewStudent({ id: '', name: '', class: '', parentName: '' });
    
    toast({
      title: "Student Enrolled",
      description: `${studentToAdd.name} has been added to the registry.`,
    });
  };

  const handleViewReport = (student: any) => {
    const academic = studentAcademicData[student.id] || defaultAcademicData;
    setSelectedStudent({ ...student, ...academic });
    setIsReportDialogOpen(true);
  };

  const handleSendReport = (studentName: string) => {
    setIsSendingReport(true);
    setTimeout(() => {
      setIsSendingReport(false);
      toast({
        title: "Intelligence Report Delivered",
        description: `The academic analysis for ${studentName} has been sent to the parent portal.`,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader title="Student Registry" description="Manage official records, monitor attendance, and evaluate academic performance.">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
                <PlusCircle className="h-5 w-5" />
                <span className="font-black uppercase tracking-tighter text-xs">Enroll New Student</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tighter uppercase">New Enrollment</DialogTitle>
                <DialogDescription>
                  Register a new student into the school database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddStudent} className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Admission Code</Label>
                  <Input
                    id="id"
                    placeholder="e.g. S011"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newStudent.id}
                    onChange={(e) => setNewStudent({...newStudent, id: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Identity</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Liam Smith"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Assigned Division</Label>
                  <Select 
                    onValueChange={(value) => setNewStudent({...newStudent, class: value})}
                    value={newStudent.class}
                  >
                    <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8A" className="font-bold">Class 8A</SelectItem>
                      <SelectItem value="9B" className="font-bold">Class 9B</SelectItem>
                      <SelectItem value="10A" className="font-bold">Class 10A</SelectItem>
                      <SelectItem value="11C" className="font-bold">Class 11C</SelectItem>
                      <SelectItem value="12A" className="font-bold">Class 12A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parent" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Guardian Name</Label>
                  <Input
                    id="parent"
                    placeholder="e.g. Robert Smith"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full rounded-xl h-12 bg-primary font-black uppercase tracking-tighter">
                    <Save className="mr-2 h-4 w-4" />
                    Complete Enrollment
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
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Student Census</p>
              <p className="text-2xl font-black">{students.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Status</p>
              <p className="text-2xl font-black">{students.filter(s => s.status === 'Active').length} Verified</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Perf. Index</p>
              <p className="text-2xl font-black text-sm uppercase">88% Avg.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 border-b py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                  <LayoutGrid className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-black tracking-tighter uppercase">Academic Matrix</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Filtering student population by division and identity</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Find student identity..." 
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

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="inline-flex w-auto p-1 bg-background/50 rounded-2xl border shadow-inner">
                <TabsTrigger value="all" className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">All Cadets</TabsTrigger>
                {classes.map((cls) => (
                  <TabsTrigger 
                    key={cls} 
                    value={cls} 
                    className="rounded-xl px-6 py-2.5 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                  >
                    Division {cls}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                <TableHead className="py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground border-r">Admission ID</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Cadet Identity</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Current Division</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Guardian</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-primary">Status</TableHead>
                <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-24 text-muted-foreground italic font-medium">
                    No students matching the selected criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                    <TableCell className="font-mono text-xs font-black py-8 px-8 text-primary/60 border-r bg-muted/5 group-hover:bg-primary/5 transition-colors">
                      {student.id}
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleViewReport(student)}
                        className="flex flex-col text-left group/name"
                      >
                        <span className="font-black text-lg tracking-tight uppercase group-hover/name:text-primary transition-colors underline decoration-transparent group-hover/name:decoration-primary underline-offset-4 decoration-2">
                          {student.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Registered Cadet</span>
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full px-4 py-1 border-accent/20 bg-accent/5 text-accent font-black text-[10px] uppercase tracking-tighter">
                        Class {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <User className="h-4 w-4 text-primary/40" />
                        <span className="font-bold text-xs">{student.parentName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={cn(
                          "rounded-xl font-black text-[10px] uppercase tracking-widest px-3 py-1",
                          student.status === 'Active' 
                            ? 'bg-green-500/10 text-green-600 border-green-200' 
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        )}
                        variant="outline"
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="rounded-xl hover:bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl w-56 p-2 shadow-2xl border-none bg-background/95 backdrop-blur-md">
                          <DropdownMenuLabel className="font-black uppercase tracking-widest text-[9px] text-muted-foreground px-3 py-2">Identity Management</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5" onClick={() => handleViewReport(student)}>
                            <FileText className="h-4 w-4" /> View AI Analysis
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5" onClick={() => handleSendReport(student.name)}>
                            <Send className="h-4 w-4" /> Dispatch to Guardian
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <LayoutGrid className="h-4 w-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-muted/50 mx-2 my-1" />
                          <DropdownMenuItem className="text-destructive font-black rounded-xl flex items-center gap-2 px-3 py-2.5 hover:bg-destructive/10 hover:text-destructive transition-colors">
                            Revoke Enrollment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Intelligence Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl">
          {selectedStudent && (
            <div className="flex flex-col">
              <div className="p-8 border-b bg-card/50 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl rotate-3">
                      <GraduationCap className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-4xl font-black tracking-tighter uppercase">{selectedStudent.name}</DialogTitle>
                      <DialogDescription className="flex items-center gap-4 text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">
                        <span className="px-3 py-1 rounded-full bg-muted/50">ID: {selectedStudent.id}</span>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Division: {selectedStudent.class}</span>
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="rounded-2xl h-12 px-6 bg-accent text-accent-foreground font-black uppercase tracking-tighter shadow-xl hover:scale-105 transition-all"
                      onClick={() => handleSendReport(selectedStudent.name)}
                      disabled={isSendingReport}
                    >
                      {isSendingReport ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Dispatch to Parent
                    </Button>
                    <Button variant="outline" className="rounded-2xl h-12 border-2 px-6 font-bold uppercase tracking-widest text-[10px] hover:bg-muted/50 transition-all">
                      <FileText className="mr-2 h-4 w-4" /> Official PDF
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="rounded-[2rem] bg-primary/5 border-none shadow-sm group hover:bg-primary transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-black uppercase tracking-widest text-primary group-hover:text-white transition-colors flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-primary group-hover:text-white transition-colors">{selectedStudent.attendance}%</div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 group-hover:text-white/60 transition-colors">Active Participation</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-[2rem] bg-accent/5 border-none shadow-sm group hover:bg-accent transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-black uppercase tracking-widest text-accent group-hover:text-white transition-colors flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Subjects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-accent group-hover:text-white transition-colors">{selectedStudent.grades.length}</div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 group-hover:text-white/60 transition-colors">Core Curricular Mastery</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-[2rem] bg-green-500/5 border-none shadow-sm group hover:bg-green-500 transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-black uppercase tracking-widest text-green-600 group-hover:text-white transition-colors flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Academic Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-green-600 group-hover:text-white transition-colors">ELITE</div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 group-hover:text-white/60 transition-colors">Top 5% of Population</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      Assessment Summary
                    </h4>
                    <div className="rounded-[2rem] border-2 border-muted overflow-hidden shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 border-b-2">
                            <TableHead className="py-4 font-black uppercase tracking-widest text-[10px]">Subject Area</TableHead>
                            <TableHead className="text-center font-black uppercase tracking-widest text-[10px]">Score (100)</TableHead>
                            <TableHead className="text-right font-black uppercase tracking-widest text-[10px]">Grade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedStudent.grades.map((g: any, i: number) => (
                            <TableRow key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                              <TableCell className="font-bold text-md py-5">{g.subject}</TableCell>
                              <TableCell className="text-center font-mono text-lg font-black">{g.score}</TableCell>
                              <TableCell className="text-right">
                                <Badge className={cn(
                                  "text-[10px] px-4 py-1 rounded-xl font-black uppercase tracking-widest",
                                  g.score >= 90 ? 'bg-green-500' : g.score >= 80 ? 'bg-primary' : 'bg-orange-500'
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

                  <div className="lg:col-span-5 space-y-6">
                    <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      Growth Velocity
                    </h4>
                    <Card className="rounded-[2rem] border-none bg-muted/20 shadow-inner p-6 flex flex-col items-center justify-center min-h-[300px]">
                      <StudentPerformanceChart />
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4">Active Academic Session 2024</p>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t bg-muted/10 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsReportDialogOpen(false)} className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Close Profile</Button>
                <Button className="rounded-xl bg-primary font-black uppercase tracking-tighter px-8">Archive Record</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

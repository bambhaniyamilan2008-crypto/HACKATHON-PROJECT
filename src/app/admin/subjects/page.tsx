
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
  BookCopy, 
  Save, 
  Search, 
  Library, 
  GraduationCap, 
  History,
  Trash2,
  Edit3,
  FileText,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
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
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const initialSubjects = [
  { id: 'SUB01', name: 'Mathematics', code: 'MATH', department: 'Science' },
  { id: 'SUB02', name: 'Physics', code: 'PHY', department: 'Science' },
  { id: 'SUB03', name: 'Chemistry', code: 'CHEM', department: 'Science' },
  { id: 'SUB04', name: 'English', code: 'ENG', department: 'Languages' },
  { id: 'SUB05', name: 'Biology', code: 'BIO', department: 'Science' },
  { id: 'SUB06', name: 'History', code: 'HIST', department: 'Social Studies' },
  { id: 'SUB07', name: 'Computer Science', code: 'CS', department: 'Tech' },
];

export default function Page() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    id: '',
    name: '',
    code: '',
    department: 'Science',
  });

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.id || !newSubject.name || !newSubject.code) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields (ID, Name, and Code).",
      });
      return;
    }

    setSubjects([...subjects, newSubject]);
    setIsAddDialogOpen(false);
    setNewSubject({ id: '', name: '', code: '', department: 'Science' });
    
    toast({
      title: "Subject Added",
      description: `${newSubject.name} (${newSubject.code}) has been added to the curriculum.`,
    });
  };

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader title="Curriculum Library" description="Define and manage academic subjects and course departments.">
          <div className="flex items-center gap-3">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
                  <PlusCircle className="h-5 w-5" />
                  <span className="font-black uppercase tracking-tighter text-xs">Add Subject</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black tracking-tighter uppercase">New Academic Subject</DialogTitle>
                  <DialogDescription>
                    Register a new course in the school database.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSubject} className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject ID</Label>
                    <Input
                      id="id"
                      placeholder="e.g. SUB08"
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newSubject.id}
                      onChange={(e) => setNewSubject({...newSubject, id: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Macroeconomics"
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newSubject.name}
                      onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Short Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g. ECON"
                      className="rounded-xl bg-muted/30 border-none font-bold h-12"
                      value={newSubject.code}
                      onChange={(e) => setNewSubject({...newSubject, code: e.target.value.toUpperCase()})}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full rounded-xl h-12 bg-primary font-black uppercase tracking-tighter">
                      <Save className="mr-2 h-4 w-4" />
                      Save to Curriculum
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </PageHeader>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Library className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Courses</p>
              <p className="text-2xl font-black">{subjects.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Departments</p>
              <p className="text-2xl font-black">4 Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <History className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Last Updated</p>
              <p className="text-2xl font-black text-sm uppercase">2 Days Ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 border-b py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <BookCopy className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black tracking-tighter uppercase">Curriculum Matrix</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Managing school core and elective subjects</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Find subject..." 
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
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                <TableHead className="py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Internal ID</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Subject Detail</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Department</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary text-center">Course Code</TableHead>
                <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-muted-foreground italic font-medium">
                    No subjects matching your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubjects.map((subject) => (
                  <TableRow key={subject.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                    <TableCell className="font-mono text-xs font-black py-8 px-8 text-primary/60">
                      {subject.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{subject.name}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Academic Core</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-tighter">
                        {subject.department || 'Science'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center rounded-xl bg-accent/10 px-4 py-2 text-xs font-black text-accent ring-1 ring-inset ring-accent/20 uppercase tracking-widest shadow-sm">
                        {subject.code}
                      </span>
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
                          <DropdownMenuLabel className="font-black uppercase tracking-widest text-[9px] text-muted-foreground px-3 py-2">Management Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <Edit3 className="h-4 w-4" /> Edit Curriculum
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <FileText className="h-4 w-4" /> Course Resources
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-muted/50 mx-2 my-1" />
                          <DropdownMenuItem className="text-destructive font-black rounded-xl flex items-center gap-2 px-3 py-2.5 hover:bg-destructive/10 hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" /> Remove Subject
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
    </div>
  );
}

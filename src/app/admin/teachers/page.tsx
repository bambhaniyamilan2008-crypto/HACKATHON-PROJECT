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
  UserPlus, 
  Mail, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Search, 
  Filter, 
  ShieldCheck,
  User,
  LayoutGrid,
  Save,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Badge } from '@/components/ui/badge';

const initialTeachers = [
  {
    id: 'T001',
    name: 'Mr. Vinesh Patel',
    avatar: 'https://picsum.photos/seed/teacher1/100/100',
    subject: 'Mathematics',
    contact: 'vinesh.p@smartstudy.edu',
    status: 'Active'
  },
  {
    id: 'T002',
    name: 'Mr. Dobariya Sir',
    avatar: 'https://picsum.photos/seed/teacher2/100/100',
    subject: 'Physics',
    contact: 'dobariya.s@smartstudy.edu',
    status: 'Active'
  },
  {
    id: 'T003',
    name: 'Mr. Bhavesh Gohil',
    avatar: 'https://picsum.photos/seed/teacher3/100/100',
    subject: 'English',
    contact: 'bhavesh.g@smartstudy.edu',
    status: 'On Leave'
  },
  {
    id: 'T004',
    name: 'Mr. Mohan Baraiya',
    avatar: 'https://picsum.photos/seed/teacher4/100/100',
    subject: 'Chemistry',
    contact: 'mohan.b@smartstudy.edu',
    status: 'Active'
  },
  {
    id: 'T005',
    name: 'Mr. Kirit Mavani',
    avatar: 'https://picsum.photos/seed/teacher5/100/100',
    subject: 'Art',
    contact: 'kirit.m@smartstudy.edu',
    status: 'Active'
  }
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    id: '',
    name: '',
    subject: '',
    contact: '',
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.id || !newTeacher.name || !newTeacher.subject || !newTeacher.contact) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields to register faculty.",
      });
      return;
    }

    const teacherToAdd = {
      ...newTeacher,
      avatar: `https://picsum.photos/seed/${newTeacher.id}/100/100`,
      status: 'Active'
    };

    setTeachers([teacherToAdd, ...teachers]);
    setIsAddDialogOpen(false);
    setNewTeacher({ id: '', name: '', subject: '', contact: '' });
    
    toast({
      title: "Faculty Registered",
      description: `${teacherToAdd.name} has been added to the master list.`,
    });
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader title="Faculty Registry" description="Manage teaching staff, subject specializations, and departmental leadership.">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
                <PlusCircle className="h-5 w-5" />
                <span className="font-black uppercase tracking-tighter text-xs">Register Teacher</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tighter uppercase">New Faculty Member</DialogTitle>
                <DialogDescription>
                  Enter official details to register a new teacher in the school database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTeacher} className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Staff ID</Label>
                  <Input
                    id="id"
                    placeholder="e.g. T006"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newTeacher.id}
                    onChange={(e) => setNewTeacher({...newTeacher, id: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Dr. Jane Foster"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Department / Subject</Label>
                  <Select 
                    onValueChange={(value) => setNewTeacher({...newTeacher, subject: value})}
                    value={newTeacher.subject}
                  >
                    <SelectTrigger className="rounded-xl bg-muted/30 border-none font-bold h-12">
                      <SelectValue placeholder="Select primary subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics" className="font-bold">Mathematics</SelectItem>
                      <SelectItem value="Physics" className="font-bold">Physics</SelectItem>
                      <SelectItem value="Chemistry" className="font-bold">Chemistry</SelectItem>
                      <SelectItem value="English" className="font-bold">English</SelectItem>
                      <SelectItem value="Biology" className="font-bold">Biology</SelectItem>
                      <SelectItem value="History" className="font-bold">History</SelectItem>
                      <SelectItem value="Art" className="font-bold">Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="name@smartstudy.edu"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newTeacher.contact}
                    onChange={(e) => setNewTeacher({...newTeacher, contact: e.target.value})}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full rounded-xl h-12 bg-primary font-black uppercase tracking-tighter">
                    <Save className="mr-2 h-4 w-4" />
                    Onboard Faculty
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
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Faculty</p>
              <p className="text-2xl font-black">{teachers.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Core Subjects</p>
              <p className="text-2xl font-black">7 Departments</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Status</p>
              <p className="text-2xl font-black">{teachers.filter(t => t.status === 'Active').length} Verified</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 border-b py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black tracking-tighter uppercase">Faculty Matrix</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Administrative overview of academic staff</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search name, ID, or subject..." 
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
                <TableHead className="py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Staff ID</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Identity</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Specialization</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Contact</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-primary">Status</TableHead>
                <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-24 text-muted-foreground italic font-medium">
                    No faculty members found matching your query.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                    <TableCell className="font-mono text-xs font-black py-8 px-8 text-primary/60">
                      {teacher.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative group">
                          <Avatar className="h-12 w-12 border-2 border-primary/10 transition-all group-hover:border-primary">
                            <AvatarImage src={teacher.avatar} alt={teacher.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-black uppercase text-lg">
                              {teacher.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{teacher.name}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Faculty Lead</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full px-4 py-1 border-accent/20 bg-accent/5 text-accent font-black text-[10px] uppercase tracking-tighter flex items-center gap-1.5 w-fit">
                        <Zap className="h-3 w-3 fill-accent" />
                        {teacher.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Mail className="h-4 w-4 text-primary/40" />
                        <span className="font-bold text-xs">{teacher.contact}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`rounded-xl font-black text-[10px] uppercase tracking-widest px-3 py-1 ${
                          teacher.status === 'Active' 
                            ? 'bg-green-500/10 text-green-600 border-green-200' 
                            : 'bg-orange-500/10 text-orange-600 border-orange-200'
                        }`}
                        variant="outline"
                      >
                        {teacher.status}
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
                          <DropdownMenuLabel className="font-black uppercase tracking-widest text-[9px] text-muted-foreground px-3 py-2">Staff Management</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <User className="h-4 w-4" /> View Full Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <LayoutGrid className="h-4 w-4" /> Academic Load
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <BookOpen className="h-4 w-4" /> Assigned Classes
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-muted/50 mx-2 my-1" />
                          <DropdownMenuItem className="text-destructive font-black rounded-xl flex items-center gap-2 px-3 py-2.5 hover:bg-destructive/10 hover:text-destructive transition-colors">
                            Deactivate Staff
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

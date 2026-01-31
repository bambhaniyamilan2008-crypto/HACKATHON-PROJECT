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
  Users, 
  BookOpen, 
  Search, 
  User, 
  Filter,
  School,
  TrendingUp,
  LayoutGrid,
  Save,
  GraduationCap
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

const initialClasses = [
  { id: 'C01', name: 'Class 9A', teacher: 'Mr. Rahul Rathod', studentCount: 35, capacity: 40 },
  { id: 'C02', name: 'Class 9B', teacher: 'Mr. Vinesh Patel', studentCount: 32, capacity: 40 },
  { id: 'C03', name: 'Class 10A', teacher: 'Mr. Bhavesh Gohil', studentCount: 30, capacity: 35 },
  { id: 'C04', name: 'Class 10B', teacher: 'Mr. Mohan Baraiya', studentCount: 28, capacity: 35 },
  { id: 'C05', name: 'Class 11A', teacher: 'Mr. Kirit Mavani', studentCount: 25, capacity: 30 },
  { id: 'C06', name: 'Class 12A', teacher: 'Mr. Vishal Bambhaniya', studentCount: 22, capacity: 30 },
];

export default function ClassesPage() {
  const [classList, setClassList] = useState(initialClasses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    id: '',
    name: '',
    teacher: '',
    capacity: '40'
  });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.id || !newClass.name || !newClass.teacher) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please provide ID, Class Name, and assigned Teacher.",
      });
      return;
    }

    const classToAdd = {
      ...newClass,
      studentCount: 0,
      capacity: parseInt(newClass.capacity)
    };

    setClassList([...classList, classToAdd]);
    setIsAddDialogOpen(false);
    setNewClass({ id: '', name: '', teacher: '', capacity: '40' });
    
    toast({
      title: "Class Registered",
      description: `${newClass.name} has been added to the system.`,
    });
  };

  const filteredClasses = classList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = classList.reduce((sum, c) => sum + c.studentCount, 0);

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-3xl" />
        <PageHeader title="School Divisions" description="Organize student groups, assign faculty, and monitor class occupancy.">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary shadow-lg hover:shadow-primary/20 transition-all gap-2 h-12 px-6">
                <PlusCircle className="h-5 w-5" />
                <span className="font-black uppercase tracking-tighter text-xs">Register Class</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tighter uppercase">New Academic Division</DialogTitle>
                <DialogDescription>
                  Define a new class group and assign a class teacher.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddClass} className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Class Code</Label>
                  <Input
                    id="id"
                    placeholder="e.g. C07"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newClass.id}
                    onChange={(e) => setNewClass({...newClass, id: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Division Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Class 11B"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teacher" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Class Teacher</Label>
                  <Input
                    id="teacher"
                    placeholder="e.g. Mr. Sharma"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newClass.teacher}
                    onChange={(e) => setNewClass({...newClass, teacher: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    className="rounded-xl bg-muted/30 border-none font-bold h-12"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full rounded-xl h-12 bg-primary font-black uppercase tracking-tighter">
                    <Save className="mr-2 h-4 w-4" />
                    Create Division
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
              <School className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Divisions</p>
              <p className="text-2xl font-black">{classList.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Student Census</p>
              <p className="text-2xl font-black">{totalStudents}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Avg. Occupancy</p>
              <p className="text-2xl font-black">{Math.round(totalStudents / classList.length)} / Class</p>
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
                <CardTitle className="text-3xl font-black tracking-tighter uppercase">Academic Divisions</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Managing classroom allocation and faculty leadership</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Find class or teacher..." 
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
                <TableHead className="py-6 px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Class ID</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Division Name</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary">Lead Faculty</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-primary text-center">Occupancy</TableHead>
                <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-muted-foreground italic font-medium">
                    No classes found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClasses.map((cls) => (
                  <TableRow key={cls.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                    <TableCell className="font-mono text-xs font-black py-8 px-8 text-primary/60">
                      {cls.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{cls.name}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Division</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-sm">{cls.teacher}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-tighter">
                          {cls.studentCount} / {cls.capacity} Students
                        </Badge>
                        <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(cls.studentCount / cls.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
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
                          <DropdownMenuLabel className="font-black uppercase tracking-widest text-[9px] text-muted-foreground px-3 py-2">Division Management</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <Users className="h-4 w-4" /> View Roll Call
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <GraduationCap className="h-4 w-4" /> Academic Performance
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex items-center gap-2 font-bold px-3 py-2.5">
                            <BookOpen className="h-4 w-4" /> Edit Timetable
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-muted/50 mx-2 my-1" />
                          <DropdownMenuItem className="text-destructive font-black rounded-xl flex items-center gap-2 px-3 py-2.5 hover:bg-destructive/10 hover:text-destructive transition-colors">
                            Disband Division
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

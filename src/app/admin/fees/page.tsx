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
  AlertCircle, 
  Search, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Download, 
  Send,
  Filter,
  MoreVertical,
  ArrowUpRight,
  Save
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const initialFeePayments = [
  {
    invoiceId: 'INV001',
    studentId: 'S001',
    studentName: 'Aarav Patel',
    amount: 230000,
    status: 'Paid',
    dueDate: '2024-07-15',
    paymentDate: '2024-07-10',
  },
  {
    invoiceId: 'INV002',
    studentId: 'S002',
    studentName: 'Riya Shah',
    amount: 230000,
    status: 'Pending',
    dueDate: '2024-07-15',
    paymentDate: '-',
  },
  {
    invoiceId: 'INV003',
    studentId: 'S006',
    studentName: 'Milan bambhaniya',
    amount: 230000,
    status: 'Overdue',
    dueDate: '2024-06-15',
    paymentDate: '-',
  },
  {
    invoiceId: 'INV004',
    studentId: 'S007',
    studentName: 'Parmar mitul',
    amount: 230000,
    status: 'Paid',
    dueDate: '2024-07-20',
    paymentDate: '2024-07-18',
  },
  {
    invoiceId: 'INV005',
    studentId: 'S010',
    studentName: 'Sanghadi Jay',
    amount: 230000,
    status: 'Pending',
    dueDate: '2024-08-01',
    paymentDate: '-',
  },
];

// Mock student list for the generation form
const students = [
  { id: 'S001', name: 'Aarav Patel' },
  { id: 'S002', name: 'Riya Shah' },
  { id: 'S003', name: 'Devansh Mehta' },
  { id: 'S004', name: 'Kavya Joshi' },
  { id: 'S005', name: 'Harshil Desai' },
  { id: 'S006', name: 'Milan bambhaniya' },
];

export default function FeesPage() {
  const [feePayments, setFeePayments] = useState(initialFeePayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    studentId: '',
    amount: '230000',
    dueDate: '',
  });

  const handleSendReminder = (name: string) => {
    toast({
      title: "Reminder Sent",
      description: `A fee reminder notification has been sent to ${name}'s parents.`,
    });
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoice.studentId || !newInvoice.amount || !newInvoice.dueDate) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select a student and set both amount and due date.",
      });
      return;
    }

    const selectedStudent = students.find(s => s.id === newInvoice.studentId);
    
    const invoiceToAdd = {
      invoiceId: `INV00${feePayments.length + 1}`,
      studentId: newInvoice.studentId,
      studentName: selectedStudent?.name || 'Unknown Student',
      amount: parseInt(newInvoice.amount),
      status: 'Pending',
      dueDate: newInvoice.dueDate,
      paymentDate: '-',
    };

    setFeePayments([invoiceToAdd, ...feePayments]);
    setIsGenerateDialogOpen(false);
    setNewInvoice({ studentId: '', amount: '230000', dueDate: '' });
    
    toast({
      title: "Invoice Generated",
      description: `New invoice ${invoiceToAdd.invoiceId} has been created for ${invoiceToAdd.studentName}.`,
    });
  };

  const filteredPayments = feePayments.filter(p => 
    p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Fees & Revenue" description="Monitor student fee payments and school revenue.">
         <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            
            <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Generate Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate New Invoice</DialogTitle>
                  <DialogDescription>
                    Create a billing record for a student.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleGenerateInvoice} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student" className="text-right">Student</Label>
                    <Select 
                      onValueChange={(val) => setNewInvoice({...newInvoice, studentId: val})}
                      value={newInvoice.studentId}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map(s => (
                          <SelectItem key={s.id} value={s.id}>{s.name} ({s.id})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Amount</Label>
                    <div className="relative col-span-3">
                      <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">₹</span>
                      <Input
                        id="amount"
                        type="number"
                        className="pl-7"
                        value={newInvoice.amount}
                        onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Due Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="col-span-3"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Generate and Notify
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
         </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">₹1,150,000</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" /> +12% from last term
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Collected</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-green-600">₹460,000</div>
            <p className="text-xs text-muted-foreground mt-1">40% of total expected</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-orange-600">₹460,000</div>
            <p className="text-xs text-muted-foreground mt-1">Waiting for payment</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive uppercase tracking-wider">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-destructive">₹230,000</div>
            <p className="text-xs text-destructive/80 font-bold mt-1">1 Student Past Due</p>
          </CardContent>
        </Card>
      </div>

       <Card className="shadow-lg border-none">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Fee Transactions</CardTitle>
              <CardDescription>
                Comprehensive list of all generated invoices and their status.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search student, ID, or invoice..." 
                  className="pl-8 bg-background" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[120px] font-bold">Invoice ID</TableHead>
                <TableHead className="font-bold">Student Details</TableHead>
                <TableHead className="font-bold">Amount</TableHead>
                <TableHead className="font-bold">Due Date</TableHead>
                <TableHead className="font-bold">Payment Date</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                    No matching fee records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.invoiceId} className="group transition-colors">
                    <TableCell className="font-mono text-xs font-bold text-primary">
                      {payment.invoiceId}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{payment.studentName}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{payment.studentId}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-black text-sm">
                      ₹{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {payment.dueDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {payment.paymentDate}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="px-3 py-1 font-bold tracking-tight"
                        variant={
                          payment.status === 'Paid'
                            ? 'default'
                            : payment.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {payment.status === 'Overdue' && <AlertCircle className="mr-1.5 h-3.5 w-3.5" />}
                        {payment.status === 'Paid' && <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />}
                        {payment.status === 'Pending' && <Clock className="mr-1.5 h-3.5 w-3.5" />}
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {payment.status !== 'Paid' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-primary hover:text-primary hover:bg-primary/10 font-bold text-xs"
                            onClick={() => handleSendReminder(payment.studentName)}
                          >
                            <Send className="mr-1.5 h-3 w-3" /> Remind
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Invoice Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setFeePayments(feePayments.map(p => 
                                p.invoiceId === payment.invoiceId 
                                  ? { ...p, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0] } 
                                  : p
                              ));
                              toast({ title: "Payment Recorded", description: "Invoice marked as paid." });
                            }}>
                              <DollarSign className="mr-2 h-4 w-4" /> Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive font-bold" onClick={() => {
                              setFeePayments(feePayments.filter(p => p.invoiceId !== payment.invoiceId));
                              toast({ title: "Invoice Cancelled", description: "The record has been deleted." });
                            }}>
                              Cancel Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
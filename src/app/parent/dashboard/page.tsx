import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Bell, BarChart3, MessageSquare, DollarSign, ShieldCheck, Contact, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ParentDashboard() {
  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', score: '95%' },
    { subject: 'Physics', grade: 'B+', score: '88%' },
    { subject: 'Chemistry', grade: 'A-', score: '92%' },
    { subject: 'English', grade: 'B', score: '85%' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Alex's Dashboard"
        description="Here is an overview of your child's progress."
      >
        <Button variant="outline">
          <Contact className="mr-2 h-4 w-4" />
          Contact Teachers
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Attendance</span>
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Current academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">3 days absent</p>
            <Progress value={92} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-destructive flex items-center gap-2">
                Fee Status
                <AlertTriangle className="h-4 w-4 animate-pulse" />
              </span>
              <DollarSign className="h-5 w-5 text-destructive" />
            </CardTitle>
            <CardDescription className="text-destructive/80 font-semibold">OVERDUE: July 31, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹230,000</div>
            <p className="text-xs text-muted-foreground">
              Previous payment: ₹230,000 on June 1, 2024
            </p>
            <Button size="sm" variant="destructive" className="mt-2 w-full">
              Pay Overdue Fee
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Academic Progress</span>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Grade: A-</div>
            <p className="text-xs text-muted-foreground">
              Slight improvement from last term
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Strong in: Maths, Science
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Latest assessment results.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGrades.map(item => (
                  <TableRow key={item.subject}>
                    <TableCell className="font-medium">{item.subject}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{item.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {item.score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>School Announcements</CardTitle>
            <CardDescription>
              Important updates from the school administration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Parent-Teacher Meeting</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled for July 25th, 2024. Please book your slots.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                   <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Annual Sports Day</p>
                  <p className="text-sm text-muted-foreground">
                    Postponed to August 5th due to weather conditions.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

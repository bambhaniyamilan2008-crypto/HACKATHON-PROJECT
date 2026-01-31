
import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const schedule = {
  Monday: [
    { time: '09:00', subject: 'Mathematics', teacher: 'Vinesh sir', duration: 50 },
    { time: '10:00', subject: 'Physics', teacher: 'Dobariya sir', duration: 50 },
    { time: '11:00', subject: 'English', teacher: 'Mr. Davis', duration: 50 },
  ],
  Tuesday: [
    { time: '09:00', subject: 'Chemistry', teacher: 'Mavani sir', duration: 50 },
    { time: '10:00', subject: 'Chemistry', teacher: 'Mavani sir', duration: 50 },
    { time: '11:00', subject: 'Physical Ed.', teacher: 'Mr. Wilson', duration: 50 },
  ],
  Wednesday: [
     { time: '09:00', subject: 'Mathematics', teacher: 'Vinesh sir', duration: 50 },
    { time: '10:00', subject: 'Physics', teacher: 'Dobariya sir', duration: 50 },
    { time: '11:00', subject: 'Art', teacher: 'Ms. Taylor', duration: 100 },
  ],
  Thursday: [
    { time: '09:00', subject: 'Chemistry', teacher: 'Mavani sir', duration: 50 },
    { time: '10:00', subject: 'Chemistry', teacher: 'Mavani sir', duration: 50 },
    { time: '11:00', subject: 'English', teacher: 'Mr. Davis', duration: 50 },
  ],
  Friday: [
     { time: '09:00', subject: 'Mathematics', teacher: 'Vinesh sir', duration: 50 },
    { time: '10:00', subject: 'Physics Lab', teacher: 'Dobariya sir', duration: 100 },
    { time: '12:00', subject: 'Music', teacher: 'Mr. Anderson', duration: 50 },
  ],
};

const weekDays = Object.keys(schedule);
const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export default function TimetablePage() {
  return (
    <div>
      <PageHeader
        title="Weekly Timetable"
        description="Here is your class schedule for the week."
      />
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  {weekDays.map((day) => (
                    <TableHead key={day} className={cn('text-center', day === currentDay && 'text-primary')}>
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* This is a simplified representation. A real app would need a more robust time slot generation logic. */}
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((time, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{time}</TableCell>
                    {weekDays.map((day) => {
                      const event = (schedule as any)[day].find(
                        (e: any) => e.time === time
                      );
                      return (
                        <TableCell key={day} className={cn('p-1', day === currentDay && 'bg-muted/50')}>
                          {event && (
                            <div className="rounded-lg bg-primary/10 p-2 text-center">
                              <p className="font-semibold text-primary">{event.subject}</p>
                              <p className="text-xs text-muted-foreground">{event.teacher}</p>
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

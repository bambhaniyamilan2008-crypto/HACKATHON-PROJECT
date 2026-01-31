'use client';

// Yeh line build error rokne ke liye zaroori hai
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

// Mock data for demonstration
// Note: Real app mein yeh data API se aayega
const attendanceData = [
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 1), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 2), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 3), status: 'Absent' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 4), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 5), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 8), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 9), status: 'Late' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 10), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 11), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 12), status: 'Absent' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 15), status: 'Present' },
  { date: new Date(new Date().getFullYear(), new Date().getMonth(), 16), status: 'Present' },
];

function Day(props) {
    const { date, displayMonth } = props;
    
    // SAFETY CHECK: Agar date undefined hai toh crash nahi hoga
    if (!date) {
        return <DayPicker.Day {...props} />;
    }

    const record = attendanceData.find(
      (d) => d.date && d.date.toDateString() === date.toDateString()
    );
  
    const dayClassName = cn('relative h-full w-full p-0', {
        'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300': record?.status === 'Present',
        'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300': record?.status === 'Absent',
        'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300': record?.status === 'Late',
    });

    return (
        <div className={dayClassName}>
            <DayPicker.Day {...props} />
             {record && (
              <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full"
                style={{
                    backgroundColor: record.status === 'Present' ? 'hsl(var(--primary))' : record.status === 'Absent' ? 'hsl(var(--destructive))' : 'hsl(var(--accent))'
                }}
              />
            )}
        </div>
    )
}

export default function AttendancePage() {
  // Hydration mismatch avoid karne ke liye initial state null rakhein
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculations
  const presentDays = attendanceData.filter(d => d.status === 'Present').length;
  const absentDays = attendanceData.filter(d => d.status === 'Absent').length;
  const lateDays = attendanceData.filter(d => d.status === 'Late').length;
  const totalDays = attendanceData.length;
  const attendancePercentage = totalDays > 0 ? ((presentDays + lateDays) / totalDays) * 100 : 100;

  // Prevent hydration errors by not rendering until mounted
  if (!isMounted) {
    return null; 
  }

  return (
    <div>
      <PageHeader
        title="Attendance"
        description="View your attendance record for the academic year."
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{attendancePercentage.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Based on {totalDays} recorded classes</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{presentDays}</div>
                <p className="text-xs text-muted-foreground">Total days present</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{absentDays}</div>
                <p className="text-xs text-muted-foreground">Total days absent</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Late</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{lateDays}</div>
                <p className="text-xs text-muted-foreground">Total days late</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>
            Your attendance record for the selected month.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
           <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            className="rounded-md border"
            components={{
              Day: Day,
            }}
          />
           <div className="mt-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full" style={{backgroundColor: 'hsl(var(--primary))'}}/> Present</div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full" style={{backgroundColor: 'hsl(var(--destructive))'}}/> Absent</div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full" style={{backgroundColor: 'hsl(var(--accent))'}}/> Late</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

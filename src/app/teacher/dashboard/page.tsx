
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Bell,
  CalendarCheck,
  ClipboardList,
  PlusCircle,
  Upload,
  Video,
} from 'lucide-react';

export default function TeacherDashboard() {
  const upcomingClasses = [
    { time: '10:00 AM', subject: 'Mathematics', class: '10A', topic: 'Algebra II' },
    { time: '11:30 AM', subject: 'Physics', class: '12B', topic: 'Thermodynamics' },
    { time: '02:00 PM', subject: 'Mathematics', class: '10C', topic: 'Trigonometry' },
  ];

  const recentActivity = [
    {
      description: 'You graded "Algebra Homework 3" for Class 10A.',
      time: '2 hours ago',
    },
    { description: 'New announcement posted for Class 12B.', time: '1 day ago' },
    {
      description: 'You uploaded notes for "Chapter 5: Light".',
      time: '3 days ago',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Welcome, Jessica!"
        description="Here's what's happening today."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg border bg-background p-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarCheck className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-semibold">
                      {item.subject} - Class {item.class}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.topic}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-semibold">{item.time}</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      Start Class
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-1">
                <ClipboardList />
                <span>Mark Attendance</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-1">
                <Upload />
                <span>Upload Notes</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-1">
                <Video />
                <span>Go Live</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-1">
                <Bell />
                <span>Announce</span>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="ml-3">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

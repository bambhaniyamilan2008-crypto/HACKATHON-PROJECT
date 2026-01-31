'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const weeklyData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 3.0 },
  { day: "Wed", hours: 5.2 },
  { day: "Thu", hours: 2.8 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 6.5 },
  { day: "Sun", hours: 4.8 },
];

const progressData = [
  { subject: "Math", progress: 85 },
  { subject: "Physics", progress: 72 },
  { subject: "Chemistry", progress: 90 },
  { subject: "English", progress: 65 },
  { subject: "History", progress: 45 },
];

const chartConfig = {
  hours: {
    label: "Hours",
    color: "hsl(var(--primary))",
  },
  progress: {
    label: "Progress %",
    color: "hsl(var(--accent))",
  },
};

export function StudyAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base">Weekly Study Hours</CardTitle>
          <CardDescription>Time distribution across the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-base">Subject-wise Progress</CardTitle>
          <CardDescription>Mastery levels based on quiz and task completion</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={progressData}>
                <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" fontSize={10} />
                <Radar
                  name="Progress"
                  dataKey="progress"
                  stroke="var(--color-progress)"
                  fill="var(--color-progress)"
                  fillOpacity={0.5}
                />
                <Tooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

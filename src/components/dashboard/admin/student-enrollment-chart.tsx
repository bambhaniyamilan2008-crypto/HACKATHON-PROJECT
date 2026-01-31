// @ts-nocheck
"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", students: 186 },
  { month: "Feb", students: 305 },
  { month: "Mar", students: 237 },
  { month: "Apr", students: 73 },
  { month: "May", students: 209 },
  { month: "Jun", students: 214 },
  { month: "Jul", students: 250 },
  { month: "Aug", students: 280 },
  { month: "Sep", students: 265 },
  { month: "Oct", students: 180 },
  { month: "Nov", students: 190 },
  { month: "Dec", students: 220 },
]

const chartConfig = {
  students: {
    label: "Enrollment",
    color: "hsl(var(--primary))",
  },
}

export function StudentEnrollmentChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-students)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-students)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="3 3" 
            stroke="hsl(var(--muted-foreground))" 
            opacity={0.1} 
          />
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
            className="font-black uppercase tracking-widest"
          />
          <YAxis
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            className="font-bold"
          />
          <Tooltip
            cursor={{ stroke: 'var(--color-students)', strokeWidth: 1, strokeDasharray: '4 4' }}
            content={
              <ChartTooltipContent 
                indicator="dot"
                labelClassName="text-[10px] font-black uppercase tracking-widest"
                className="rounded-2xl border-none bg-background/95 backdrop-blur-md p-4 shadow-2xl"
              />
            }
          />
          <Area 
            type="monotone" 
            dataKey="students" 
            stroke="var(--color-students)" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorStudents)"
            dot={{ 
              r: 4, 
              fill: 'var(--color-students)', 
              stroke: 'hsl(var(--background))', 
              strokeWidth: 2 
            }}
            activeDot={{ 
              r: 6, 
              fill: 'hsl(var(--background))', 
              stroke: 'var(--color-students)', 
              strokeWidth: 3,
              className: "animate-pulse"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

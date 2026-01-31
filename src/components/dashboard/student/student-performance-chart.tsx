'use client';

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';

interface TrendData {
  month: string;
  score: number;
}

interface StudentPerformanceChartProps {
  data?: TrendData[];
}

const defaultData = [
  { month: 'Jan', score: 80 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 95 },
];

const chartConfig = {
  score: {
    label: 'Academic Score',
    color: 'hsl(var(--primary))',
  },
};

export function StudentPerformanceChart({ data = defaultData }: StudentPerformanceChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0} />
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
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
            className="font-black uppercase tracking-widest text-[10px]"
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            className="font-bold text-[10px]"
          />
          <Tooltip
            cursor={{ stroke: 'var(--color-score)', strokeWidth: 1, strokeDasharray: '4 4' }}
            content={
              <ChartTooltipContent
                indicator="line"
                labelClassName="text-xs font-black uppercase tracking-widest"
                className="rounded-2xl border-none bg-background/95 backdrop-blur-md p-4 shadow-2xl"
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="var(--color-score)"
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorScore)"
            dot={{ 
              r: 6, 
              fill: 'var(--color-score)', 
              stroke: 'hsl(var(--background))', 
              strokeWidth: 2 
            }}
            activeDot={{ 
              r: 8, 
              fill: 'hsl(var(--background))', 
              stroke: 'var(--color-score)', 
              strokeWidth: 3,
              className: "animate-pulse"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

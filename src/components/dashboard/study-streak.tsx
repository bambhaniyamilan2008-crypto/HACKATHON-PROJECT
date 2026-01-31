'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Medal, Trophy, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StudyStreakProps {
  streakDays: number;
}

export function StudyStreak({ streakDays }: StudyStreakProps) {
  const getBadge = () => {
    if (streakDays >= 30) return { 
      name: 'Gold', 
      icon: Trophy, 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-400/10', 
      border: 'border-yellow-400/20',
      description: '30+ Days Streak Master'
    };
    if (streakDays >= 7) return { 
      name: 'Silver', 
      icon: Medal, 
      color: 'text-slate-400', 
      bg: 'bg-slate-400/10', 
      border: 'border-slate-400/20',
      description: '7+ Days Dedicated Learner'
    };
    if (streakDays >= 3) return { 
      name: 'Bronze', 
      icon: Award, 
      color: 'text-amber-600', 
      bg: 'bg-amber-600/10', 
      border: 'border-amber-600/20',
      description: '3+ Days Study Starter'
    };
    return null;
  };

  const badge = getBadge();
  const nextMilestone = streakDays < 3 ? 3 : streakDays < 7 ? 7 : streakDays < 30 ? 30 : 100;
  const progress = (streakDays / nextMilestone) * 100;

  return (
    <Card className="overflow-hidden border-2 border-primary/10 animate-fade-in-up">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500 fill-orange-500 animate-pulse" />
            Study Streak
          </CardTitle>
          <span className="text-2xl font-black italic text-primary">{streakDays} Days</span>
        </div>
        <CardDescription>Keep the momentum going!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span>Progress to next milestone ({nextMilestone}d)</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {badge && (
          <div className={cn("flex items-center gap-3 p-3 rounded-lg border animate-float", badge.bg, badge.border)}>
            <badge.icon className={cn("h-8 w-8", badge.color)} />
            <div>
              <p className="font-bold text-sm">{badge.name} Badge Earned!</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

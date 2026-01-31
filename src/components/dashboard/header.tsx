// @ts-nocheck
import { Bell, Menu, Search, Brain, Flame, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarNav } from './sidebar-nav';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const notifications = [
  {
    id: 'fee-1',
    title: '⚠️ Fee Payment Overdue',
    description: 'Term 2 fee (₹230,000) is now 5 days overdue. Please clear it immediately to avoid administrative blocks.',
    time: 'Just now',
    icon: <DollarSign className="h-4 w-4 text-destructive" />,
    color: 'bg-destructive/10',
    priority: 'high'
  },
  {
    id: '1',
    title: '⏰ Time to study Physics',
    description: 'Based on your "Hard" difficulty rating and tomorrow\'s exam window.',
    time: '2 mins ago',
    icon: <Clock className="h-4 w-4 text-primary" />,
    color: 'bg-primary/10',
  },
  {
    id: '2',
    title: '🔥 Don’t break your streak!',
    description: 'You are only 1 hour away from maintaining your 8-day momentum.',
    time: '1 hour ago',
    icon: <Flame className="h-4 w-4 text-orange-600" />,
    color: 'bg-orange-500/10',
  },
  {
    id: '3',
    title: 'New Material Uploaded',
    description: 'Mr. Davis added "Hamlet Chapter 3 Summary" to English Literature.',
    time: '3 hours ago',
    icon: <Brain className="h-4 w-4 text-green-600" />,
    color: 'bg-green-500/10',
  }
];

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
       <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl uppercase font-black">Smart Study</span>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
             <SidebarNav />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search subjects, students, or tasks..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        
        {/* Compact Study Streak Indicator */}
        <Link href="/">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 font-bold hover:bg-orange-500/20 transition-all cursor-pointer group">
            <Flame className="h-4 w-4 fill-orange-500 animate-pulse group-hover:scale-110 transition-transform" />
            <span className="text-sm">8</span>
          </div>
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-sm">Notifications</h2>
              <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter text-destructive border-destructive/20 bg-destructive/5 animate-pulse">
                Action Required
              </Badge>
            </div>
            <ScrollArea className="h-80">
              <div className="flex flex-col">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`flex gap-3 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer ${notif.priority === 'high' ? 'bg-destructive/5' : ''}`}>
                    <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notif.color}`}>
                      {notif.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className={`text-sm font-bold leading-none ${notif.priority === 'high' ? 'text-destructive' : ''}`}>{notif.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notif.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                Mark all as read
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

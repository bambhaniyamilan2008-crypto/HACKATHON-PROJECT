import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  ClipboardCheck,
  GraduationCap,
  Home,
  BookCopy,
  FileText,
  Contact,
  ShieldCheck,
  BrainCircuit,
  CheckSquare,
  Video,
  Clock,
  BookCheck,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { type NavLink } from './types';

export const adminNavLinks: NavLink[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/teachers', label: 'Teachers', icon: Contact },
  { href: '/admin/classes', label: 'Classes', icon: BookOpen },
  { href: '/admin/subjects', label: 'Subjects', icon: BookCopy },
  { href: '/admin/timetable', label: 'Timetable', icon: Calendar },
  { href: '/admin/study-planner', label: 'Study Planner', icon: BrainCircuit },
  { href: '/admin/fees', label: 'Fees', icon: DollarSign },
  { href: '/admin/exams', label: 'Exams & Results', icon: FileText },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/notices', label: 'Notice Board', icon: Bell },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export const studentNavLinks: NavLink[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/meetings', label: 'Doubt Clearing', icon: HelpCircle },
  { href: '/student/homework', label: 'Homework', icon: BookCheck },
  { href: '/student/materials', label: 'Materials', icon: BookOpen },
  { href: '/student/attendance', label: 'Attendance', icon: Clock },
  { href: '/student/results', label: 'Results', icon: FileText },
  { href: '/student/practice', label: 'Practice', icon: GraduationCap },
  { href: '/student/tutor', label: 'AI Tutor', icon: MessageCircle },
];

export const teacherNavLinks: NavLink[] = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/meetings', label: 'Consultation Pipeline', icon: MessageSquare },
  { href: '/teacher/attendance', label: 'Manage Attendance', icon: ClipboardCheck },
  { href: '/teacher/assignments', label: 'Assignments', icon: BookCheck },
  { href: '/teacher/notes', label: 'Course Notes', icon: BookCopy },
  { href: '/teacher/quizzes', label: 'Quizzes', icon: GraduationCap },
  { href: '/teacher/performance', label: 'Performance', icon: BarChart3 },
  { href: '/teacher/communication', label: 'Chat', icon: MessageCircle },
];

import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

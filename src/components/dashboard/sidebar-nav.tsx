'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { adminNavLinks, studentNavLinks, teacherNavLinks } from '@/lib/nav-links';
import { useEffect, useState } from 'react';

export function SidebarNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by waiting until client mount
  if (!mounted) {
    return null;
  }

  const getLinks = () => {
    if (pathname.startsWith('/admin')) return adminNavLinks;
    if (pathname.startsWith('/student')) return studentNavLinks;
    if (pathname.startsWith('/teacher')) return teacherNavLinks;
    return adminNavLinks;
  };

  const links = getLinks();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={{ children: link.label }}
          >
            <Link href={link.href}>
              <link.icon className="h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-tight">{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

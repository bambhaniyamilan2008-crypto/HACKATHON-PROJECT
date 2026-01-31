'use client';

import { type ReactNode } from 'react';
import { Inter, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { NotificationSystem } from '@/components/dashboard/notification-system';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { Brain } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

function DashboardHeaderSkeleton() {
  return <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30" />;
}

const DynamicDashboardHeader = dynamic(
  () => import('@/components/dashboard/header').then((mod) => mod.DashboardHeader),
  { 
    ssr: false,
    loading: () => <DashboardHeaderSkeleton />,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>SMART STUDY | AI-Enabled Learning</title>
        <meta name="description" content="A modern, scalable, and AI-enabled Learning Management System" />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          inter.variable,
          spaceGrotesk.variable,
          sourceCodePro.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <NotificationSystem />
            <div className="min-h-screen w-full">
              <div className="hidden md:block">
                <SidebarProvider>
                  <Sidebar>
                    <SidebarHeader>
                      <Link href="/" className="flex items-center gap-2 px-2 py-4">
                        <div className="bg-primary p-1.5 rounded-lg">
                          <Brain className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h1 className="font-headline text-xl font-black tracking-tighter uppercase">Smart Study</h1>
                      </Link>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarNav />
                    </SidebarContent>
                    <SidebarFooter>
                      {/* Footer content if needed */}
                    </SidebarFooter>
                  </Sidebar>
                  <SidebarInset>
                    <DynamicDashboardHeader />
                    <main className="p-4 sm:p-6 animate-fade-in">{children}</main>
                  </SidebarInset>
                </SidebarProvider>
              </div>
              <div className="md:hidden">
                 <DynamicDashboardHeader />
                <main className="p-4 sm:p-6 animate-fade-in">{children}</main>
              </div>
            </div>
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

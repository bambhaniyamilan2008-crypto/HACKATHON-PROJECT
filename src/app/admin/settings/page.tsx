'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Bell, Calendar, BrainCircuit, ShieldCheck, Save, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully applied to the system.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Settings" 
        description="Configure school-wide preferences, academic cycles, and AI behavior."
      >
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </PageHeader>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="general" className="gap-2">
            <Brain className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="academic" className="gap-2">
            <Calendar className="h-4 w-4" /> Academic
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <BrainCircuit className="h-4 w-4" /> AI Config
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>Manage your branding and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-4 flex-1 w-full">
                  <div className="grid gap-2">
                    <Label htmlFor="school-name">Platform Name</Label>
                    <Input id="school-name" defaultValue="SMART STUDY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school-email">Administrative Email</Label>
                    <Input id="school-email" type="email" defaultValue="smartfuture@edu.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school-address">Physical Address</Label>
                    <Input id="school-address" defaultValue="Gujrat, Bhavnagar" />
                  </div>
                </div>
                <div className="space-y-4 w-full md:w-64">
                  <Label>Platform Logo</Label>
                  <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-center bg-muted/20">
                    <Brain className="h-8 w-8 text-primary" />
                    <p className="text-xs text-muted-foreground">Brain Icon / Smart Study Logo</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="mr-2 h-3 w-3" /> Change Logo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Session</CardTitle>
                <CardDescription>Define the active academic year and term.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Academic Year</Label>
                  <Select defaultValue="2024-25">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-24">2023-24</SelectItem>
                      <SelectItem value="2024-25">2024-25</SelectItem>
                      <SelectItem value="2025-26">2025-26</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Active Semester/Term</Label>
                  <Select defaultValue="term1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term1">Term 1 (Autumn)</SelectItem>
                      <SelectItem value="term2">Term 2 (Spring)</SelectItem>
                      <SelectItem value="final">Final Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grading System</CardTitle>
                <CardDescription>Configure how grades are calculated and displayed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label>Relative Grading</Label>
                    <p className="text-xs text-muted-foreground">Calculate grades based on class average</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label>GPA Scale</Label>
                    <p className="text-xs text-muted-foreground">Use 4.0 or 10.0 scale for reports</p>
                  </div>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4.0</SelectItem>
                      <SelectItem value="10">10.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Control how and when the system alerts students and parents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Attendance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify parents instantly when a student is marked absent.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Grade Publication</Label>
                    <p className="text-sm text-muted-foreground">Alert students when new exam results are released.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Homework Deadlines</Label>
                    <p className="text-sm text-muted-foreground">Send reminders 24 hours before assignment due dates.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Configuration */}
        <TabsContent value="ai">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle>AI Governance & Models</CardTitle>
              </div>
              <CardDescription>Configure the behavior and performance of academic AI assistants.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Primary LLM Engine</Label>
                  <Select defaultValue="gemini-flash">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini 1.5 Pro (High Intelligence)</SelectItem>
                      <SelectItem value="gemini-flash">Gemini 1.5 Flash (Optimized Speed)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Report Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional & Academic</SelectItem>
                      <SelectItem value="encouraging">Encouraging & Warm</SelectItem>
                      <SelectItem value="direct">Direct & Concise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automated Class Summaries</Label>
                    <p className="text-sm text-muted-foreground">AI automatically generates weekly performance trends for admins.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Tutor Guardrails</Label>
                    <p className="text-sm text-muted-foreground">Prevent AI from providing direct answers to homework questions.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/10 py-3 rounded-b-lg">
              <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Powered by SMART STUDY AI Engine</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

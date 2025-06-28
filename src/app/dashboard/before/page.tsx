"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, CheckCircle, TrendingUp, DollarSign, Briefcase, Compass } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { careers, skillsByCareer, entranceExams } from '@/lib/constants';
import Link from 'next/link';

export default function BeforeUndergradPage() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careerId');

  const selectedCareer = careerId
    ? careers.find((c) => c.id === careerId)
    : null;

  const salaryData = [
    { name: 'Entry', salary: 75000 },
    { name: 'Mid', salary: 120000 },
    { name: 'Senior', salary: 180000 },
  ];
  
  const growthData = [
    { year: '2025', growth: 10 },
    { year: '2026', growth: 12 },
    { year: '2027', growth: 15 },
    { year: '2028', growth: 18 },
  ];

  if (!selectedCareer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="w-full max-w-lg p-8">
            <CardHeader className="p-0 items-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                    <Compass className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl">Welcome!</CardTitle>
                <CardDescription className="mt-2">
                    Please choose a career path to get personalized recommendations for your journey.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
                <Button asChild size="lg">
                    <Link href="/onboarding/career?stage=before">Choose a Career Path</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your chosen path: {selectedCareer.name}</CardTitle>
          <CardDescription>Here's your personalized dashboard. You can change your path in Settings.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Briefcase /> Job Scope Explorer: {selectedCareer.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4" />Potential Salary</h3>
                  <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={salaryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                          <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))} />
                          <Bar dataKey="salary" fill="hsl(var(--primary))" />
                      </BarChart>
                  </ResponsiveContainer>
                </div>
                  <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" />Growth Outlook</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={growthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => `${value}% Projected Growth`} />
                          <Bar dataKey="growth" fill="hsl(var(--accent))" />
                      </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Top 5 Foundational Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(skillsByCareer[selectedCareer.id] || []).map((skill, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Entrance Exam Planner</CardTitle>
          <CardDescription>Stay ahead of important exam deadlines.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entranceExams.map((exam) => (
                <TableRow key={exam.name}>
                  <TableCell className="font-medium">{exam.name}</TableCell>
                  <TableCell>{exam.area}</TableCell>
                  <TableCell>{exam.eligibility}</TableCell>
                  <TableCell>{exam.deadline}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Bell className="mr-2 h-4 w-4" /> Set Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

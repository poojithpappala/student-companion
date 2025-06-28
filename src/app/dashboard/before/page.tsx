"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, CheckCircle, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { careers, skillsByCareer, entranceExams } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function BeforeUndergradPage() {
  const [selectedCareer, setSelectedCareer] = useState<typeof careers[0] | null>(null);

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

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Career Chooser</CardTitle>
          <CardDescription>Select a career path to explore your options.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {careers.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedCareer(career)}
              className={cn(
                "p-4 rounded-lg border-2 text-center transition-all duration-200",
                selectedCareer?.id === career.id ? 'border-accent bg-accent/10 shadow-lg' : 'hover:border-primary/50 hover:bg-primary/5'
              )}
            >
              <div className="flex justify-center text-primary">{career.icon}</div>
              <p className="font-semibold mt-2 text-primary">{career.name}</p>
              <p className="text-xs text-muted-foreground">{career.degree}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      {selectedCareer && (
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
      )}

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

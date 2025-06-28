
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, CheckCircle, TrendingUp, DollarSign, Briefcase, Compass, BookOpen, Search, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { careers, skillsByCareer, entranceExams } from '@/lib/constants';
import Link from 'next/link';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCollegeSuggestions, CollegeSuggestion } from '@/ai/flows/college-explorer';
import { useToast } from "@/hooks/use-toast";


const collegeExplorerSchema = z.object({
  major: z.string().min(3, "Please enter a major."),
  location: z.string().optional(),
});

export default function BeforeUndergradPage() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careerId');
  const { toast } = useToast();

  const [selectedGrade, setSelectedGrade] = useState('12th');
  const [collegeSuggestions, setCollegeSuggestions] = useState<CollegeSuggestion[]>([]);
  const [isExploring, setIsExploring] = useState(false);

  const form = useForm<z.infer<typeof collegeExplorerSchema>>({
    resolver: zodResolver(collegeExplorerSchema),
    defaultValues: { major: "", location: "" },
  });

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

  const filteredExams = entranceExams.filter(exam => exam.grades.includes(selectedGrade));

  async function onCollegeExplorerSubmit(values: z.infer<typeof collegeExplorerSchema>) {
    setIsExploring(true);
    setCollegeSuggestions([]);
    try {
      const result = await getCollegeSuggestions({
        grade: selectedGrade,
        desiredMajor: values.major,
        locationPreference: values.location || 'any',
      });
      setCollegeSuggestions(result.colleges);
    } catch (error) {
      console.error("College explorer failed:", error);
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "There was an error finding colleges. Please try again.",
      });
    } finally {
      setIsExploring(false);
    }
  }

  if (!selectedCareer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <Card className="w-full max-w-2xl p-8 shadow-2xl">
            <CardHeader className="p-0 items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Compass className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Discover Your Perfect Career Path</CardTitle>
                <CardDescription className="mt-2 text-base max-w-md">
                    Take our quick, AI-powered self-assessment quiz to unlock personalized career recommendations and a tailored dashboard experience.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-8">
                <Button asChild size="lg">
                    <Link href="/dashboard/self-assessment">Take the Quiz Now</Link>
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
          <CardDescription>Here's your personalized dashboard. You can retake the self-assessment anytime.</CardDescription>
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
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline">Entrance Exam Planner</CardTitle>
              <CardDescription>Stay ahead of important exam deadlines based on your grade.</CardDescription>
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select your grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
                <SelectItem value="11th">11th Grade</SelectItem>
                <SelectItem value="12th">12th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Typical Deadline</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
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
      
      <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI College Explorer</CardTitle>
            <CardDescription>Find colleges that match your interests. Powered by AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCollegeExplorerSubmit)} className="flex flex-col md:flex-row items-end gap-4 mb-6">
                <FormField control={form.control} name="major" render={({ field }) => (
                    <FormItem className="flex-grow w-full"><FormLabel>Desired Major</FormLabel><FormControl><Input {...field} placeholder="e.g., Computer Science, Biology" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem className="flex-grow w-full"><FormLabel>Location (Optional)</FormLabel><FormControl><Input {...field} placeholder="e.g., California, USA" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isExploring}>
                    {isExploring ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                     Find Colleges
                </Button>
              </form>
            </Form>
            
            {isExploring && (
              <div className="text-center py-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Our AI is searching for colleges...</p>
              </div>
            )}
            {collegeSuggestions.length > 0 && (
              <div className="space-y-4">
                {collegeSuggestions.map(college => (
                  <Card key={college.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{college.name}</CardTitle>
                      <CardDescription>{college.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{college.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

          </CardContent>
        </Card>
    </div>
  );
}

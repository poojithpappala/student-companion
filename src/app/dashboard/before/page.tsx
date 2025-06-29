
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, CheckCircle, TrendingUp, DollarSign, Briefcase, Compass, BookOpen, Search, Loader2, Target, Trophy, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { careers, skillsByCareer, entranceExams, salaryByCareer, growthByCareer } from '@/lib/constants';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCollegeSuggestions } from '@/ai/flows/college-explorer';
import { type CollegeSuggestion, CollegeExplorerInputSchema } from '@/ai/schemas';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CareerDeepDive } from '@/components/dashboard/before/career-deep-dive';
import { Skeleton } from '@/components/ui/skeleton';

const collegeExplorerSchema = CollegeExplorerInputSchema.omit({ grade: true }).extend({
  major: CollegeExplorerInputSchema.shape.desiredMajor,
  location: z.string().optional(),
});

function CollegeCardSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
            </CardContent>
        </Card>
    );
}

function BeforeUndergradContent() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careerId');
  const justification = searchParams.get('justification');
  const { toast } = useToast();

  const [selectedGrade, setSelectedGrade] = useState('12th');
  const [collegeSuggestions, setCollegeSuggestions] = useState<CollegeSuggestion[]>([]);
  const [isExploring, setIsExploring] = useState(false);

  const form = useForm<z.infer<typeof collegeExplorerSchema>>({
    resolver: zodResolver(collegeExplorerSchema),
    defaultValues: { major: "", location: "" },
  });

  const selectedCareer = careerId ? careers.find((c) => c.id === careerId) : null;
  const salaryData = (careerId && salaryByCareer[careerId]) || [];
  const growthData = (careerId && growthByCareer[careerId]) || [];
  const careerSkills = (careerId && skillsByCareer[careerId]) || [];

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

  // If the user hasn't taken the self-assessment quiz, show a prompt.
  if (!selectedCareer) {
    return (
      <div className="flex w-full items-center justify-center p-4 mx-auto max-w-2xl" style={{minHeight: 'calc(100vh - 10rem)'}}>
        <Card className="w-full text-center shadow-2xl border-border/20 backdrop-blur-lg bg-card/80">
            <CardHeader className="items-center p-8">
                <div className="p-5 bg-primary/10 rounded-full mb-4">
                    <Compass className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl text-primary">Discover Your Perfect Career</CardTitle>
                <CardDescription className="mt-2 text-base max-w-md">
                    Take our quick, AI-powered self-assessment to unlock personalized career recommendations and a tailored dashboard experience.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                    <Link href="/dashboard/self-assessment">Take the Quiz Now</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  // The main tabbed dashboard for users who have completed the assessment.
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Tabs defaultValue="career-path" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="career-path"><Target className="mr-2 h-4 w-4" /> Career Path</TabsTrigger>
              <TabsTrigger value="career-deep-dive"><BookOpen className="mr-2 h-4 w-4" /> Career Deep Dive</TabsTrigger>
              <TabsTrigger value="exam-planner"><Trophy className="mr-2 h-4 w-4" /> Exam Planner</TabsTrigger>
              <TabsTrigger value="college-explorer"><GraduationCap className="mr-2 h-4 w-4" /> College Explorer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="career-path" className="space-y-6">
              <Card className="bg-primary/5">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-3">
                        <selectedCareer.icon className="h-8 w-8 text-primary"/>
                        Your Recommended Path: {selectedCareer.name}
                    </CardTitle>
                    <CardDescription>Based on your self-assessment, this is our top recommendation for you.</CardDescription>
                  </CardHeader>
                  {justification && (
                      <CardContent>
                          <blockquote className="border-l-4 border-accent bg-accent/10 p-4 italic text-primary/80 rounded-r-lg">
                              {decodeURIComponent(justification)}
                          </blockquote>
                      </CardContent>
                  )}
              </Card>

              <div className="grid lg:grid-cols-5 gap-6">
                  <Card className="lg:col-span-3">
                      <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Briefcase /> Job Scope Explorer</CardTitle>
                        <CardDescription>An overview of potential salary and projected growth for {selectedCareer.name}.</CardDescription>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm text-muted-foreground"><DollarSign className="h-4 w-4" />Potential Salary</h3>
                          <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={salaryData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" fontSize={12} />
                                  <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} fontSize={12} />
                                  <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))} />
                                  <Bar dataKey="salary" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                              </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm text-muted-foreground"><TrendingUp className="h-4 w-4" />Growth Outlook</h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={growthData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="year" fontSize={12} />
                                  <YAxis tickFormatter={(value) => `${value}%`} fontSize={12} />
                                  <Tooltip formatter={(value) => `${value}% Projected Growth`} />
                                  <Bar dataKey="growth" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]}/>
                              </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                  </Card>
                  <Card className="flex flex-col lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="font-headline">Top 5 Foundational Skills</CardTitle>
                       <CardDescription>Focus on these for a head start in {selectedCareer.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {careerSkills.map((skill, index) => (
                          <li key={index} className="flex items-center gap-3 text-sm">
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                            <span className="font-medium">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
              </div>
          </TabsContent>

          <TabsContent value="career-deep-dive">
              <CareerDeepDive careerId={selectedCareer.id} careerName={selectedCareer.name} />
          </TabsContent>

          <TabsContent value="exam-planner">
              <Card>
                  <CardHeader>
                    <div className="flex flex-wrap justify-between items-center gap-4">
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
                        {filteredExams.length === 0 && (
                          <TableRow>
                              <TableCell colSpan={5} className="text-center text-muted-foreground py-6">No exams typically taken in {selectedGrade} Grade.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
              </Card>
          </TabsContent>
          
          <TabsContent value="college-explorer">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline">AI College Explorer</CardTitle>
                      <CardDescription>Find colleges that match your interests. Powered by AI.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onCollegeExplorerSubmit)} className="grid grid-cols-1 md:grid-cols-5 items-end gap-4 mb-6 p-4 border rounded-lg bg-card shadow-sm">
                          <FormField control={form.control} name="major" render={({ field }) => (
                              <FormItem className="w-full md:col-span-2"><FormLabel>Desired Major</FormLabel><FormControl><Input {...field} placeholder="e.g., Computer Science, Biology" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="location" render={({ field }) => (
                              <FormItem className="w-full md:col-span-2"><FormLabel>Location (Optional)</FormLabel><FormControl><Input {...field} placeholder="e.g., California, USA or any" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <Button type="submit" disabled={isExploring} className="w-full md:w-auto md:col-span-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                              {isExploring ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                               Find Colleges
                          </Button>
                        </form>
                      </Form>
                      
                      <div className="mt-6">
                        {isExploring ? (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-muted-foreground">Our AI is searching for the best colleges for you...</h3>
                                <CollegeCardSkeleton />
                                <CollegeCardSkeleton />
                                <CollegeCardSkeleton />
                            </div>
                        ) : collegeSuggestions.length > 0 ? (
                            <div className="space-y-4">
                            <h3 className="font-semibold text-lg">AI Recommendations:</h3>
                            {collegeSuggestions.map(college => (
                                <Card key={college.name}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{college.name}</CardTitle>
                                    <CardDescription>{college.location}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{college.description}</p>
                                </CardContent>
                                </Card>
                            ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                <p>College suggestions will appear here once you search.</p>
                            </div>
                        )}
                      </div>
                  </CardContent>
              </Card>
          </TabsContent>
      </Tabs>
    </div>
  );
}


export default function BeforeUndergradPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <BeforeUndergradContent />
        </Suspense>
    );
}

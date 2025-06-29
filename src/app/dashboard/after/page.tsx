
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Briefcase, GraduationCap, ArrowRight, Wand2, Search, Compass, Loader2, FileText, ExternalLink } from 'lucide-react';
import { careers } from '@/lib/constants';
import { fetchAdzunaJobs, type Job } from '@/services/jobs';
import { getCareerDeepDive } from '@/ai/flows/career-deep-dive';
import { type CareerDeepDiveOutput } from '@/ai/schemas';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

function JobListItemSkeleton() {
    return (
        <div className="flex justify-between items-center p-3 rounded-md border animate-pulse">
            <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-14" />
        </div>
    );
}

function CourseCardSkeleton() {
    return (
        <div className="p-4 rounded-lg border flex items-center gap-4 animate-pulse">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-grow space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-8" />
        </div>
    );
}

function AfterUndergradContent() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const careerId = searchParams.get('careerId');
    const career = careers.find(c => c.id === careerId);

    const [jobs, setJobs] = useState<Job[]>([]);
    const [courses, setCourses] = useState<CareerDeepDiveOutput['suggestedCourses']>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (career) {
                setLoading(true);
                try {
                    const [jobResults, deepDiveData] = await Promise.all([
                        fetchAdzunaJobs({ query: career.name, resultsPerPage: 5 }),
                        getCareerDeepDive({ careerName: career.name })
                    ]);
                    setJobs(jobResults);
                    setCourses(deepDiveData.suggestedCourses || []);
                } catch (error) {
                    if (error instanceof Error && !error.message.includes('Adzuna API keys not configured')) {
                        console.error("Failed to load dashboard data:", error);
                        toast({
                            variant: "destructive",
                            title: "Error",
                            description: "Could not load all dashboard data. Please try again.",
                        });
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        if (process.env.NEXT_PUBLIC_ADZUNA_APP_ID && process.env.NEXT_PUBLIC_ADZUNA_API_KEY) {
            loadData();
        } else {
            setLoading(false);
        }
    }, [career, toast]);

    if (!career) {
        return (
            <div className="flex w-full items-center justify-center p-4 mx-auto max-w-2xl" style={{ minHeight: 'calc(100vh - 10rem)' }}>
                <Card className="w-full text-center shadow-2xl border-border/20 backdrop-blur-lg bg-card/80">
                    <CardHeader className="items-center p-8">
                        <div className="p-5 bg-primary/10 rounded-full mb-4">
                            <Compass className="h-16 w-16 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl text-primary">Begin Your Next Chapter</CardTitle>
                        <CardDescription className="mt-2 text-base max-w-md">
                            Choose a career path to see relevant job opportunities, courses, and powerful AI tools.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                            <Link href="/onboarding/career?stage=after">Choose a Career Path</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 max-w-7xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                        <CardTitle className="font-headline text-2xl text-primary flex items-center gap-3">
                            <career.icon className="w-8 h-8"/>
                            Your Dashboard for {career.name}
                        </CardTitle>
                        <CardDescription>
                            Personalized tools and resources for career growth and job searching.
                        </CardDescription>
                        </div>
                         <Link href="/onboarding/career?stage=after">
                            <Button variant="outline">Change Career</Button>
                        </Link>
                    </div>
                </CardHeader>
            </Card>
            <Tabs defaultValue="job-search" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                    <TabsTrigger value="job-search"><Search className="mr-2 h-4 w-4" /> Job Search Toolkit</TabsTrigger>
                    <TabsTrigger value="career-growth"><TrendingUp className="mr-2 h-4 w-4" /> Career Growth</TabsTrigger>
                    <TabsTrigger value="advanced-tools"><Wand2 className="mr-2 h-4 w-4" /> Advanced Tools</TabsTrigger>
                </TabsList>
                
                <TabsContent value="job-search" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Briefcase /> Job-Switch Toolkit</CardTitle>
                            <CardDescription>Tools and live job postings to help you find your next role.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <Card className="bg-muted/50 p-4 flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-sm flex items-center gap-2"><FileText/> Resume Analyzer</h4>
                                    <p className="text-xs text-muted-foreground">Get instant AI feedback.</p>
                                  </div>
                                  <Button asChild size="sm"><Link href="/dashboard/resume-analyzer">Analyze</Link></Button>
                               </Card>
                               <Card className="bg-muted/50 p-4 flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-sm flex items-center gap-2"><Search/> Company Insights</h4>
                                    <p className="text-xs text-muted-foreground">Research company culture.</p>
                                  </div>
                                  <Button asChild size="sm"><Link href="/dashboard/company-insights">Research</Link></Button>
                               </Card>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-4">Live Job Postings for {career.name}</h4>
                                <div className="space-y-2">
                                    {loading ? (
                                        <>
                                            <JobListItemSkeleton />
                                            <JobListItemSkeleton />
                                            <JobListItemSkeleton />
                                            <JobListItemSkeleton />
                                            <JobListItemSkeleton />
                                        </>
                                    ) : jobs.length > 0 ? jobs.map(job => (
                                        <div key={job.id} className="flex justify-between items-center p-3 rounded-md border hover:bg-secondary/70 transition-colors">
                                            <div>
                                                <p className="font-medium text-sm">{job.title}</p>
                                                <p className="text-xs text-muted-foreground">{job.company.display_name} - {job.location.display_name}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild><Link href={job.redirect_url} target="_blank">View</Link></Button>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-muted-foreground pt-10 text-center">No jobs found for {career.name}.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="career-growth" className="mt-6">
                     <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><TrendingUp /> AI-Recommended Courses</CardTitle>
                            <CardDescription>Upskill with AI-powered micro-course recommendations based on your career choice.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                            {loading ? (
                                <>
                                    <CourseCardSkeleton />
                                    <CourseCardSkeleton />
                                    <CourseCardSkeleton />
                                    <CourseCardSkeleton />
                                </>
                            ) : courses.length > 0 ? courses.map((course, index) => (
                                <div key={index} className="p-4 rounded-lg border flex items-center gap-4 hover:bg-secondary/70 transition-colors">
                                    <div className="text-accent bg-accent/10 p-3 rounded-lg"><TrendingUp /></div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold">{course.name}</h4>
                                        <p className="text-sm text-muted-foreground">{course.platform}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild><Link href="#" target="_blank"><ExternalLink className="h-4 w-4"/></Link></Button>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground pt-10 text-center lg:col-span-2">No course recommendations found.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="advanced-tools" className="mt-6">
                     <div className="grid lg:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:-translate-y-1 transition-transform duration-300 shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><Wand2 /> Salary Negotiation Coach</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Get live salary data and AI-powered negotiation tips to maximize your offer.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                                    <Link href="/dashboard/salary-negotiator">Launch Coach <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><GraduationCap /> Explore Higher Studies</CardTitle>
                                <CardDescription>Find the best graduate programs for your field with our AI-powered search tool.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                    <Link href="/dashboard/graduate-school-finder">Launch Finder <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}


export default function AfterUndergradPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <AfterUndergradContent />
        </Suspense>
    )
}

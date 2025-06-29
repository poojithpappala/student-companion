
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Briefcase, GraduationCap, ArrowRight, Wand2, Search, Compass, Loader2 } from 'lucide-react';
import { careers } from '@/lib/constants';
import { fetchAdzunaJobs, type Job } from '@/services/jobs';

function AfterUndergradContent() {
    const searchParams = useSearchParams();
    const careerId = searchParams.get('careerId');
    const career = careers.find(c => c.id === careerId);

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJobs() {
            if (career) {
                setLoading(true);
                const jobResults = await fetchAdzunaJobs({ query: career.name, resultsPerPage: 5 });
                setJobs(jobResults);
                setLoading(false);
            }
        }
        if (career) {
            loadJobs();
        } else {
            setLoading(false);
        }
    }, [career]);

    if (!career) {
        return (
            <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 10rem)' }}>
                <Card className="w-full max-w-2xl text-center shadow-lg">
                    <CardHeader className="items-center p-8">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Compass className="h-16 w-16 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Select a Career to Begin</CardTitle>
                        <CardDescription className="mt-2 text-base max-w-md">
                            Choose a career path to see relevant job opportunities, courses, and tools.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <Button asChild size="lg">
                            <Link href="/onboarding/career?stage=after">Choose a Career Path</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Dashboard for {career.name}</CardTitle>
                    <CardDescription>
                        Here are your personalized tools and resources for career growth and job searching.
                    </CardDescription>
                </CardHeader>
            </Card>
            <Tabs defaultValue="job-search" className="w-full">
                <TabsList>
                    <TabsTrigger value="job-search"><Search className="mr-2 h-4 w-4" /> Job Search</TabsTrigger>
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
                               <h4 className="font-semibold text-sm">Resume & Company Research</h4>
                               <Button asChild className="w-full" variant="outline"><Link href="/dashboard/resume-analyzer">Refresh & Analyze Resume</Link></Button>
                               <Button asChild className="w-full" variant="outline"><Link href="/dashboard/company-insights">Research Companies</Link></Button>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-2">Live Job Postings for {career.name}</h4>
                                <div className="space-y-2">
                                    {loading && <div className="flex justify-center items-center h-full pt-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
                                    {!loading && jobs.length > 0 ? jobs.map(job => (
                                        <div key={job.id} className="flex justify-between items-center p-2 rounded-md border hover:bg-muted">
                                            <div>
                                                <p className="font-medium text-sm">{job.title}</p>
                                                <p className="text-xs text-muted-foreground">{job.company.display_name} - {job.location.display_name}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild><Link href={job.redirect_url} target="_blank">View</Link></Button>
                                        </div>
                                    )) : !loading && <p className="text-sm text-muted-foreground pt-10 text-center">No jobs found for {career.name}.</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="career-growth" className="mt-6">
                     <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><TrendingUp /> Career Growth Plans</CardTitle>
                            <CardDescription>Upskill with recommended micro-courses based on your career choice.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg border flex items-center gap-4">
                                <div className="text-accent bg-accent/10 p-3 rounded-lg"><TrendingUp /></div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold">Advanced Cloud Computing</h4>
                                    <p className="text-sm text-muted-foreground">Coursera • 3 months</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild><Link href="#" target="_blank">View</Link></Button>
                            </div>
                            <div className="p-4 rounded-lg border flex items-center gap-4">
                                <div className="text-accent bg-accent/10 p-3 rounded-lg"><TrendingUp /></div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold">AI for Project Managers</h4>
                                    <p className="text-sm text-muted-foreground">edX • 6 weeks</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild><Link href="#" target="_blank">View</Link></Button>
                            </div>
                            <div className="p-4 rounded-lg border flex items-center gap-4">
                                <div className="text-accent bg-accent/10 p-3 rounded-lg"><TrendingUp /></div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold">Cybersecurity Specialization</h4>
                                    <p className="text-sm text-muted-foreground">Udacity • 4 months</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild><Link href="#" target="_blank">View</Link></Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="advanced-tools" className="mt-6">
                     <div className="grid lg:grid-cols-2 gap-8">
                        <Card className="bg-primary text-primary-foreground">
                            <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-headline flex items-center gap-2"><Wand2 /> Salary Negotiation Coach</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Get live salary data and AI-powered negotiation tips.</CardDescription>
                            </div>
                            <Button asChild variant="secondary">
                                <Link href="/dashboard/salary-negotiator">Launch Coach <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-headline flex items-center gap-2"><GraduationCap /> Explore Higher Studies</CardTitle>
                                <CardDescription>Find the best graduate programs with our AI-powered tool.</CardDescription>
                            </div>
                            <Button asChild variant="default">
                                <Link href="/dashboard/graduate-school-finder">Launch Finder <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                            </CardHeader>
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

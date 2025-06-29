
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Briefcase, Target, FileText, MessageSquare, ArrowRight, School, Compass, type LucideProps, Loader2 } from "lucide-react";
import { projectIdeasByCareer, defaultProjectIdeas, careers } from '@/lib/constants';
import { fetchAdzunaJobs, type Job } from '@/services/jobs';
import type { ComponentType } from "react";
import { CareerRoadmap } from "@/components/dashboard/during/career-roadmap";

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  FileText,
  Target,
  MessageSquare,
};

const applicationTracker = [
    { company: "Innovate LLC", role: "Frontend Intern", status: "Applied" },
    { company: "Big Tech Co", role: "SWE Intern", status: "Interview" },
    { company: "Local Startup", role: "Full-Stack Dev", status: "Offer" },
];

export default function DuringUndergradPage() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careerId') as keyof typeof projectIdeasByCareer | undefined;
  const career = careers.find(c => c.id === careerId);

  const [internships, setInternships] = useState<Job[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  const projectIdeas = (careerId && projectIdeasByCareer[careerId]) || defaultProjectIdeas;

  useEffect(() => {
    async function loadJobs() {
      if (career) {
        setLoading(true);
        const [internshipResults, jobResults] = await Promise.all([
          fetchAdzunaJobs({ query: `${career.name} intern`, resultsPerPage: 10 }),
          fetchAdzunaJobs({ query: `${career.name} graduate`, resultsPerPage: 5 })
        ]);
        setInternships(internshipResults);
        setJobs(jobResults);
        setLoading(false);
      }
    }
    if (career) {
        loadJobs();
    }
  }, [career]);

  if (!careerId || !career) {
    return (
      <div className="flex items-center justify-center p-4" style={{minHeight: 'calc(100vh - 10rem)'}}>
        <Card className="w-full max-w-2xl text-center shadow-lg">
            <CardHeader className="items-center p-8">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Compass className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Let's Get Personal</CardTitle>
                <CardDescription className="mt-2 text-base max-w-md">
                    Choose a career path to unlock your personalized dashboard and AI-powered roadmap.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
                <Button asChild size="lg">
                    <Link href="/onboarding/career?stage=during">Choose a Career Path</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Resume & Portfolio</CardTitle>
            <CardDescription>Get AI-powered feedback to improve your resume.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/resume-analyzer">Analyze Now <ArrowRight className="ml-2 h-4 w-4"/></Link>
          </Button>
        </CardHeader>
      </Card>
        <Tabs defaultValue="year1" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="year1">1st Year</TabsTrigger>
            <TabsTrigger value="year2">2nd Year</TabsTrigger>
            <TabsTrigger value="year3">3rd Year</TabsTrigger>
            <TabsTrigger value="year4">Final Year</TabsTrigger>
            </TabsList>

            <TabsContent value="year1" className="mt-6 space-y-6">
                <CareerRoadmap careerId={career.id} year="1st Year" />
            </TabsContent>

            <TabsContent value="year2" className="mt-6 space-y-6">
                <CareerRoadmap careerId={career.id} year="2nd Year" />
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Lightbulb/> Project Ideas</CardTitle>
                        <CardDescription>Get inspired with projects tailored to {career.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {projectIdeas.map(p => {
                        const Icon = iconMap[p.icon] || FileText;
                        return (
                            <div key={p.title} className="p-4 rounded-lg border flex items-start gap-4">
                                <div className="text-accent bg-accent/10 p-3 rounded-lg"><Icon /></div>
                                <div>
                                    <h4 className="font-semibold">{p.title}</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">{p.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
                                </div>
                            </div>
                        )
                        })}
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Briefcase/> Micro-Internships</CardTitle>
                        <CardDescription>Short-term projects to build your experience.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-64">
                        {loading && <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>}
                        {!loading && internships.length === 0 && <p className="text-muted-foreground text-center pt-4">No micro-internships found for {career.name}.</p>}
                        {internships.slice(0, 5).map(i => (
                            <div key={i.id} className="p-3 mb-2 rounded-md border">
                                <h4 className="font-semibold text-sm">{i.title}</h4>
                                <p className="text-xs text-muted-foreground">{i.company.display_name} - {i.location.display_name}</p>
                            </div>
                        ))}
                        </ScrollArea>
                    </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="year3" className="mt-6 space-y-6">
                <CareerRoadmap careerId={career.id} year="3rd Year" />
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Briefcase/> Internship Board</CardTitle>
                        <CardDescription>Live internship postings for {career.name} from Adzuna.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72">
                        {loading && <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>}
                        {!loading && internships.length === 0 && <p className="text-muted-foreground text-center pt-4">No internships found.</p>}
                        {internships.map(i => (
                            <div key={i.id} className="p-3 mb-2 rounded-md border flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{i.title}</h4>
                                    <p className="text-sm text-muted-foreground">{i.company.display_name} - {i.location.display_name}</p>
                                </div>
                                <Button size="sm" asChild variant="secondary"><Link href={i.redirect_url} target="_blank">Apply</Link></Button>
                            </div>
                        ))}
                        </ScrollArea>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Target/> Application Tracker</CardTitle>
                        <CardDescription>Keep track of your job applications (demo).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {applicationTracker.map(app => (
                            <div key={app.company} className="p-3 mb-2 rounded-md border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold">{app.role}</h4>
                                        <p className="text-sm text-muted-foreground">{app.company}</p>
                                    </div>
                                    <Badge variant={app.status === 'Offer' ? 'default' : 'outline'}>{app.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    </Card>
                </div>
            </TabsContent>
            
            <TabsContent value="year4" className="mt-6 space-y-6">
                <CareerRoadmap careerId={career.id} year="Final Year" />
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Graduate Job Board</CardTitle>
                            <CardDescription>Top graduate job recommendations for {career.name}.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                        {loading && <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>}
                        {!loading && jobs.length === 0 && <p className="text-muted-foreground text-center pt-4">No graduate jobs found. Check back later!</p>}
                        {jobs.map(job => (
                                <div key={job.id} className="p-3 rounded-md border flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{job.title}</h4>
                                    <p className="text-sm text-muted-foreground">{job.company.display_name} - {job.location.display_name}</p>
                                </div>
                                <Button size="sm" asChild variant="secondary"><Link href={job.redirect_url} target="_blank">View Job</Link></Button>
                            </div>
                        ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><School/> Higher Studies</CardTitle>
                            <CardDescription>Resources to prepare for post-graduate exams.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap justify-center gap-4">
                            <Button variant="outline">GRE Prep</Button>
                            <Button variant="outline">GMAT Prep</Button>
                            <Button variant="outline">IELTS Prep</Button>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}

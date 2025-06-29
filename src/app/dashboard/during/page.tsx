
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Briefcase, Target, FileText, ArrowRight, School, Compass, Loader2, Building2, GraduationCap, Wand2, ExternalLink } from "lucide-react";
import { projectIdeasByCareer, defaultProjectIdeas, careers } from '@/lib/constants';
import { fetchAdzunaJobs, type Job } from '@/services/jobs';
import { CareerRoadmap } from "@/components/dashboard/during/career-roadmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const applicationTracker = [
    { company: "Innovate LLC", role: "Frontend Intern", status: "Applied", statusColor: "bg-blue-500" },
    { company: "Big Tech Co", role: "SWE Intern", status: "Interviewing", statusColor: "bg-yellow-500" },
    { company: "Local Startup", role: "Full-Stack Dev", status: "Offer", statusColor: "bg-green-500" },
    { company: "Data Corp", role: "Data Analyst Intern", status: "Rejected", statusColor: "bg-red-500" },
];

function DuringUndergradContent() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careerId') as keyof typeof projectIdeasByCareer | undefined;
  const year = searchParams.get('year') as '1st Year' | '2nd Year' | '3rd Year' | 'Final Year' | null;
  const career = careers.find(c => c.id === careerId);

  const [internships, setInternships] = useState<Job[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const projectIdeas = (careerId && projectIdeasByCareer[careerId]) || defaultProjectIdeas;

  useEffect(() => {
    async function loadJobs() {
      if (career) {
        setLoading(true);
        try {
          const [internshipResults, jobResults] = await Promise.all([
            fetchAdzunaJobs({ query: `${career.name} intern`, resultsPerPage: 10 }),
            fetchAdzunaJobs({ query: `${career.name} graduate`, resultsPerPage: 5 })
          ]);
          setInternships(internshipResults);
          setJobs(jobResults);
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
            if (error instanceof Error && !error.message.includes('Adzuna API keys not configured')) {
                toast({
                    variant: "destructive",
                    title: "Error Loading Jobs",
                    description: error.message,
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
        loadJobs();
    } else {
        setLoading(false);
    }
  }, [career, toast]);

  if (!careerId || !career) {
    return (
      <div className="flex w-full items-center justify-center p-4" style={{minHeight: 'calc(100vh - 10rem)'}}>
        <Card className="w-full max-w-2xl text-center shadow-2xl border-border/20 backdrop-blur-lg bg-card/80">
            <CardHeader className="items-center p-8">
                <div className="p-5 bg-primary/10 rounded-full mb-4">
                    <Compass className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl text-primary">Let's Get Personal</CardTitle>
                <CardDescription className="mt-2 text-base max-w-md">
                    Choose a career path to unlock your personalized dashboard and AI-powered roadmap.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                    <Link href="/onboarding/career?stage=during">Choose Your Career</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!year) {
     return (
      <div className="flex w-full items-center justify-center p-4" style={{minHeight: 'calc(100vh - 10rem)'}}>
        <Card className="w-full max-w-2xl text-center shadow-2xl border-border/20 backdrop-blur-lg bg-card/80">
            <CardHeader className="items-center p-8">
                <div className="p-5 bg-primary/10 rounded-full mb-4">
                    <School className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl text-primary">Which Year Are You In?</CardTitle>
                <CardDescription className="mt-2 text-base max-w-md">
                    Please select your current year of study to see your personalized dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                    <Link href={`/onboarding/year?stage=during&careerId=${careerId}`}>Select Your Year</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const renderContentForYear = () => {
    switch(year) {
      case '1st Year':
        return (
          <Tabs defaultValue="roadmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="roadmap"><Target className="mr-2 h-4 w-4" /> Your Roadmap</TabsTrigger>
              <TabsTrigger value="foundations"><FileText className="mr-2 h-4 w-4" /> Career Foundations</TabsTrigger>
            </TabsList>
            <TabsContent value="roadmap">
              <CareerRoadmap careerId={career.id} year="1st Year" />
            </TabsContent>
            <TabsContent value="foundations">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Build Your Professional Profile</CardTitle>
                  <CardDescription>Get AI-powered feedback to improve your resume. A strong resume is crucial, even in your first year!</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/dashboard/resume-analyzer">Analyze My Resume <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        );
      case '2nd Year':
        return (
          <Tabs defaultValue="roadmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="roadmap"><Target className="mr-2 h-4 w-4" /> Your Roadmap</TabsTrigger>
              <TabsTrigger value="skill-building"><Lightbulb className="mr-2 h-4 w-4" /> Skill Building</TabsTrigger>
            </TabsList>
            <TabsContent value="roadmap">
                <CareerRoadmap careerId={career.id} year="2nd Year" />
            </TabsContent>
            <TabsContent value="skill-building" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Lightbulb/> Project Ideas Feed</CardTitle>
                        <CardDescription>Get inspired with projects tailored to {career.name}.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        {projectIdeas.map(p => {
                            return (
                            <div key={p.title} className="p-4 rounded-lg border flex items-start gap-4">
                                <div className="text-accent bg-accent/10 p-3 rounded-lg"><Lightbulb /></div>
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
                        <ScrollArea className="h-64 pr-4">
                        {loading && <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>}
                        {!loading && internships.length === 0 && <p className="text-muted-foreground text-center pt-4">No micro-internships found for {career.name}.</p>}
                        {internships.slice(0, 5).map(i => (
                            <div key={i.id} className="p-3 mb-2 rounded-md border flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold text-sm">{i.title}</h4>
                                    <p className="text-xs text-muted-foreground">{i.company.display_name} - {i.location.display_name}</p>
                                </div>
                                <Button size="sm" asChild variant="ghost"><Link href={i.redirect_url} target="_blank"><ExternalLink className="h-4 w-4"/></Link></Button>
                            </div>
                        ))}
                        </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
          </Tabs>
        );
      case '3rd Year':
        return (
          <Tabs defaultValue="internships" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="roadmap"><Target className="mr-2 h-4 w-4" /> Your Roadmap</TabsTrigger>
              <TabsTrigger value="internships"><Briefcase className="mr-2 h-4 w-4" /> Internships</TabsTrigger>
              <TabsTrigger value="research"><Building2 className="mr-2 h-4 w-4" /> Company Research</TabsTrigger>
            </TabsList>
            <TabsContent value="roadmap">
              <CareerRoadmap careerId={career.id} year="3rd Year" />
            </TabsContent>
            <TabsContent value="internships" className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Briefcase/> Internship Board</CardTitle>
                    <CardDescription>Live internship postings for {career.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ScrollArea className="h-[26rem] pr-4">
                        {loading && <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>}
                        {!loading && internships.length === 0 && <p className="text-muted-foreground text-center pt-4">No internships found.</p>}
                        {internships.map(i => (
                        <div key={i.id} className="p-3 mb-2 rounded-md border flex justify-between items-center hover:bg-secondary transition-colors">
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
                    <CardDescription>Keep track of your applications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                    {applicationTracker.map(app => (
                        <div key={app.company} className="p-3 rounded-md border">
                        <div className="flex justify-between items-center">
                            <div>
                            <h4 className="font-semibold">{app.role}</h4>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                            </div>
                            <span title={app.status} className="h-3 w-3 rounded-full" style={{backgroundColor: app.statusColor}}/>
                        </div>
                        <Progress value={75} className="h-1 mt-2"/>
                        </div>
                    ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="research">
                 <Card className="text-center">
                    <CardHeader className="items-center">
                        <div className="p-4 bg-accent/10 rounded-full mb-2"><Building2 className="w-10 h-10 text-accent"/></div>
                        <CardTitle className="font-headline flex items-center gap-2 text-primary">Company Insights</CardTitle>
                        <CardDescription>Research companies before you apply. Get AI-powered insights on culture and interviews.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href="/dashboard/company-insights">Launch Company Researcher <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        );
      case 'Final Year':
        return (
          <Tabs defaultValue="next-steps" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="roadmap"><Target className="mr-2 h-4 w-4" /> Your Roadmap</TabsTrigger>
              <TabsTrigger value="next-steps"><GraduationCap className="mr-2 h-4 w-4" /> Next Steps</TabsTrigger>
            </TabsList>
            <TabsContent value="roadmap">
              <CareerRoadmap careerId={career.id} year="Final Year" />
            </TabsContent>
            <TabsContent value="next-steps" className="space-y-6">
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
                        <div key={job.id} className="p-3 rounded-md border flex justify-between items-center hover:bg-secondary transition-colors">
                            <div>
                            <h4 className="font-semibold">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">{job.company.display_name}</p>
                            </div>
                            <Button size="sm" asChild variant="secondary"><Link href={job.redirect_url} target="_blank">View</Link></Button>
                        </div>
                    ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="items-center text-center">
                        <div className="p-4 bg-accent/10 rounded-full mb-2"><GraduationCap className="w-10 h-10 text-accent"/></div>
                        <CardTitle className="font-headline flex items-center gap-2 text-primary">Explore Higher Studies</CardTitle>
                        <CardDescription>Considering a Master's or PhD? Find the best graduate programs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"><Link href="/dashboard/graduate-school-finder">Launch Finder <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
                    </CardContent>
                </Card>
                </div>

                <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
                    <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2"><Wand2/> Salary Negotiation Coach</CardTitle>
                        <CardDescription className="text-primary-foreground/80">Don't leave money on the table. Get AI-powered negotiation tips.</CardDescription>
                    </div>
                    <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                        <Link href="/dashboard/salary-negotiator">Launch Coach <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                    </CardHeader>
                </Card>
            </TabsContent>
          </Tabs>
        );
      default:
        return <p>Invalid year selected.</p>;
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-headline text-2xl text-primary">Your {year} Dashboard</CardTitle>
              <CardDescription>
                Personalized tools and resources for your journey in <span className="font-semibold text-primary">{career?.name}</span>.
              </CardDescription>
            </div>
            <Link href={`/onboarding/year?stage=during&careerId=${careerId}`}>
                <Button variant="outline">Change Year</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      {renderContentForYear()}
    </div>
  );
}

export default function DuringUndergradPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <DuringUndergradContent />
        </Suspense>
    )
}

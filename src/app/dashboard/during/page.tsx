
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import { Lightbulb, Briefcase, Users, Target, FileText, MessageSquare, ArrowRight, type LucideProps } from "lucide-react";
import { projectIdeasByCareer, defaultProjectIdeas, careers } from '@/lib/constants';
import type { ComponentType } from "react";
import { fetchAdzunaJobs } from "@/services/jobs";

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  FileText,
  Target,
  MessageSquare,
};


// Mock Data
const roadmapItems = [
  { year: 1, sem: 1, title: 'Core CS Concepts', done: true },
  { year: 1, sem: 2, title: 'Data Structures', done: true },
  { year: 2, sem: 1, title: 'Algorithms & OS', done: false },
  { year: 2, sem: 2, title: 'Build Personal Project', done: false },
  { year: 3, sem: 1, title: 'Internship Prep', done: false },
];

const applicationTracker = [
    { company: "Innovate LLC", role: "Frontend Intern", status: "Applied" },
    { company: "Big Tech Co", role: "SWE Intern", status: "Interview" },
    { company: "Local Startup", role: "Full-Stack Dev", status: "Offer" },
]


export default async function DuringUndergradPage({ searchParams }: { searchParams?: { careerId?: string } }) {
  const careerId = searchParams?.careerId as keyof typeof projectIdeasByCareer | undefined;
  const career = careers.find(c => c.id === careerId);
  
  const projectIdeas = (careerId && projectIdeasByCareer[careerId]) || defaultProjectIdeas;
  const internships = await fetchAdzunaJobs({ query: `${career?.name || 'tech'} intern`, resultsPerPage: 10 });
  const jobs = await fetchAdzunaJobs({ query: `${career?.name || 'tech'} graduate`, resultsPerPage: 5 });

  return (
    <div className="space-y-8">
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

        {/* 1st Year */}
        <TabsContent value="year1" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Interactive Career Roadmap</CardTitle>
              <CardDescription>Your personalized journey for the next four years.</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={40} className="mb-4" />
              <div className="flex flex-col gap-4">
                {roadmapItems.map(item => (
                  <div key={item.title} className={`p-3 rounded-md ${item.done ? 'bg-accent/20' : 'bg-muted'}`}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Year {item.year}, Sem {item.sem}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2nd Year */}
        <TabsContent value="year2" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Lightbulb/> Project Ideas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectIdeas.map(p => {
                  const Icon = iconMap[p.icon] || FileText;
                  return (
                    <Card key={p.title} className="p-4 flex items-start gap-4">
                      <div className="text-accent"><Icon /></div>
                      <div>
                        <h4 className="font-semibold">{p.title}</h4>
                        <div className="flex gap-2 mt-1">{p.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
                      </div>
                    </Card>
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
                {internships.slice(0, 5).map(i => (
                    <div key={i.id} className="p-3 mb-2 rounded-md border">
                        <h4 className="font-semibold">{i.title}</h4>
                        <p className="text-sm text-muted-foreground">{i.company.display_name} - {i.location.display_name}</p>
                    </div>
                ))}
                 {internships.length === 0 && <p className="text-muted-foreground">No internships found.</p>}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3rd Year */}
        <TabsContent value="year3" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Briefcase/> Internship/Job Board</CardTitle>
                <CardDescription>Live internships from Adzuna.</CardDescription>
              </CardHeader>
               <CardContent>
                <ScrollArea className="h-72">
                {internships.map(i => (
                    <div key={i.id} className="p-3 mb-2 rounded-md border flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold">{i.title}</h4>
                            <p className="text-sm text-muted-foreground">{i.company.display_name} - {i.location.display_name}</p>
                        </div>
                        <Button size="sm" asChild><Link href={i.redirect_url} target="_blank">Apply</Link></Button>
                    </div>
                ))}
                {internships.length === 0 && <p className="text-muted-foreground">No internships found.</p>}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Target/> Application Tracker</CardTitle>
                 <CardDescription>Keep track of your job applications.</CardDescription>
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
        
        {/* Final Year */}
        <TabsContent value="year4" className="mt-6 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Graduate Job Board</CardTitle>
                    <CardDescription>Top graduate job recommendations for you today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                   {jobs.length > 0 ? jobs.map(job => (
                        <div key={job.id} className="p-3 rounded-md border flex justify-between items-center">
                           <div>
                               <h4 className="font-semibold">{job.title}</h4>
                               <p className="text-sm text-muted-foreground">{job.company.display_name} - {job.location.display_name}</p>
                           </div>
                           <Button size="sm" asChild><Link href={job.redirect_url} target="_blank">View Job</Link></Button>
                       </div>
                   )) : <p className="text-muted-foreground text-center">No jobs found for today. Check back later!</p>}
                </CardContent>
             </Card>
              <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Higher Studies Roadmap</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-around">
                    <Button variant="outline">GRE Prep</Button>
                    <Button variant="outline">GMAT Prep</Button>
                    <Button variant="outline">IELTS Prep</Button>
                </CardContent>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

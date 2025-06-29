
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, RefreshCw, Briefcase, GraduationCap, ArrowRight, Wand2 } from 'lucide-react';
import { careers } from '@/lib/constants';
import { fetchAdzunaJobs } from '@/services/jobs';

export default async function AfterUndergradPage({ searchParams }: { searchParams?: { careerId?: string } }) {
  const careerId = searchParams?.careerId;
  const career = careers.find(c => c.id === careerId);

  const jobs = await fetchAdzunaJobs({ query: career?.name || 'tech professional', resultsPerPage: 5 });

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><TrendingUp/> Career Growth Plans</CardTitle>
            <CardDescription>Upskill with recommended micro-courses based on your career choice.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
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
        
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><RefreshCw/> Job-Switch Toolkit</CardTitle>
                     <CardDescription>Tools and live job postings to help you find your next role.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild className="w-full" variant="outline"><Link href="/dashboard/resume-analyzer">Refresh & Analyze Resume</Link></Button>
                    <div className="pt-2">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Briefcase/> Live Job Postings</h4>
                        <div className="space-y-2">
                        {jobs.length > 0 ? jobs.map(job => (
                            <div key={job.id} className="flex justify-between items-center p-2 rounded-md border hover:bg-muted">
                                <div>
                                    <p className="font-medium text-sm">{job.title}</p>
                                    <p className="text-xs text-muted-foreground">{job.company.display_name} - {job.location.display_name}</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild><Link href={job.redirect_url} target="_blank">View</Link></Button>
                            </div>
                        )) : <p className="text-sm text-muted-foreground">No jobs found.</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
       <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline flex items-center gap-2"><Wand2/> Salary Negotiation Coach</CardTitle>
                <CardDescription className="text-primary-foreground/80">Get live salary data and AI-powered negotiation tips.</CardDescription>
              </div>
              <Button asChild variant="secondary">
                <Link href="/dashboard/salary-negotiator">Launch Coach <ArrowRight className="ml-2 h-4 w-4"/></Link>
              </Button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline flex items-center gap-2"><GraduationCap/> Explore Higher Studies</CardTitle>
                <CardDescription>Find the best graduate programs with our AI-powered tool.</CardDescription>
              </div>
              <Button asChild variant="default">
                <Link href="/dashboard/graduate-school-finder">Launch Finder <ArrowRight className="ml-2 h-4 w-4"/></Link>
              </Button>
            </CardHeader>
          </Card>
      </div>

    </div>
  );
}


import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, RefreshCw, Briefcase, School, ArrowRight, type LucideProps, GraduationCap } from 'lucide-react';
import type { ComponentType } from 'react';
import { growthPlansByCareer, defaultGrowthPlans, careers } from '@/lib/constants';
import { fetchAdzunaJobs } from '@/services/jobs';

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  TrendingUp,
};

export default async function AfterUndergradPage({ searchParams }: { searchParams?: { careerId?: string } }) {
  const careerId = searchParams?.careerId as keyof typeof growthPlansByCareer | undefined;
  const career = careers.find(c => c.id === careerId);

  const growthPlans = (careerId && growthPlansByCareer[careerId]) || defaultGrowthPlans;
  const jobs = await fetchAdzunaJobs({ query: career?.name || 'tech professional', resultsPerPage: 4 });

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><TrendingUp/> Career Growth Plans</CardTitle>
                <CardDescription>Upskill with recommended micro-courses based on your career choice.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
            {growthPlans.map((plan) => {
              const Icon = iconMap[plan.icon] || TrendingUp;
              return (
                <div key={plan.title} className="p-4 rounded-lg border flex items-center gap-4">
                  <div className="text-accent bg-accent/10 p-3 rounded-lg"><Icon /></div>
                  <div className="flex-grow">
                      <h4 className="font-semibold">{plan.title}</h4>
                      <p className="text-sm text-muted-foreground">{plan.provider} • {plan.duration}</p>
                  </div>
                   <Button variant="ghost" size="sm" asChild><Link href="#" target="_blank">View</Link></Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><RefreshCw/> Job-Switch Toolkit</CardTitle>
                     <CardDescription>Tools and live job postings to help you find your next role.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild className="w-full" variant="outline"><Link href="/dashboard/resume-analyzer">Refresh Resume</Link></Button>
                    <div className="pt-2">
                        <h4 className="font-semibold text-sm mb-2">Live Job Postings</h4>
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
             <Card>
                <CardHeader className="items-center text-center">
                     <div className="p-3 bg-accent/10 rounded-full mb-2"><GraduationCap className="w-8 h-8 text-accent"/></div>
                    <CardTitle className="font-headline flex items-center gap-2">Explore Higher Studies</CardTitle>
                    <CardDescription>Use our AI-powered tool to find the best graduate programs for you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/dashboard/graduate-school-finder">Launch Finder <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Salary Benchmark & Negotiation Coach</CardTitle>
            <CardDescription className="text-primary-foreground/80">Get live salary data and AI-powered negotiation tips.</CardDescription>
          </div>
          <Button asChild variant="secondary">
            <Link href="/dashboard/salary-negotiator">Launch Coach <ArrowRight className="ml-2 h-4 w-4"/></Link>
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}

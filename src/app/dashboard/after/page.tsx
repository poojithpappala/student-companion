import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, RefreshCw, Briefcase, School, ArrowRight, type LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import { growthPlansByCareer, defaultGrowthPlans, jobSearchesByCareer, defaultJobSearches } from '@/lib/constants';

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  TrendingUp,
};

export default function AfterUndergradPage({ searchParams }: { searchParams?: { careerId?: string } }) {
  const careerId = searchParams?.careerId as keyof typeof growthPlansByCareer | undefined;

  const growthPlans = (careerId && growthPlansByCareer[careerId]) || defaultGrowthPlans;
  const savedSearches = (careerId && jobSearchesByCareer[careerId]) || defaultJobSearches;

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
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><RefreshCw/> Job-Switch Toolkit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild className="w-full" variant="outline"><Link href="/dashboard/resume-analyzer">Refresh Resume</Link></Button>
                    <Button className="w-full">Browse Market</Button>
                    <div className="pt-2">
                        <h4 className="font-semibold text-sm mb-2">Saved Searches</h4>
                        {savedSearches.map(search => (
                            <div key={search.role} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                <div>
                                    <p className="font-medium">{search.role}</p>
                                    <p className="text-xs text-muted-foreground">{search.location}</p>
                                </div>
                                <Button variant="ghost" size="sm">Run</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><School/> Higher-Ed & Abroad Guides</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-around">
                     <Button variant="outline">GRE Prep</Button>
                     <Button variant="outline">GMAT Prep</Button>
                     <Button variant="outline">IELTS Prep</Button>
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


"use client";

import { useEffect, useState } from "react";
import { getCareerDeepDive } from "@/ai/flows/career-deep-dive";
import { type CareerDeepDiveOutput } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, Wrench, TrendingUp, Users, CheckCircle, Lightbulb, ExternalLink } from "lucide-react";
import Link from 'next/link';

type CareerDeepDiveProps = {
  careerId: string;
  careerName: string;
};

const SectionCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-headline text-xl flex items-center gap-3">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

function CareerDeepDiveSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-32 w-full" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

export function CareerDeepDive({ careerId, careerName }: CareerDeepDiveProps) {
  const [data, setData] = useState<CareerDeepDiveOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await getCareerDeepDive({ careerName });
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "Could not load the career details. Please try again later.",
          });
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [careerId, careerName, toast]);

  if (loading) {
    return <CareerDeepDiveSkeleton />;
  }

  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p>Could not load career information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">An Introduction to {careerName}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg text-muted-foreground">{data.introduction}</p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard icon={<ClipboardList className="text-accent" />} title="What You'll Do">
          <ul className="space-y-3">
            {data.whatYouDo.map((task, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={<Wrench className="text-accent" />} title="Key Skills">
          <div className="flex flex-wrap gap-2">
            {data.keySkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1">{skill}</Badge>
            ))}
          </div>
        </SectionCard>
      </div>
      
      <SectionCard icon={<TrendingUp className="text-accent" />} title="Future Outlook">
        <p className="text-muted-foreground">{data.futureOutlook}</p>
      </SectionCard>
      
       <SectionCard icon={<Lightbulb className="text-accent" />} title="Suggested Courses">
          <div className="grid md:grid-cols-3 gap-4">
              {data.suggestedCourses.map((course, index) => (
                  <Card key={index} className="bg-muted/50">
                      <CardHeader>
                          <CardTitle className="text-base font-semibold">
                              {course.name}
                          </CardTitle>
                           <CardDescription>{course.platform}</CardDescription>
                      </CardHeader>
                      <CardContent>
                         <Link href="#" className="text-sm font-semibold text-accent hover:underline">
                            View Course <ExternalLink className="inline h-3 w-3 ml-1"/>
                         </Link>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </SectionCard>

      <SectionCard icon={<Users className="text-accent" />} title="Explore Related Careers">
        <div className="grid md:grid-cols-3 gap-4">
            {data.relatedCareers.map((career, index) => (
                <Card key={index} className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            {career.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{career.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </SectionCard>

    </div>
  );
}

    
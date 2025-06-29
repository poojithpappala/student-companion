
"use client";

import { useEffect, useState } from "react";
import { getCareerDeepDive } from "@/ai/flows/career-deep-dive";
import { type CareerDeepDiveOutput } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, Wrench, TrendingUp, Users, CheckCircle, Lightbulb } from "lucide-react";

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
        console.error("Failed to fetch career deep dive:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load the career details. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [careerId, careerName, toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
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
            <p className="text-muted-foreground">{data.introduction}</p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard icon={<ClipboardList className="text-accent" />} title="What You'll Do">
          <ul className="space-y-3">
            {data.whatYouDo.map((task, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
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
      
      <SectionCard icon={<Users className="text-accent" />} title="Explore Related Careers">
        <div className="grid md:grid-cols-3 gap-4">
            {data.relatedCareers.map((career, index) => (
                <Card key={index} className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Lightbulb className="text-yellow-500 h-5 w-5"/>
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

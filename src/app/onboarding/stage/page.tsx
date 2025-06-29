
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, School, Briefcase, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

const stages = [
  {
    icon: <Rocket className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />,
    title: 'Before Undergrad',
    description: "Exploring career options and preparing for college applications.",
    value: 'before',
  },
  {
    icon: <School className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />,
    title: 'During Undergrad',
    description: "A current student, looking for internships and building skills.",
    value: 'during',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />,
    title: 'After Undergrad',
    description: "A recent graduate seeking jobs or exploring further education.",
    value: 'after',
  },
];

export default function StageSelectionPage() {
  const router = useRouter();

  const handleSelectStage = async (stage: 'before' | 'during' | 'after') => {
      if (stage === 'before') {
        router.push('/dashboard/self-assessment');
      } else {
        router.push(`/onboarding/career?stage=${stage}`);
      }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="mb-6"><Logo /></div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">Which stage best describes you?</h1>
        <p className="mt-2 text-lg text-muted-foreground">This helps us personalize your entire journey.</p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
        {stages.map((stage, index) => (
          <Card 
            key={stage.title} 
            className="group flex flex-col justify-between text-center hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${100 * index}ms` }}
            onClick={() => handleSelectStage(stage.value as any)}
          >
            <CardContent className="p-8 flex flex-col items-center justify-center flex-grow">
              <div className="p-4 bg-primary/10 rounded-full group-hover:bg-accent/10 transition-colors mb-4">{stage.icon}</div>
              <CardTitle className="font-headline text-xl text-primary">{stage.title}</CardTitle>
              <CardDescription className="mt-2">{stage.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 bg-secondary/50">
              <span className="w-full text-sm font-semibold text-accent">
                  Choose this path <ArrowRight className="inline ml-2 h-4 w-4" />
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

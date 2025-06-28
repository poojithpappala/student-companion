import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, School, Briefcase, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

const stages = [
  {
    icon: <Rocket className="h-10 w-10 text-accent" />,
    title: 'Before Undergrad',
    description: "I'm exploring career options and preparing for college applications.",
    href: '/onboarding/career?stage=before',
  },
  {
    icon: <School className="h-10 w-10 text-accent" />,
    title: 'During Undergrad',
    description: "I'm currently a student, looking for internships and building skills.",
    href: '/onboarding/career?stage=during',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: 'After Undergrad',
    description: "I've graduated and am seeking jobs or further education.",
    href: '/onboarding/career?stage=after',
  },
];

export default function StageSelectionPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="text-center mb-10">
        <Logo />
        <h1 className="mt-6 font-headline text-3xl md:text-4xl font-bold text-primary">Which stage are you in?</h1>
        <p className="mt-2 text-lg text-muted-foreground">This helps us personalize your journey.</p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
        {stages.map((stage) => (
          <Card key={stage.title} className="group flex flex-col justify-between text-center hover:border-accent hover:shadow-xl transition-all duration-300">
            <CardHeader className="items-center">
              <div className="p-4 bg-accent/10 rounded-full">{stage.icon}</div>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-headline text-xl">{stage.title}</CardTitle>
              <CardDescription className="mt-2 min-h-[40px]">{stage.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent/90 hover:bg-accent text-accent-foreground">
                <Link href={stage.href}>
                  Select <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

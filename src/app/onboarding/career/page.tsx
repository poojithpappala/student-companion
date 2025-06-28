import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import { careers } from '@/lib/constants';

export default function CareerSelectionPage({ searchParams }: { searchParams: { stage: string } }) {
  const { stage } = searchParams;

  if (!stage) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <p>Invalid stage. Please go back and select your stage.</p>
        <Button asChild className="mt-4">
            <Link href="/onboarding/stage">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="text-center mb-10">
        <Logo />
        <h1 className="mt-6 font-headline text-3xl md:text-4xl font-bold text-primary">What's your career interest?</h1>
        <p className="mt-2 text-lg text-muted-foreground">This will help us tailor recommendations for you.</p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-2 md:grid-cols-4 gap-4">
        {careers.map((career) => {
          const Icon = career.icon;
          return (
            <Card key={career.id} className="group flex flex-col justify-between text-center hover:border-accent hover:shadow-xl transition-all duration-300">
                <CardHeader className="items-center pt-6">
                    <div className="p-4 bg-accent/10 rounded-full">
                        <Icon className="h-10 w-10 text-accent" />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center">
                    <CardTitle className="font-headline text-xl">{career.name}</CardTitle>
                    <CardDescription className="mt-1">{career.degree}</CardDescription>
                </CardContent>
                <CardFooter>
                <Button asChild className="w-full bg-accent/90 hover:bg-accent text-accent-foreground">
                    <Link href={`/dashboard/${stage}?careerId=${career.id}`}>
                    Select <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

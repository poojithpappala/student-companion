"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const years = [
  { value: '1st Year', title: '1st Year', description: 'Just getting started on my academic journey.' },
  { value: '2nd Year', title: '2nd Year', description: 'Building foundational skills and exploring options.' },
  { value: '3rd Year', title: '3rd Year', description: 'Focusing on internships and specialization.' },
  { value: 'Final Year', title: 'Final Year', description: 'Preparing for graduation and job applications.' },
];

function YearSelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stage = searchParams.get('stage');
    const careerId = searchParams.get('careerId');

    const handleSelectYear = (year: string) => {
        if (!stage || !careerId) {
            // Should not happen in normal flow, but as a fallback, go to the start.
            router.push('/onboarding/stage');
            return;
        }
        const params = new URLSearchParams({
            stage,
            careerId,
            year,
        });
        router.push(`/dashboard/during?${params.toString()}`);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4">
            <div className="text-center mb-10">
                <Logo />
                <h1 className="mt-6 font-headline text-3xl md:text-4xl font-bold text-primary">What year are you in?</h1>
                <p className="mt-2 text-lg text-muted-foreground">Let's customize your roadmap for your current stage.</p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {years.map((year) => (
                    <Card key={year.value} className="group flex flex-col justify-between text-center hover:border-accent hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{year.title}</CardTitle>
                            <CardDescription className="mt-2 min-h-[40px]">{year.description}</CardDescription>
                        </CardHeader>
                        <CardContent />
                        <CardFooter>
                            <Button onClick={() => handleSelectYear(year.value)} className="w-full bg-accent/90 hover:bg-accent text-accent-foreground">
                                Select <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function YearSelectionPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <YearSelectionContent />
        </Suspense>
    )
}

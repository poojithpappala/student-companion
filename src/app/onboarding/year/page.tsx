
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const years = [
  { value: '1st Year', title: '1st Year', description: 'Starting my academic journey, focused on foundations.' },
  { value: '2nd Year', title: '2nd Year', description: 'Building core skills and exploring different specializations.' },
  { value: '3rd Year', title: '3rd Year', description: 'Seeking internships and diving deep into my major.' },
  { value: 'Final Year', title: 'Final Year', description: 'Preparing for graduation and launching my career.' },
];

function YearSelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stage = searchParams.get('stage');
    const careerId = searchParams.get('careerId');
    const [selectedYear, setSelectedYear] = useState<string|null>(null);

    const handleSelectYear = (year: string) => {
        setSelectedYear(year);
        if (!stage || !careerId) {
            router.push('/onboarding/stage');
            return;
        }
        const params = new URLSearchParams({
            stage,
            careerId,
            year,
        });
        setTimeout(() => {
            router.push(`/dashboard/during?${params.toString()}`);
        }, 300);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
            <div className="text-center mb-10 animate-fade-in-up">
                <div className="mb-6"><Logo /></div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">What's Your Current Year?</h1>
                <p className="mt-2 text-lg text-muted-foreground">Let's customize your roadmap for where you are right now.</p>
            </div>
            <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {years.map((year, index) => {
                    const isSelected = selectedYear === year.value;
                    return (
                    <Card 
                      key={year.value} 
                      className="group flex flex-col text-center hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up cursor-pointer"
                      style={{ animationDelay: `${100 * index}ms` }}
                      onClick={() => handleSelectYear(year.value)}
                    >
                        <CardContent className="p-6 flex flex-col items-center justify-center flex-grow">
                            <CardTitle className="font-headline text-2xl text-primary">{year.title}</CardTitle>
                            <CardDescription className="mt-2 min-h-[60px]">{year.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-2">
                             <Button 
                                className="w-full"
                                variant={isSelected ? "default" : "secondary"}
                            >
                                {isSelected ? <Loader2 className="h-4 w-4 animate-spin" /> : "Select"}
                            </Button>
                        </CardFooter>
                    </Card>
                )})}
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

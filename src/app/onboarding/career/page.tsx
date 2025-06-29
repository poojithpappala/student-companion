"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { careers } from '@/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CareerSelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stage = searchParams.get('stage') || 'during';

    const handleSelectCareer = (careerId: string) => {
        // Corrected user flow: after selecting a career, go to year selection.
        router.push(`/onboarding/year?stage=${stage}&careerId=${careerId}`);
    };

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
                            <Button onClick={() => handleSelectCareer(career.id)} className="w-full bg-accent/90 hover:bg-accent text-accent-foreground">
                                Select <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default function CareerSelectionPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <CareerSelectionContent />
        </Suspense>
    )
}

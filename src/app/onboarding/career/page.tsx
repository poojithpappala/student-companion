
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { careers } from '@/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function CareerSelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stage = searchParams.get('stage') || 'during';
    const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);

    const handleSelectCareer = (careerId: string) => {
        setSelectedCareerId(careerId);
        const params = new URLSearchParams({ stage, careerId });
        // Add a slight delay to show selection before navigating
        setTimeout(() => {
            if (stage === 'during') {
                router.push(`/onboarding/year?${params.toString()}`);
            } else { // 'after' stage, skip year selection
                router.push(`/dashboard/after?${params.toString()}`);
            }
        }, 300);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
            <div className="text-center mb-10 animate-fade-in-up">
                <div className="mb-6"><Logo /></div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">What's Your Career Interest?</h1>
                <p className="mt-2 text-lg text-muted-foreground">This helps us tailor your personalized roadmap and resources.</p>
            </div>
            <div className="grid w-full max-w-5xl grid-cols-2 md:grid-cols-4 gap-6">
                {careers.map((career, index) => {
                    const Icon = career.icon;
                    const isSelected = selectedCareerId === career.id;
                    return (
                        <Card 
                          key={career.id} 
                          className="group flex flex-col text-center hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up cursor-pointer"
                          style={{ animationDelay: `${100 * index}ms` }}
                          onClick={() => handleSelectCareer(career.id)}
                        >
                            <CardContent className="p-6 flex flex-col items-center justify-center flex-grow">
                                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-accent/10 transition-colors mb-4">
                                    <Icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
                                </div>
                                <CardTitle className="font-headline text-lg">{career.name}</CardTitle>
                                <CardDescription className="mt-1 text-xs">{career.degree}</CardDescription>
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

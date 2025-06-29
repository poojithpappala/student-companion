
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

function AuthContent() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/onboarding/stage');
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-primary/5 [mask-image:radial-gradient(ellipse_at_top_left,transparent_20%,#000)]"></div>
             <div className="absolute bottom-0 right-0 w-full h-full bg-accent/5 [mask-image:radial-gradient(ellipse_at_bottom_right,transparent_20%,#000)]"></div>
            
            <div className="w-full max-w-md z-10">
                <Card className="shadow-2xl border-border/20 backdrop-blur-lg bg-card/80">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>
                        <CardTitle className="font-headline text-2xl text-primary">Welcome to Your Future</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Sign in to access your personalized career dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Button
                            onClick={handleSignIn}
                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md shadow-accent/20"
                            size="lg"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            By continuing, you agree to our Terms of Service.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthContent />
        </Suspense>
    )
}

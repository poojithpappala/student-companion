
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';

function AuthContent() {
    const router = useRouter();

    const handleSignIn = () => {
        // Simple navigation, no backend authentication
        router.push('/onboarding/stage');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>
                        <CardTitle className="font-headline text-2xl">Welcome</CardTitle>
                        <CardDescription>
                            Access your personalized career dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Button
                            onClick={handleSignIn}
                            className="w-full"
                            size="lg"
                        >
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
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

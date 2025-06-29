"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, BarChart, FileText, Briefcase } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: 'Lifecycle Dashboards',
      description: 'Personalized career guidance based on your academic stage.',
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'AI Resume Analyzer',
      description: 'Get instant feedback to craft the perfect, job-winning resume.',
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: 'Career Coach Chatbot',
      description: 'Your 24/7 AI companion for all your career questions.',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: 'Job & Internship Hub',
      description: 'Discover opportunities and track your applications seamlessly.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button variant="ghost" asChild>
           <Link href="/auth">Sign In</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up text-center md:text-left">
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
                Student Companion
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">
                Your career coach in your pocket.
              </p>
              <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-base md:text-lg text-foreground/80">
                An all-in-one student career platform with lifecycle-aware dashboards to guide you from classroom to career.
              </p>
              <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => router.push('/auth')}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="animate-fade-in-up [animation-delay:200ms]">
                <Image src="https://placehold.co/600x400/ECF0F1/34495E.png" alt="Dashboard preview" width={600} height={400} className="rounded-xl shadow-2xl" data-ai-hint="dashboard professional students" />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Powerful tools designed for every step of your career journey.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-background shadow-lg hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${200 * index}ms` }}>
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 font-headline text-xl font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <Logo isWhite />
          <p className="mt-4 text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} Student Companion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

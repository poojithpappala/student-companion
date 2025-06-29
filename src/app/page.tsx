
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Bot, FileText, Briefcase, Target, LayoutDashboard, Route, Quote } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
      title: 'Lifecycle Dashboards',
      description: "Personalized guidance whether you're in high school, college, or a recent grad.",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'AI Resume Analyzer',
      description: 'Get instant, detailed feedback to craft the perfect, job-winning resume.',
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: 'Career Coach Chatbot',
      description: 'Your 24/7 AI companion for all your career questions and interview prep.',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: 'Job & Internship Hub',
      description: 'Discover curated opportunities and track your applications seamlessly.',
    },
  ];

  const howItWorks = [
    {
        icon: <Target className="w-10 h-10 text-primary" />,
        title: "1. Take the Assessment",
        description: "Answer a few smart questions to help our AI understand your unique strengths, interests, and goals.",
    },
    {
        icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
        title: "2. Get Your Dashboard",
        description: "Unlock a personalized dashboard with a clear, AI-generated roadmap tailored to your specific career path.",
    },
    {
        icon: <Route className="w-10 h-10 text-primary" />,
        title: "3. Follow the Path",
        description: "Use our tools, track your progress, and follow your custom roadmap from your first class to your first job.",
    },
  ];

  const testimonials = [
    {
        quote: "This platform was a game-changer for my internship search. The resume analyzer alone is worth its weight in gold.",
        name: "Sarah J.",
        school: "UCLA, Computer Science",
    },
    {
        quote: "As a high school student, I had no idea where to start. Student Companion gave me a clear path and the confidence to pursue it.",
        name: "Michael B.",
        school: "High School Senior",
    },
    {
        quote: "The AI career coach helped me prep for my interviews and land my dream job right after graduation. I can't recommend it enough!",
        name: "Emily C.",
        school: "NYU, Marketing Graduate",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <Logo />
        <Button variant="ghost" asChild>
           <Link href="/auth">Sign In</Link>
        </Button>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up text-center md:text-left">
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
                Your Career Starts Here.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">
                The only platform you need to navigate your academic and professional journey.
              </p>
              <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-base md:text-lg text-foreground/80">
                Student Companion is an all-in-one career platform that uses AI to guide you from the classroom to your dream career. Get a personalized roadmap, expert tools, and real-time guidance.
              </p>
              <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => router.push('/auth')}>
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="animate-fade-in-up [animation-delay:200ms]">
                <Image src="https://placehold.co/600x400/ECF0F1/34495E.png" alt="Dashboard preview" width={600} height={400} className="rounded-xl shadow-2xl" data-ai-hint="dashboard professional students" />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">A Clear Path to Success</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Getting started is simple. Here’s how we turn your ambitions into achievements.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {howItWorks.map((step, index) => (
                        <div key={index} className="text-center flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${200 * index}ms` }}>
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                                {step.icon}
                            </div>
                            <h3 className="mt-6 font-headline text-xl font-semibold text-primary">{step.title}</h3>
                            <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Powerful AI tools designed for every step of your career journey.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-card shadow-lg hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${200 * index}ms` }}>
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

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Loved by Students Everywhere</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Don't just take our word for it. Here's what users are saying about us.
                </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="flex flex-col justify-between bg-background animate-fade-in-up" style={{ animationDelay: `${200 * index}ms` }}>
                        <CardHeader>
                            <Quote className="w-8 h-8 text-primary/20" />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <blockquote className="text-lg text-foreground font-medium">"{testimonial.quote}"</blockquote>
                        </CardContent>
                        <CardContent>
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.school}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Ready to Take Control of Your Future?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Join thousands of students who are building their dream careers with Student Companion.
                </p>
                <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => router.push('/auth')}>
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </section>

      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <div>
              <Logo isWhite />
              <p className="mt-2 text-sm text-primary-foreground/80">
                © {new Date().getFullYear()} Student Companion. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 mt-4 sm:mt-0">
                <Link href="#features" className="text-sm text-primary-foreground/80 hover:text-white">Features</Link>
                <Link href="#" className="text-sm text-primary-foreground/80 hover:text-white">Pricing</Link>
                <Link href="#" className="text-sm text-primary-foreground/80 hover:text-white">Contact</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

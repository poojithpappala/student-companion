
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Bot, FileText, Briefcase, Target, LayoutDashboard, Route, Quote, Compass, GraduationCap, Trophy, Lightbulb, Search, Wand2, Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stageFeatures = [
    {
      stage: 'High School',
      value: 'before',
      title: 'Navigate College Admissions with Confidence',
      description: 'Find your passion and the perfect university to kickstart your journey.',
      features: [
        { icon: Compass, title: 'AI Career Assessment', description: 'Discover career paths perfectly aligned with your personality and interests.' },
        { icon: GraduationCap, title: 'College Explorer', description: 'Get AI-driven recommendations for colleges that excel in your chosen field.' },
        { icon: Trophy, title: 'Entrance Exam Planner', description: 'Never miss a deadline for critical exams like the SAT, ACT, and more.' },
      ]
    },
    {
      stage: 'University',
      value: 'during',
      title: 'Build Skills and Gain Experience',
      description: 'Follow a personalized roadmap to build a standout profile for employers.',
      features: [
          { icon: Target, title: 'AI-Powered Roadmap', description: 'Receive a year-by-year plan with concrete steps to achieve your career goals.' },
          { icon: Briefcase, title: 'Internship & Job Boards', description: 'Access curated internship listings and job opportunities from top companies.' },
          { icon: Lightbulb, title: 'Project & Skill Building', description: 'Get practical project ideas and skill recommendations tailored to your industry.' },
      ]
    },
    {
      stage: 'Recent Grads',
      value: 'after',
      title: 'Launch Your Career and Succeed',
      description: 'Leverage powerful AI tools to ace your job search from application to negotiation.',
      features: [
          { icon: FileText, title: 'AI Resume Analyzer', description: 'Optimize your resume with instant, expert feedback to get past automated screeners.' },
          { icon: Wand2, title: 'Salary Negotiation Coach', description: 'Maximize your offer with AI-powered talking points and market data.' },
          { icon: Search, title: 'Job-Switch Toolkit', description: 'Seamlessly research companies, track applications, and find your next role.' },
      ]
    }
  ];

  const howItWorks = [
    {
        icon: <Target className="w-10 h-10 text-primary" />,
        title: "1. Discover Your Path",
        description: "Start with our AI-driven assessment to understand your unique strengths and find the career that's right for you.",
    },
    {
        icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
        title: "2. Get a Custom Plan",
        description: "Unlock a personalized dashboard featuring a step-by-step roadmap tailored to your specific goals and timeline.",
    },
    {
        icon: <Route className="w-10 h-10 text-primary" />,
        title: "3. Achieve Your Goals",
        description: "Use our integrated tools to build skills, track your progress, and confidently move from classroom to career.",
    },
  ];

  const testimonials = [
    {
        quote: "This platform was a game-changer. The AI career roadmap gave me a clear path, and the resume analyzer helped me land my first internship.",
        name: "Sarah J.",
        school: "UCLA, Computer Science",
        image: "https://placehold.co/100x100.png"
    },
    {
        quote: "As a high school student, I was completely lost. Student Companion helped me figure out what I wanted to do and which colleges to apply to. Invaluable!",
        name: "Michael B.",
        school: "High School Senior",
        image: "https://placehold.co/100x100.png"
    },
    {
        quote: "The salary negotiation coach is incredible. I was able to negotiate a 15% higher salary than my initial offer. I can't recommend it enough!",
        name: "Emily C.",
        school: "NYU, Marketing Graduate",
        image: "https://placehold.co/100x100.png"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-muted-foreground transition-colors hover:text-primary">How It Works</Link>
            <Link href="#testimonials" className="text-muted-foreground transition-colors hover:text-primary">Testimonials</Link>
        </nav>
        <div className="flex items-center gap-4">
            <Button asChild>
                <Link href="/auth">Sign In</Link>
            </Button>
            <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <div className="flex justify-start p-2">
                            <Logo />
                        </div>
                        <nav className="grid gap-6 text-lg font-medium mt-12 px-2">
                            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Features</Link>
                            <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">How It Works</Link>
                            <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Testimonials</Link>
                        </nav>
                         <div className="absolute bottom-10 left-6 right-6">
                            <Button asChild className="w-full" size="lg">
                                <Link href="/auth">Get Started Free</Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up text-center md:text-left">
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary leading-tight">
                Your Career Journey, <span className="text-accent">Intelligently Guided.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto md:mx-0">
                From classroom to career, Student Companion is the all-in-one AI platform that builds your personalized path to success.
              </p>
              <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20" onClick={() => router.push('/auth')}>
                Start Your Journey Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="animate-fade-in-up [animation-delay:200ms] relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary via-accent to-background rounded-2xl opacity-20 blur-2xl"></div>
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdHVkZW50c3xlbnwwfHx8fDE3NTExNzc0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="A student happily using the Student Companion dashboard on a laptop" width={600} height={400} className="rounded-xl shadow-2xl relative" data-ai-hint="student laptop professional" />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-24 bg-card border-y">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">A Clear Path to Success in 3 Steps</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        We turn career anxiety into a clear, actionable plan.
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

        {/* Features for Every Stage Section */}
        <section id="features" className="py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                      Tools for Every Step of Your Journey
                  </h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                      No matter where you are, we have the features to help you succeed.
                  </p>
                </div>
                <Tabs defaultValue="before" className="mt-12 w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
                        {stageFeatures.map(tab => (
                            <TabsTrigger key={tab.value} value={tab.value}>{tab.stage}</TabsTrigger>
                        ))}
                    </TabsList>

                    {stageFeatures.map(tab => (
                        <TabsContent key={tab.value} value={tab.value} className="mt-10">
                            <div className="text-center mb-10 max-w-3xl mx-auto">
                                <h3 className="font-headline text-2xl font-semibold text-primary">{tab.title}</h3>
                                <p className="mt-2 text-muted-foreground">{tab.description}</p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-3">
                                {tab.features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <Card key={index} className="text-left bg-card border shadow-lg hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${100 * index}ms` }}>
                                            <CardHeader className="flex flex-row items-center gap-4">
                                                <div className="p-3 bg-accent/10 rounded-lg">
                                                    <Icon className="w-6 h-6 text-accent" />
                                                </div>
                                                <h4 className="font-headline text-lg font-semibold text-primary">
                                                    {feature.title}
                                                </h4>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground text-sm">
                                                    {feature.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-card border-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Don't Just Take Our Word For It</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    See how we've helped students and graduates achieve their goals.
                </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="flex flex-col bg-background shadow-lg animate-fade-in-up" style={{ animationDelay: `${200 * index}ms` }}>
                        <CardContent className="pt-6 flex-grow">
                            <Quote className="w-8 h-8 text-primary/10 mb-4" />
                            <blockquote className="text-base text-foreground font-medium">"{testimonial.quote}"</blockquote>
                        </CardContent>
                        <CardHeader className="flex-row items-center gap-4 pt-4">
                           <Image className="rounded-full" src={testimonial.image} width={48} height={48} alt={`Photo of ${testimonial.name}`} data-ai-hint="person portrait" />
                           <div>
                              <p className="font-semibold text-primary">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.school}</p>
                           </div>
                        </CardHeader>
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
                <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20" onClick={() => router.push('/auth')}>
                    Sign Up Now - It's Free <ArrowRight className="ml-2 h-4 w-4" />
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
                <Link href="#" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">About Us</Link>
                <Link href="#" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Contact</Link>
                <Link href="#" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

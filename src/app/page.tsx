import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, BarChart, FileText, Briefcase } from 'lucide-react';
import { Logo } from '@/components/logo';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.591,44,29.891,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

export default function LandingPage() {
  const features = [
    {
      icon: <BarChart className="w-8 h-8 text-accent" />,
      title: 'Lifecycle Dashboards',
      description: 'Personalized career guidance based on your academic stage.',
    },
    {
      icon: <FileText className="w-8 h-8 text-accent" />,
      title: 'AI Resume Analyzer',
      description: 'Get instant feedback to craft the perfect, job-winning resume.',
    },
    {
      icon: <Bot className="w-8 h-8 text-accent" />,
      title: 'Career Coach Chatbot',
      description: 'Your 24/7 AI companion for all your career questions.',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-accent" />,
      title: 'Job & Internship Hub',
      description: 'Discover opportunities and track your applications seamlessly.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/onboarding/stage">
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
              Student Companion
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">
              Your career coach in your pocket.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-foreground/80">
              An all-in-one student career platform with lifecycle-aware dashboards to guide you from classroom to career.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/onboarding/stage">
                <GoogleIcon className="mr-2" />
                Sign In with Google
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white">
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
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className="p-4 bg-accent/10 rounded-full">
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
          <p className="mt-4 text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Student Companion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

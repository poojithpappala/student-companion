'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, BookOpen, Wrench, FolderKanban, Users, Briefcase } from 'lucide-react';
import { generateCareerRoadmap } from '@/ai/flows/career-roadmap';
import { CareerRoadmapInputSchema, type CareerRoadmapOutput } from '@/ai/schemas';
import { useToast } from '@/hooks/use-toast';
import type { ComponentType, LucideProps } from 'react';

const roadmapSchema = CareerRoadmapInputSchema.pick({
  interests: true,
  skills: true,
});

type CareerRoadmapProps = {
  careerId: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | 'Final Year';
};

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
    Academics: BookOpen,
    Skills: Wrench,
    Projects: FolderKanban,
    Networking: Users,
    Internships: Briefcase,
};

export function CareerRoadmap({ careerId, year }: CareerRoadmapProps) {
  const [roadmap, setRoadmap] = useState<CareerRoadmapOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof roadmapSchema>>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: { interests: '', skills: '' },
  });
  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof roadmapSchema>) {
    setRoadmap(null);
    try {
      const result = await generateCareerRoadmap({
        careerId,
        currentYear: year,
        interests: values.interests,
        skills: values.skills,
      });
      setRoadmap(result);
    } catch (error) {
      console.error("Roadmap generation failed:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating your roadmap. Please try again.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">AI-Powered Career Roadmap ({year})</CardTitle>
        <CardDescription>
          Enter your interests and skills to generate a personalized roadmap for your current academic year.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., building web apps, AI, competitive programming" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Current Skills</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., Python, JavaScript, Figma, public speaking" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : 'Generate My Roadmap'}
                </Button>
            </div>
          </form>
        </Form>
        
        <div className="pt-6">
            {isSubmitting && (
                <div className="flex flex-col items-center justify-center h-40">
                    <Loader2 className="w-10 h-10 animate-spin text-primary"/>
                    <p className="mt-4 text-muted-foreground">Building your personalized path...</p>
                </div>
            )}
            {roadmap?.roadmapItems && roadmap.roadmapItems.length > 0 ? (
              <div className="space-y-4">
                 <h3 className="text-lg font-semibold font-headline flex items-center gap-2 text-primary"><Sparkles className="text-accent" /> Your Personalized Steps</h3>
                {roadmap.roadmapItems.map((item, index) => {
                  const Icon = iconMap[item.category] || BookOpen;
                  return (
                    <div key={index} className="p-4 rounded-lg border flex items-start gap-4">
                        <div className="text-accent bg-accent/10 p-3 rounded-lg"><Icon /></div>
                        <div className="flex-grow">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">{item.category}</span>
                    </div>
                  );
                })}
              </div>
            ) : !isSubmitting && (
              <div className="text-center text-muted-foreground h-40 flex flex-col justify-center items-center">
                 <p>Your generated roadmap will appear here.</p>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

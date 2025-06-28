
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2, Lightbulb, Book, Paintbrush, FlaskConical, Atom } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { recommendCareer, CareerRecommendation } from "@/ai/flows/career-assessment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { careers } from "@/lib/constants";


const assessmentSchema = z.object({
  grade: z.string({ required_error: "Please select your grade." }),
  subjects: z.string().min(10, "Please list a few favorite subjects."),
  hobbies: z.string().min(10, "Please tell us about your hobbies."),
  personality: z.string().min(5, "Describe your personality in a few words."),
  workStyle: z.string().min(10, "Please describe your preferred work style."),
  ambition: z.string().min(10, "Please tell us about your future ambitions."),
});

export default function SelfAssessmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof assessmentSchema>>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      grade: "",
      subjects: "",
      hobbies: "",
      personality: "",
      workStyle: "",
      ambition: "",
    }
  });

  async function onSubmit(values: z.infer<typeof assessmentSchema>) {
    setIsSubmitting(true);
    setRecommendation(null);
    try {
      const result = await recommendCareer(values);
      setRecommendation(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Career assessment failed:", error);
      toast({
        variant: "destructive",
        title: "Assessment Failed",
        description: "There was an error generating your recommendation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (recommendation) {
        const params = new URLSearchParams({
            careerId: recommendation.recommendedCareerId,
            justification: recommendation.justification
        });
        router.push(`/dashboard/before?${params.toString()}`);
    }
  }

  const RecommendedIcon = recommendation ? careers.find(c => c.id === recommendation.recommendedCareerId)?.icon || Book : Book;


  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Wand2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl">Career Self-Assessment</CardTitle>
            <CardDescription className="text-base">Answer a few questions to let our AI find the best career path for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What grade are you in?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your current grade level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField control={form.control} name="subjects" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your favorite subjects in school?</FormLabel>
                    <FormControl><Textarea {...field} placeholder="e.g., Math, Physics, History, Art..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="hobbies" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you do for fun? (Hobbies & Interests)</FormLabel>
                    <FormControl><Textarea {...field} placeholder="e.g., Playing video games, coding, painting, reading books, playing sports..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="personality" render={({ field }) => (
                  <FormItem>
                    <FormLabel>How would you describe your personality?</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Creative, analytical, enjoy teamwork, prefer working alone..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="workStyle" render={({ field }) => (
                    <FormItem>
                        <FormLabel>How do you like to work?</FormLabel>
                        <FormControl><Textarea {...field} placeholder="e.g., Solving complex puzzles, collaborating with a team, working with my hands, expressing creativity..." /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="ambition" render={({ field }) => (
                    <FormItem>
                        <FormLabel>What kind of impact do you want to make?</FormLabel>
                        <FormControl><Textarea {...field} placeholder="e.g., Build useful technology, help people stay healthy, create beautiful art, start my own business..." /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                    </>
                  ) : "Find My Career"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <RecommendedIcon className="h-8 w-8 text-accent" />
            </div>
            <AlertDialogTitle className="text-center font-headline text-2xl">
                Your Recommended Career Path is {recommendation ? careers.find(c => c.id === recommendation.recommendedCareerId)?.name : ''}!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base py-4">
              {recommendation?.justification}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleModalClose} className="w-full">
                Go to My Personalized Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

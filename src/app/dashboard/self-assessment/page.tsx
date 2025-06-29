
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
import { Loader2, Wand2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { recommendCareer } from "@/ai/flows/career-assessment";
import { CareerAssessmentInputSchema, type CareerRecommendation } from "@/ai/schemas";
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


const assessmentSchema = CareerAssessmentInputSchema;

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

  const RecommendedIcon = recommendation ? careers.find(c => c.id === recommendation.recommendedCareerId)?.icon : Wand2;

  return (
    <>
      <div className="w-full max-w-3xl my-8 animate-fade-in-up">
        <Card>
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Wand2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl text-primary">AI Career Self-Assessment</CardTitle>
            <CardDescription className="text-base">Answer a few simple questions to let our AI find the best career path for you.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <FormField control={form.control} name="personality" render={({ field }) => (
                    <FormItem>
                    <FormLabel>How would you describe your personality?</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Creative, analytical, team player..." /></FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
                </div>
                
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
                    <FormControl><Textarea {...field} placeholder="e.g., Playing video games, coding, painting, sports..." /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />

                <FormField control={form.control} name="workStyle" render={({ field }) => (
                    <FormItem>
                        <FormLabel>What kind of work environment do you prefer?</FormLabel>
                        <FormControl><Textarea {...field} placeholder="e.g., Solving complex puzzles, collaborating, working with my hands..." /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="ambition" render={({ field }) => (
                    <FormItem>
                        <FormLabel>What kind of impact do you want to make in the world?</FormLabel>
                        <FormControl><Textarea {...field} placeholder="e.g., Build useful technology, help people stay healthy, create art..." /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="pt-4">
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Your Profile...
                    </>
                    ) : (
                    <>
                        <Wand2 className="mr-2 h-4 w-4" /> Find My Career Path
                    </>
                    )}
                </Button>
                </div>
            </form>
            </Form>
        </CardContent>
        </Card>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                {recommendation && <RecommendedIcon className="h-8 w-8 text-accent" />}
            </div>
            <AlertDialogTitle className="text-center font-headline text-2xl">
                Your AI-Recommended Career is... {recommendation ? careers.find(c => c.id === recommendation.recommendedCareerId)?.name : ''}!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base py-4">
              {recommendation?.justification}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleModalClose} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                View My Personalized Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

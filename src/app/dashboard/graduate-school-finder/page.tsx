
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, GraduationCap, University, BookOpen, ExternalLink } from "lucide-react";
import { findGraduatePrograms } from "@/ai/flows/graduate-school-finder";
import { GraduateSchoolFinderInputSchema, type GraduateSchoolFinderOutput } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";

const prepResources = [
    { name: 'GRE', description: 'For most graduate schools in the US and Canada.' },
    { name: 'GMAT', description: 'For business and management programs (MBA).' },
    { name: 'IELTS', description: 'English proficiency test for international study.' },
    { name: 'TOEFL', description: 'Another common English proficiency test.' },
];

function ProgramCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-5 w-2/3 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
      </CardContent>
    </Card>
  );
}

export default function GraduateSchoolFinderPage() {
  const [result, setResult] = useState<GraduateSchoolFinderOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof GraduateSchoolFinderInputSchema>>({
    resolver: zodResolver(GraduateSchoolFinderInputSchema),
    defaultValues: { fieldOfStudy: "", degreeType: "Master's", countryPreference: "USA" },
  });
  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof GraduateSchoolFinderInputSchema>) {
    setResult(null);
    try {
      const response = await findGraduatePrograms(values);
      setResult(response);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Search Failed",
          description: error.message || "There was an error finding programs. Please try again.",
        });
      }
    }
  }

  return (
    <div className="w-full grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-primary"><GraduationCap /> Graduate School Finder</CardTitle>
            <CardDescription>Discover top-tier graduate programs tailored to your goals.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="fieldOfStudy" render={({ field }) => (
                  <FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input {...field} placeholder="e.g., Computer Science" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="degreeType" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Degree Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Master's">Master's</SelectItem>
                                <SelectItem value="PhD">PhD</SelectItem>
                                <SelectItem value="Any">Any</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="countryPreference" render={({ field }) => (
                  <FormItem><FormLabel>Country Preference</FormLabel><FormControl><Input {...field} placeholder="e.g., USA, UK, any" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...</> : <><Search className="mr-2 h-4 w-4" /> Find Programs</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-primary"><BookOpen/> Exam Prep Resources</CardTitle>
                <CardDescription>Links and info for common entrance exams.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {prepResources.map(res => (
                    <div key={res.name} className="p-3 rounded-lg border bg-secondary/50">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">{res.name}</h4>
                                <p className="text-sm text-muted-foreground">{res.description}</p>
                            </div>
                             <Button variant="outline" size="sm" asChild><Link href="#" target="_blank">Learn More</Link></Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline text-primary">AI-Powered Recommendations</CardTitle>
            <CardDescription>Here are the top programs our AI advisor found for you.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitting ? (
              <div className="space-y-4">
                <ProgramCardSkeleton />
                <ProgramCardSkeleton />
                <ProgramCardSkeleton />
              </div>
            ) : result?.programs && result.programs.length > 0 ? (
              <div className="space-y-4">
                {result.programs.map((prog, index) => (
                   <Card key={index} className="bg-card">
                     <CardHeader>
                       <CardTitle className="text-lg flex items-center gap-3"><University className="text-accent h-6 w-6" />{prog.universityName}</CardTitle>
                       <CardDescription>{prog.location}</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <h4 className="font-semibold">{prog.programName}</h4>
                        <p className="text-sm text-muted-foreground mt-2">{prog.reason}</p>
                     </CardContent>
                   </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-20 flex flex-col justify-center items-center">
                <GraduationCap className="w-16 h-16 mb-4 text-primary/30" />
                <p className="text-lg font-medium">Your recommended programs will appear here.</p>
                <p className="text-sm">Fill out the form to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    

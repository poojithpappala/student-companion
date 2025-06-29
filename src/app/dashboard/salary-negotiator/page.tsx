
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2, Lightbulb, TrendingUp, Goal, Smile, BadgeCent } from "lucide-react";
import { salaryNegotiationCoach } from "@/ai/flows/salary-negotiation-coach";
import { SalaryNegotiationInputSchema, type SalaryNegotiationOutput } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

const negotiationSchema = SalaryNegotiationInputSchema;

function PlaybookSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}

export default function SalaryNegotiatorPage() {
  const [result, setResult] = useState<SalaryNegotiationOutput | null>(null);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof negotiationSchema>>({
    resolver: zodResolver(negotiationSchema),
    defaultValues: {
        jobTitle: '',
        companyName: '',
        location: '',
        benefits: '',
        strengths: '',
        otherOffers: '',
        yearsOfExperience: 0,
        baseSalary: undefined,
        desiredSalary: undefined,
    }
  });
  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof negotiationSchema>) {
    setResult(null);
    try {
      const response = await salaryNegotiationCoach(values);
      setResult(response);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: error.message || "There was an error generating your negotiation plan. Please try again.",
        });
      }
    }
  }

  const resultSections = result ? [
    { id: 'strategy', title: 'Negotiation Strategy', icon: <Wand2/>, content: result.negotiationStrategy },
    { id: 'justification', title: 'Justification Points', icon: <Goal/>, content: result.justificationPoints },
    { id: 'market', title: 'Market Data', icon: <TrendingUp/>, content: result.marketData },
    { id: 'counter', title: 'Counter-Offer Suggestions', icon: <Lightbulb/>, content: result.counterOfferSuggestions },
    { id: 'confidence', title: 'Confidence Boost', icon: <Smile/>, content: result.confidenceBoost },
  ] : [];

  return (
    <div className="w-full grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary flex items-center gap-2"><BadgeCent/>Salary Negotiation Coach</CardTitle>
            <CardDescription>Enter your offer details to get a personalized AI negotiation plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="jobTitle" render={({ field }) => (
                    <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="baseSalary" render={({ field }) => (
                    <FormItem><FormLabel>Offered Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="desiredSalary" render={({ field }) => (
                    <FormItem><FormLabel>Desired Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} placeholder="City, State"/></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
                    <FormItem><FormLabel>Years of Exp.</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="benefits" render={({ field }) => (
                  <FormItem><FormLabel>Benefits Package</FormLabel><FormControl><Textarea {...field} rows={2} placeholder="e.g., Health insurance, 401k match..." /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="strengths" render={({ field }) => (
                  <FormItem><FormLabel>Your Key Strengths</FormLabel><FormControl><Textarea {...field} rows={2} placeholder="e.g., Accomplishments, relevant skills..."/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="otherOffers" render={({ field }) => (
                  <FormItem><FormLabel>Other Offers (optional)</FormLabel><FormControl><Textarea {...field} rows={2} placeholder="e.g., Competing offers, details..." /></FormControl><FormMessage /></FormItem>
                )} />

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</> : "Get My Strategy"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline text-primary">Your Negotiation Playbook</CardTitle>
            <CardDescription>Follow these AI-generated steps to maximize your offer.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitting ? (
              <PlaybookSkeleton />
            ) : result ? (
              <Accordion type="single" collapsible defaultValue="strategy" className="w-full">
                {resultSections.map(section => (
                   <AccordionItem key={section.id} value={section.id}>
                     <AccordionTrigger className="text-lg font-semibold font-headline hover:no-underline">
                       <div className="flex items-center gap-3 text-primary">
                         <span className="text-accent">{section.icon}</span>{section.title}
                       </div>
                     </AccordionTrigger>
                     <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-sans p-4 bg-secondary/30 rounded-b-lg">
                       {section.content}
                     </AccordionContent>
                   </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center text-muted-foreground py-20 flex flex-col justify-center items-center">
                <Wand2 className="w-12 h-12 mb-4 text-primary/30" />
                 <p className="text-lg font-medium">Your personalized strategy will appear here.</p>
                <p className="text-sm">Fill out the form to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    

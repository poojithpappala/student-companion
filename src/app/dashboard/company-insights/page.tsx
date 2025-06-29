
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Building2 } from "lucide-react";
import { getCompanyInsights } from "@/ai/flows/company-insights";
import { CompanyInsightsInputSchema, type CompanyInsightsOutput } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const insightsSchema = CompanyInsightsInputSchema;

function CompanyInsightsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-4/6 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3 rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function CompanyInsightsPage() {
  const [insights, setInsights] = useState<CompanyInsightsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insightsSchema>>({
    resolver: zodResolver(insightsSchema),
    defaultValues: { companyName: "" },
  });
  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof insightsSchema>) {
    setInsights(null);
    try {
      const result = await getCompanyInsights({ companyName: values.companyName });
      setInsights(result);
    } catch (error) {
      console.error("Company insights generation failed:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error getting insights for this company. Please try again.",
      });
    }
  }

  return (
    <div className="w-full grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Building2 className="text-primary"/>Company Insights</CardTitle>
            <CardDescription>Get AI-powered insights on a company's culture, interview process, and more.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Google, Microsoft" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Researching...
                    </>
                  ) : "Get Insights"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-[30rem]">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent" /> AI Research Report</CardTitle>
            <CardDescription>Here's what our AI career researcher found for {form.getValues('companyName') || '...'}</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitting ? (
                <CompanyInsightsSkeleton />
            ) : insights ? (
              <div className="prose prose-sm dark:prose-invert max-w-none font-sans" dangerouslySetInnerHTML={{ __html: insights.report }}>
              </div>
            ) : (
              <div className="text-center text-muted-foreground h-64 flex flex-col justify-center items-center">
                <Building2 className="w-12 h-12 mb-4" />
                <p>Company insights will appear here once you search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

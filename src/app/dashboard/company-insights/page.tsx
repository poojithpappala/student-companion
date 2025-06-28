
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
import { getCompanyInsights, CompanyInsightsOutput } from "@/ai/flows/company-insights";
import { useToast } from "@/hooks/use-toast";

const insightsSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
});

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
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Company Insights</CardTitle>
            <CardDescription>Enter a company name to get AI-powered insights on its culture, interview process, and more.</CardDescription>
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
                <Button type="submit" className="w-full" disabled={isSubmitting}>
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

      <div className="md:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent" /> Research Report</CardTitle>
            <CardDescription>Here's what our AI career researcher found.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitting && (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                    <p className="mt-4 text-muted-foreground">Gathering intel, please wait...</p>
                </div>
            )}
            {insights ? (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-sans" dangerouslySetInnerHTML={{ __html: insights.report.replace(/\n/g, '<br />') }}>
              </div>
            ) : !isSubmitting && (
              <div className="text-center text-muted-foreground h-64 flex flex-col justify-center items-center">
                <Building2 className="w-12 h-12 mb-4" />
                <p>Company insights will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

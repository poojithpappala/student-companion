
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud, FileText, Sparkles, Star, ListChecks } from "lucide-react";
import { analyzeResume } from "@/ai/flows/resume-analyzer";
import { type AnalyzeResumeOutput } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const resumeSchema = z.object({
  resume: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Resume file is required.")
    .refine((files) => files?.[0]?.type === "application/pdf", "Only PDF files are accepted.")
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "File size should be less than 5MB."),
});

const fileToDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function ResumeAnalyzerPage() {
  const [analysis, setAnalysis] = useState<AnalyzeResumeOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
  });
  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof resumeSchema>) {
    setAnalysis(null);
    try {
      const file = values.resume[0];
      const resumeDataUri = await fileToDataURI(file);
      const result = await analyzeResume({ resumeDataUri });
      setAnalysis(result);
    } catch (error) {
      console.error("Resume analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
      });
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analyze Your Resume</CardTitle>
            <CardDescription>Upload your resume (PDF, max 5MB) to get AI-powered feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="resume-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
                      >
                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                            {fileName ? (
                                <>
                                    <FileText className="w-8 h-8 text-primary" />
                                    <p className="text-sm text-primary font-semibold mt-1">{fileName}</p>
                                </>
                            ) : (
                                <>
                                    <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PDF (MAX. 5MB)</p>
                                </>
                            )}
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                            id="resume-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => {
                                field.onChange(e.target.files);
                                if (e.target.files && e.target.files[0]) {
                                    setFileName(e.target.files[0].name);
                                } else {
                                    setFileName(null);
                                }
                            }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                    </>
                  ) : "Analyze Resume"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent" /> Analysis & Feedback</CardTitle>
            <CardDescription>Here's what our AI coach suggests for improving your resume.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitting && (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                    <p className="mt-4 text-muted-foreground">Analyzing, please wait...</p>
                </div>
            )}
            {analysis ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline font-semibold flex items-center gap-3 mb-2 text-lg">
                      <Star className="text-accent"/> Overall Score: {analysis.overallScore} / 100
                  </h3>
                  <Progress value={analysis.overallScore} className="w-full" />
                </div>
                
                <p className="text-muted-foreground italic border-l-4 border-accent pl-4 py-2">"{analysis.firstImpression}"</p>
                
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{analysis.summary}</p>
                    </CardContent>
                </Card>

                <div>
                    <h3 className="text-lg font-headline font-semibold mb-3 flex items-center gap-2"><ListChecks /> Actionable Tips</h3>
                    <ul className="space-y-3">
                        {analysis.actionableTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                                <div className="mt-1 w-4 h-4 text-accent"><Sparkles className="w-4 h-4"/></div>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
        
                <div>
                    <h3 className="text-lg font-headline font-semibold mb-2 mt-4">Section-by-Section Analysis</h3>
                    <Accordion type="single" collapsible className="w-full">
                        {analysis.sectionBySectionFeedback.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <span className="font-semibold">{item.section}</span>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="font-bold">{item.score}/10</span>
                                            <Progress value={item.score * 10} className="w-24 h-2" />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="prose prose-sm dark:prose-invert max-w-none font-sans whitespace-pre-wrap">
                                  {item.feedback}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            ) : !isSubmitting && (
              <div className="text-center text-muted-foreground h-64 flex flex-col justify-center items-center">
                <FileText className="w-12 h-12 mb-4" />
                <p>Your detailed resume feedback will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

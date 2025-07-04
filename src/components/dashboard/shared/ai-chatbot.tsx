
"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { aiCareerCoachChatbot } from "@/ai/flows/ai-career-coach-chatbot";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const chatSchema = z.object({
  question: z.string().min(1, "Message cannot be empty"),
});

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

function ChatbotContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm your AI Career Coach. Ask me anything about your career path, skills, or job search.",
      sender: "bot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage') || 'during';
  const careerId = searchParams.get('careerId') || undefined;
  const year = searchParams.get('year') || undefined;

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: { question: "" },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const onSubmit = async (values: z.infer<typeof chatSchema>) => {
    const userMessage: Message = { id: Date.now().toString(), text: values.question, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();
    setIsTyping(true);

    try {
      const response = await aiCareerCoachChatbot({
        question: values.question,
        stage,
        careerId,
        year,
      });
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.answer, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessageText = error instanceof Error ? error.message : "Sorry, I'm having trouble connecting. Please try again later.";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessageText,
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
          variant: "destructive",
          title: "Chatbot Error",
          description: errorMessageText,
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-20 bg-accent hover:bg-accent/90 text-accent-foreground"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Career Coach"
      >
        <Bot className="h-8 w-8" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col w-full sm:max-w-lg p-0">
          <SheetHeader className="p-6">
            <SheetTitle className="font-headline flex items-center gap-2 text-primary">
              <Bot /> AI Career Coach
            </SheetTitle>
            <SheetDescription>
              Your 24/7 AI companion for all your career questions.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-hidden bg-secondary/30">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4 py-4 px-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-3 w-full",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8">
                         <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-xs md:max-w-md rounded-lg p-3 text-sm shadow-md",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-background text-foreground rounded-bl-none"
                      )}
                    >
                      {message.text}
                    </div>
                     {message.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                   <div className="flex items-start gap-3 justify-start">
                     <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5" /></AvatarFallback>
                     </Avatar>
                     <div className="bg-background text-muted-foreground rounded-lg p-3 shadow-md rounded-bl-none">
                       <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse delay-0" />
                          <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse delay-150" />
                          <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse delay-300" />
                       </div>
                     </div>
                   </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <SheetFooter className="p-4 border-t bg-background">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center gap-2">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input {...field} placeholder="Ask me anything..." autoComplete="off" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="icon" disabled={isTyping} className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function AiChatbot() {
    return (
        <Suspense fallback={<Button className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-20" size="icon" disabled><Loader2 className="h-8 w-8 animate-spin" /></Button>}>
            <ChatbotContent/>
        </Suspense>
    )
}

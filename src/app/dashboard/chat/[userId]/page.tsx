
"use client";

import { useChatHistory } from '@/hooks/use-chat-history';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function ChatPage() {
    const pathname = usePathname();
    const userId = pathname.split('/').pop() || null;
    const { chatHistory } = useChatHistory(userId);

    if (!chatHistory) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4">Loading chat...</p>
            </div>
        );
    }

    const otherUserAvatar = chatHistory.userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop';

    return (
        <div className="w-full max-w-3xl mx-auto">
            <Card className="flex flex-col h-[calc(100vh-10rem)]">
                <CardHeader className="flex flex-row items-center gap-4 border-b">
                    <Avatar>
                        <AvatarImage src={otherUserAvatar} alt={chatHistory.userName} data-ai-hint="person face" />
                        <AvatarFallback>{chatHistory.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline text-primary">{chatHistory.userName}</CardTitle>
                        <CardDescription>Mock Chat Interface</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-4">
                            {chatHistory.messages.map(message => (
                                <div key={message.id} className={cn("flex items-end gap-2", message.sender === 'Me' ? "justify-end" : "justify-start")}>
                                    {message.sender !== 'Me' && <Avatar className="h-8 w-8"><AvatarImage src={otherUserAvatar} alt={message.sender} data-ai-hint="person face" /><AvatarFallback>{message.sender.charAt(0)}</AvatarFallback></Avatar>}
                                    <div className={cn(
                                        "max-w-md rounded-lg p-3 text-sm shadow",
                                        message.sender === 'Me' 
                                            ? "bg-primary text-primary-foreground rounded-br-none" 
                                            : "bg-background text-foreground rounded-bl-none"
                                    )}>
                                        <p>{message.text}</p>
                                        <p className={cn("text-xs mt-1", message.sender === 'Me' ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    {message.sender === 'Me' && <Avatar className="h-8 w-8"><AvatarFallback>M</AvatarFallback></Avatar>}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t">
                    <form className="w-full flex items-center gap-2">
                        <Input placeholder="Type a message... (stub)" disabled />
                        <Button size="icon" disabled><Send className="h-4 w-4" /></Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}

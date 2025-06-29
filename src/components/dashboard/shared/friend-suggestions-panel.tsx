
"use client";

import { useFriendSuggestions } from "@/hooks/use-friend-suggestions";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FriendCard } from "@/components/dashboard/connect/friend-card";
import { UserPlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FriendSuggestionsPanel() {
    const { suggestions } = useFriendSuggestions();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                   <UserPlus className="h-5 w-5 text-primary" />
                    People You May Know
                </CardTitle>
                 <CardDescription className="text-xs">Based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    <div className="space-y-4 pr-4">
                        {suggestions.map((suggestion, index) => (
                            <FriendCard key={suggestion.id} suggestion={suggestion} animationDelay={index * 0.1} />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

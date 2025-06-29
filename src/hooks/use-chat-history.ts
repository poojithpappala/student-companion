
import chatData from '@/lib/stubs/chat-history.json';
import { useState, useEffect } from 'react';

type Message = {
    id: string;
    sender: string;
    text: string;
    timestamp: string;
};

type ChatHistory = {
    userId: string;
    userName: string;
    userAvatar?: string;
    messages: Message[];
};

export function useChatHistory(userId: string | null) {
    const [chatHistory, setChatHistory] = useState<ChatHistory | null>(null);

    useEffect(() => {
        if (userId) {
            // In a real app, this would fetch chat history for the given userId.
            const history = chatData.find(chat => chat.userId === userId);
            setChatHistory(history || { userId, userName: `User ${userId}`, messages: [] });
        }
    }, [userId]);

    return { chatHistory };
}

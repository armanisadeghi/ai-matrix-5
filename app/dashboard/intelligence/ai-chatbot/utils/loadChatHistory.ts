// app/dashboard/intelligence/ai-chatbot/utils/loadChatHistory.ts

import { useAtom } from 'jotai';
import { promptDataAtom } from "@/app/dashboard/intelligence/ai-chatbot/store/promptDataAtom";
import { PromptData } from "@/types";
import axios from 'axios';
import { ChatHistoryChat } from "@/types";

interface UserContext {
    userId: string;
    isAuthenticated: boolean;
    userToken: string;
}

export const loadChatHistory = async (
    userId: string,
    userContext: UserContext,
    setPromptData: (update: PromptData | ((prev: PromptData) => PromptData)) => void // Correctly type the setter function
): Promise<any> => {
    try {
        const response = await axios.get(`/api/chat-history?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${userContext.userToken}`,
                'X-Custom-Origin': window.location.origin
            }
        });

        const data = response.data;
        const chatHistory: ChatHistoryChat[] = data.chatHistory.map((chat: any) => ({
            id: chat.messageId,
            role: chat.role,
            content: chat.content
        }));

        // Update the atom with the new chat history
        setPromptData(prev => ({
            ...prev,
            chatId: data.chatId,
            chatHistory: chatHistory
        }));

        return {
            userId: data.userId,
            chatHistory
        };
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return {};
    }
};

// app/samples/trial-chat/components/chatService.ts

import { MessageEntry, RoleType } from '@/org/types/chatData';
import openAiStream from "@/app/api/chat/route";

export const submitChatRequest = (
    updatedChat: MessageEntry[],
    responseCount: number,
    updateCallback: (message: MessageEntry) => void
): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Transform the updatedChat into the format required by openAiStream
            const messages = updatedChat.map(chat => ({
                role: chat.role as 'system' | 'user' | 'assistant',
                content: chat.text
            }));

            await openAiStream(messages, (chunk) => {
                const assistantMessage: MessageEntry = {
                    text: chunk,
                    role: 'assistant' as RoleType,
                };
                updateCallback(assistantMessage);
            });

            resolve();
        } catch (error) {
            console.error('Error during OpenAI stream:', error);
            reject(error);
        }
    });
};

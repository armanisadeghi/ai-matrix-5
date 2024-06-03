// app/samples/trial-chat/components/chatService.ts

import { MessageEntry, RoleType } from '@/armaniLocal/org/types/chatData';
import { OpenAiStream } from "@/app/api/openai/route";

export const submitChatRequest = (
    updatedChat: MessageEntry[],
    updateCallback: (message: MessageEntry) => void,
    finalizeCallback: (message: MessageEntry) => void
): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(updatedChat)) {
                throw new Error('updatedChat should be an array');
            }

            const messages = updatedChat.map(chat => ({
                role: chat.role as 'system' | 'user' | 'assistant',
                content: chat.text
            }));

            let assistantMessage: MessageEntry = { text: '', role: 'assistant' as RoleType };

            await OpenAiStream(messages, (chunk) => {
                assistantMessage.text += chunk;
                updateCallback({ ...assistantMessage });
            });

            finalizeCallback(assistantMessage);
            resolve();
        } catch (error) {
            console.error('Error during OpenAI stream:', error);
            reject(error);
        }
    });
};

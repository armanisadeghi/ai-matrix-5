// app/samples/ai-tests/shared/services/SteamOpenAi.ts

import { OpenAiStream } from "@/app/api/openai/route";
import { MessageEntry } from '@/app/samples/chats/shared/types/chatData';
import { assistantTextStreamAtom } from '@/state/aiAtoms/aiChatAtoms';
import { Role } from '@/types';
import { useRecoilState } from "recoil";

export const submitChatRequest = ( updatedChat: MessageEntry[], updateCallback: (message: string) => void, finalizeCallback: (message: MessageEntry) => void): Promise<void> => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    console.log('app/samples/ai-tests/shared/services/SteamOpenAi.ts submitChatRequest')

    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(updatedChat)) {
                throw new Error('updatedChat should be an array');
            }

            const messages = updatedChat.map(chat => ({
                role: chat.role as 'system' | 'user' | 'assistant',
                content: chat.text
            }));

            let assistantMessage: string = '';

            await OpenAiStream(messages, (chunk) => {
                assistantMessage += chunk;
                updateCallback(chunk);
            });

            const fullResponse: MessageEntry = { text: assistantMessage, role: 'assistant' };
            finalizeCallback(fullResponse);
            resolve();
        } catch (error) {
            console.error('Error during OpenAI stream:', error);
            reject(error);
        }
    });
};


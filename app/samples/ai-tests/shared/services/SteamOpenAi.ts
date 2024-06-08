// app/samples/ai-tests/shared/services/SteamOpenAi.ts

import { MessageEntry, Role } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";
import { useRecoilState } from "recoil";
import { assistantTextStreamAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";

export const submitChatRequest = ( updatedChat: MessageEntry[], updateCallback: (message: string) => void, finalizeCallback: (message: MessageEntry) => void): Promise<void> => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);

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

            const fullResponse: MessageEntry = { text: assistantMessage, role: 'assistant' as Role };
            finalizeCallback(fullResponse);
            resolve();
        } catch (error) {
            console.error('Error during OpenAI stream:', error);
            reject(error);
        }
    });
};


/*

------------------- Call Signature:

submitChatRequest(
    updatedChat: MessageEntry[],
    updateCallback: (message: string) => void,
    finalizeCallback: (message: MessageEntry) => void
): Promise<void>


------------------- Sample Usage:
const updatedChat: MessageEntry[] = [
    { text: 'Hello', role: 'user' },
    { text: 'How can I assist you today?', role: 'system' }
];

const updateCallback = (message: string) => {
    console.log('Updating message:', message);
    // Update the UI with the new message chunk
};

const finalizeCallback = (message: MessageEntry) => {
    console.log('Final message:', message);
    // Finalize the message in the UI
};

submitChatRequest(updatedChat, updateCallback, finalizeCallback)
    .then(() => {
        console.log('Chat request completed successfully');
    })
    .catch(error => {
        console.error('Chat request failed:', error);
    });

 */

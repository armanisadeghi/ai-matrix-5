// app/samples/trial-chat/components/SteamOpenAi.ts

import { MessageEntry, RoleType } from '@/types/chat';
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



/*

------------------- Call Signature:

submitChatRequest(
    updatedChat: MessageEntry[],
    updateCallback: (message: MessageEntry) => void,
    finalizeCallback: (message: MessageEntry) => void
): Promise<void>


------------------- Sample Usage:
const updatedChat: MessageEntry[] = [
    { text: 'Hello', role: 'user' },
    { text: 'How can I assist you today?', role: 'system' }
];

const updateCallback = (message: MessageEntry) => {
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


------------------- Updating Recoil Atom After Streaming:

import { useSetRecoilState } from 'recoil';
import { activeChatArrayState } from '@/context/atoms/chatAtoms';

const setActiveChatArray = useSetRecoilState(activeChatArrayState);

const finalizeCallback = (message: MessageEntry) => {
    console.log('Final message:', message);
    // Update the Recoil state
    setActiveChatArray(prev => [...prev, message]);
};


 */
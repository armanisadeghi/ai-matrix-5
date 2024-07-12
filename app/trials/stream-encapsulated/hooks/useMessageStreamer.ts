import { activeChatMessagesArrayAtom, hasSubmittedMessageAtom, messagesFamily, streamTriggerAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import { useState, useEffect } from 'react';
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const messagePackageSelector = selector<MessageType | null>({
    key: 'messagePackageSelector',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) return null;

        const messageArray = get(messagesFamily(activeChatId));
        if (!messageArray) return null;

        const newMessageEntry: MessageType = {
            chatId: activeChatId,
            role: 'assistant',
            index: messageArray.length,
            text: '',
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        };
        return newMessageEntry;
    },
});

async function localChatUtils(updatedMessageArray: Array<MessageType>, param2: (chunk: string) => void) {
    console.log('localChatUtils:', updatedMessageArray);
    return;
}

const useMessageStreamer = (updateCallback: (chunk: string) => void, finalizeCallback: (fullResponse: MessageType) => void) => {
    const [streamResponseText, setStreamResponseText] = useState<string>('');
    const newMessageEntry = useRecoilValue(messagePackageSelector);
    const [messageArray, setMessageArray] = useRecoilState(activeChatMessagesArrayAtom);
    const streamTrigger = useRecoilValue(streamTriggerAtomFamily({hookId: 'OpenAiStream', index: 0}));


    useEffect(() => {
        if (!streamTrigger || !newMessageEntry) return;

        setStreamResponseText('');

        const updatedMessageArray = [...messageArray, newMessageEntry];
        setMessageArray(updatedMessageArray);

        const startStreaming = async () => {
            await localChatUtils(updatedMessageArray, (chunk: string) => {
                setStreamResponseText(prev => {
                    const newText = prev + chunk;
                    updateCallback(chunk);

                    const updatedArray = [...updatedMessageArray];
                    const lastIndex = updatedArray.length - 1;
                    updatedArray[lastIndex] = {
                        ...updatedArray[lastIndex],
                        text: newText,
                    };
                    setMessageArray(updatedArray);

                    return newText;
                });
            });

            const fullResponse: MessageType = {
                ...newMessageEntry,
                text: streamResponseText,
            };
            finalizeCallback(fullResponse);
        };

        startStreaming().catch(console.error);

    }, [streamTrigger, updateCallback, finalizeCallback, messageArray, newMessageEntry]);

    return streamResponseText;
};

export default useMessageStreamer;




const blankSenderEntry = selector({
    key: 'black-SenderEntry',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) return null;
        const activeMessages = get(messagesFamily(activeChatId));
        if (!activeMessages === null) return null;

        const index = activeMessages.length;
        const assistantEntry = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index,
            role: 'sender',
            text: '',
        };
        const updatedArray = [...activeMessages, assistantEntry];
        return updatedArray;
    },
});


const openAiArraySelector = selector({
    key: 'openAi-ArraySelector',
    get: ({get}) => {
        const userSubmit = get(hasSubmittedMessageAtom);
        if (!userSubmit) return null;

        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) return [];

        const activeMessages = get(messagesFamily(activeChatId));
        const openAiArray = activeMessages.map(chat => ({
            role: chat.role as 'system' | 'user' | 'assistant',
            content: chat.text,
        }));
        return openAiArray as any[];
    },
});


const messageArrayTransformer = selector({
    key: 'message-PackageSelector',
    get: ({get}) => {
        const activeChatId = get(activeChatIdAtom);
        if (activeChatId === null) return [];

        const activeMessages = get(messagesFamily(activeChatId));
        const transformedMessageArray = activeMessages.map((chat, index) => ({
            chatId: activeChatId,
            role: chat.role as 'user' | 'sender' | 'system',
            index: index,
            text: chat.text,
            id: uuidv4(),
            lastUpdate: new Date().toISOString(),
        }));
        return transformedMessageArray
    },
});

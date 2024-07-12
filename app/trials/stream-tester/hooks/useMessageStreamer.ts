import { activeChatIdAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import { useState, useEffect } from 'react';
import asyncStreamer from './asyncStreamer';
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

const useMessageStreamer = (updateCallback: (chunk: string) => void, finalizeCallback: (fullResponse: MessageType) => void) => {
    const [streamResponseText, setStreamResponseText] = useState<string>('');
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const newMessageEntry = useRecoilValue(messagePackageSelector);
    const [messageArray, setMessageArray] = useRecoilState(activeMessagesAtom);
    const streamTrigger = useRecoilValue(triggerStreamChatAtom)


    useEffect(() => {
        if (!streamTrigger || !newMessageEntry) return;

        setStreamResponseText('');

        const updatedMessageArray = [...messageArray, newMessageEntry];
        setMessageArray(updatedMessageArray);

        const startStreaming = async () => {
            await asyncStreamer(updatedMessageArray, (chunk: string) => {
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

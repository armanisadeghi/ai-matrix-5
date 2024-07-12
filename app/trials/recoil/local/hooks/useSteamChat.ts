import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useRecoilCallback, CallbackInterface, selectorFamily, DefaultValue, atom } from 'recoil';
import { activeChatIdAtom, blankAssistantTextSelector, fetchStatusAtom, messagesFamily, openAiArraySelector } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';
import { OpenAiStream } from '@/app/api/openai/route';
import { v4 as uuidv4 } from 'uuid';


interface useStreamChatProps {
    trigger: boolean;
    onComplete: () => void;
}

const isStreamingAtom = atom<boolean>({
    key: 'isStreamingAtom',
    default: false,
});

const startStreaming = (chatId: string) => (callbackInterface: CallbackInterface) => {
    const {set} = callbackInterface;
    set(isStreamingAtom, false);
    set(streamingUpdateSelector(chatId), {chatId, id: uuidv4(), role: 'assistant', text: '', index: -1, createdAt: new Date().toISOString(),} as MessageType);
};

const streamingUpdateSelector = selectorFamily<MessageType, string>({
    key: 'streamingUpdateSelector',
    get: (chatId: string) => ({get}) => {
        const messages = get(messagesFamily(chatId));
        return messages[messages.length - 1] || null;
    },
    set: (chatId: string) => ({set}, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            set(messagesFamily(chatId), (prevMessages) => {
                if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].role === 'assistant') {
                    return [...prevMessages.slice(0, -1), newValue];
                } else { return [...prevMessages, newValue];
                }
            });
        }
    },
});

const updateStreamingMessage = (chatId: string, content: string) => (callbackInterface: CallbackInterface) => {
    const {set} = callbackInterface;
    set(streamingUpdateSelector(chatId), (currentMessage: MessageType) => {
        if (currentMessage) { return {
                ...currentMessage,
                text: currentMessage.text + content,
            };
        }
        return currentMessage;
    });
};

const endStreaming = (chatId: string) => (callbackInterface: CallbackInterface) => {
    const {set} = callbackInterface;
    set(isStreamingAtom, false);
    set(messagesFamily(chatId), (prev: MessageType[]) => {
        const finalMessage = prev[prev.length - 1];
        if (finalMessage && finalMessage.role === 'assistant') {
            return [...prev.slice(0, -1), {...finalMessage, index: prev.length - 1}];
        }
        return prev;
    });
};

const useStreamChat: React.FC<useStreamChatProps> = ({trigger, onComplete}) => {
    const [activeChatId] = useRecoilState(activeChatIdAtom);
    const openAiArray = useRecoilValue(openAiArraySelector);
    const updatedArrayWithBlankEntry = useRecoilValue(blankAssistantTextSelector);
    const [fetchStatus, setFetchStatus] = useRecoilState(fetchStatusAtom);

    const startStream = useRecoilCallback((callbackInterface) => (chatId: string) => startStreaming(chatId)(callbackInterface), []);
    const updateStream = useRecoilCallback((callbackInterface) => (chatId: string, content: string) => updateStreamingMessage(chatId, content)(callbackInterface), []);
    const endStream = useRecoilCallback((callbackInterface) => (chatId: string) => endStreaming(chatId)(callbackInterface), []);

    useEffect(() => {
        if (!trigger || fetchStatus === 'fetching') return;

        const fetchData = async () => {
            setFetchStatus('fetching');

            try {
                if (!updatedArrayWithBlankEntry || !activeChatId || !openAiArray) {
                    console.error('No updated array or active chat ID found');
                    setFetchStatus('error');
                    return;
                }

                startStream(activeChatId);

                await OpenAiStream(openAiArray, (chunk: string) => {
                    updateStream(activeChatId, chunk);
                });

                endStream(activeChatId);

                setFetchStatus('success');
                onComplete();
            }
            catch (error) {
                console.error('Error during OpenAI stream:', error);
                setFetchStatus('error');
            }
            finally {
                setFetchStatus('idle');
            }
        };

        fetchData();
    }, [trigger, activeChatId, updatedArrayWithBlankEntry, onComplete, fetchStatus, startStream, updateStream, endStream, openAiArray]);

    return null;
};

export default useStreamChat;

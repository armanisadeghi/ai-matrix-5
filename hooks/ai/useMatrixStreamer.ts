import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiParamsType, MessageType } from '@/types';
import { activeChatIdAtom, streamTriggerAtomFamily, activeChatMessagesArrayAtom, streamStatusAtom } from '@/state/aiAtoms/aiChatAtoms';
import { OpenAiStream } from '@/app/api/openai/route';
import { v4 as uuidv4 } from 'uuid';


export interface MatrixStreamHookProps {
    model?: string;
    options?: AiParamsType;
    index?: number;
}

// Tested and working version that is simplified and allows for model, options and an index for making multiple calls for the same message.
// This should not be changed.
// Relies on the ActiveChatArray being stored in the ActiveChatMessagesArrayAtom so the messages need to be taken from the Family and put in here.

function useMatrixStreamer({model = 'gpt-4o', options, index = 0}: MatrixStreamHookProps = {}) {
    const hookId = 'OpenAiStream';
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [messageArray, setMessageArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({hookId, index}));
    const [, setStreamStatus] = useRecoilState(streamStatusAtom);

    useEffect(() => {
        if (!streamTrigger) return;
        setStreamTrigger(false);

        const openAiArray = messageArray.map(message => ({
            role: message.role as 'system' | 'user' | 'assistant',
            content: message.text,
        }));

        const assistantEntry: MessageType = {
            chatId: activeChatId,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            index: messageArray.length,
            role: 'assistant',
            text: '',
        };
        const arrayWithBlankEntry = [...messageArray, assistantEntry];

        const callback = (chunk: string) => {
            setMessageArray((prevMessages) => {
                const updatedMessages = prevMessages.map((message, i) => {
                    if (i === prevMessages.length - 1) {
                        return {...message, text: message.text + chunk};
                    }
                    return message;
                });
                return updatedMessages;
            });
        };
        const streamOptions: { model: string; options?: AiParamsType } = {
            model, ...(options ? {options} : {})
        };

        setMessageArray(arrayWithBlankEntry);

        setStreamStatus('streaming');
        OpenAiStream(openAiArray, callback, streamOptions.model, streamOptions.options).then(() => setStreamStatus('success')).catch((error) => {
            console.error(error);
            setStreamStatus('error');
        }).finally(() => setStreamTrigger(false));

    }, [streamTrigger, model, options, setMessageArray, setStreamTrigger, hookId, index]);

    return messageArray;
}

export default useMatrixStreamer;

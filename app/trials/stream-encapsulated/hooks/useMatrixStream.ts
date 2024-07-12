import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiParamsType, MessageType } from '@/types';
import { activeChatIdAtom, streamTriggerAtomFamily, activeChatMessagesArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import { OpenAiStream } from '@/app/api/openai/route';
import { v4 as uuidv4 } from 'uuid';


export interface MatrixStreamHookProps {
    model?: string;
    options?: AiParamsType;
    index?: number;
}

function useMatrixStream({model = 'gpt-4o', options, index = 0}: MatrixStreamHookProps = {}) {
    const hookId = 'OpenAiStream';
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [messageArray, setMessageArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({hookId, index}));

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

        OpenAiStream(openAiArray, callback, streamOptions.model, streamOptions.options).catch(console.error).finally(() => setStreamTrigger(false));

    }, [streamTrigger, model, options, setMessageArray, setStreamTrigger, hookId, index]);

    return messageArray;
}

export default useMatrixStream;

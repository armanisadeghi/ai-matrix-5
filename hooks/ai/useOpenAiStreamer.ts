import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { AiParamsType } from '@/types';
import { streamTriggerAtomFamily, streamStatusAtom, chatMessagesAtomFamily, assistantTextStreamAtom } from '@/state/aiAtoms/aiChatAtoms';
import { OpenAiStream } from '@/app/api/openai/route';


export interface MatrixStreamHookProps {
    chatId: string;
    model?: string;
    options?: AiParamsType;
    index?: number;
}

function useOpenAiStreamer({chatId, model = 'gpt-4o', options, index = 0}: MatrixStreamHookProps) {
    const hookId = 'OpenAiStream';
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({hookId, index}));
    const [, setStreamStatus] = useRecoilState(streamStatusAtom);
    const [messages, setMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const [streamMessage, setStreamMessage] = useRecoilState(assistantTextStreamAtom);

    useEffect(() => {
        if (!streamTrigger) return;
        setStreamTrigger(false);

        const openAiArray = messages.map(message => ({
            role: message.role as 'system' | 'user' | 'assistant',
            content: message.text,
        }));

        let fullText = '';

        const callback = (chunk: string) => {
            fullText += chunk;
            setStreamMessage((prevStreamMessage) => prevStreamMessage + chunk);
        };

        const streamOptions: { model: string; options?: AiParamsType } = {
            model, ...(options ? {options} : {})
        };

        setStreamStatus('streaming');

        OpenAiStream(openAiArray, callback, streamOptions.model, streamOptions.options).then(() => {
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((message, i) => {
                    if (i === prevMessages.length - 1) {
                        return {...message, text: fullText};
                    }
                    return message;
                });
                return updatedMessages;
            });
            setStreamMessage('');
            setStreamStatus('success');

        }).catch((error) => {
            console.error(error);
            setStreamStatus('error');
        }).finally(() => setStreamTrigger(false));

    }, [streamTrigger, model, options, setStreamTrigger, hookId, index, messages, setMessages, setStreamMessage]);

    return null;
}

export default useOpenAiStreamer;

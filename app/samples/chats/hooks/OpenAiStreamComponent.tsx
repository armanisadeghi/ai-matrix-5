import React, { useEffect } from 'react';
import { MessageEntry, Role } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";
import { useRecoilState } from "recoil";
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";

const StreamOpenai: React.FC = () => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const messages = activeChatMessagesArray.map(chat => ({
                    role: chat.role as 'system' | 'user' | 'assistant',
                    content: chat.text
                }));

                let assistantMessage: string = '';

                await OpenAiStream(messages, (chunk) => {
                    assistantMessage += chunk;
                    setAssistantTextStream(assistantMessage);
                });

                const fullResponse: MessageEntry = { text: assistantMessage, role: 'assistant' as Role };

                const updatedArray = [...activeChatMessagesArray, fullResponse];
                setActiveChatMessagesArray(updatedArray);

            } catch (error) {
                console.error('Error during OpenAI stream:', error);
            }
        };

        fetchData();
    }, [activeChatMessagesArray, setAssistantTextStream, setActiveChatMessagesArray]);

    return null;
};

export default StreamOpenai;

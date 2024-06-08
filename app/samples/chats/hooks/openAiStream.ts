import React, { useEffect } from 'react';
import { MessageEntry, Role } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";
import { useRecoilState } from "recoil";
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from "@/app/samples/ai-tests/shared/atoms/chatAtoms";

interface StreamOpenaiProps {
    trigger: boolean;
    onComplete: () => void;
}

const StreamOpenai: React.FC<StreamOpenaiProps> = ({ trigger, onComplete }) => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);

    useEffect(() => {
        if (!trigger) return;

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

                onComplete(); // Reset trigger once complete
            } catch (error) {
                console.error('Error during OpenAI stream:', error);
            }
        };

        fetchData();
    }, [trigger, activeChatMessagesArray, setAssistantTextStream, setActiveChatMessagesArray, onComplete]);

    return null; // This component does not render anything
};

export default StreamOpenai;

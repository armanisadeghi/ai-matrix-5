import React, { useEffect, useRef } from 'react';
import { MatrixMessage, MessageEntry, Role } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";
import { useRecoilState } from "recoil";
import { activeChatMessagesArrayAtom, assistantTextStreamAtom } from "@/state/aiAtoms/chatAtoms";
import { useChatDbAtoms } from "@/app/samples/chats/hooks/useChatDbAtoms";

interface StreamOpenaiProps {
    trigger: boolean;
    onComplete: () => void;
}

const StreamOpenai: React.FC<StreamOpenaiProps> = ({ trigger, onComplete }) => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const { pushUpdatedArrayToDb } = useChatDbAtoms();

    // Ref to keep track of whether the fetch operation is ongoing
    const isFetching = useRef(false);

    useEffect(() => {
        if (!trigger || isFetching.current) return;  // Check if already fetching

        const fetchData = async () => {
            isFetching.current = true;  // Set fetching flag

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

                const newAssistantMessageEntry: MatrixMessage = {
                    index: activeChatMessagesArray.length,
                    role: 'assistant',
                    text: assistantMessage,
                };

                const updatedArray = [...activeChatMessagesArray, newAssistantMessageEntry];
                setActiveChatMessagesArray(updatedArray);
                await pushUpdatedArrayToDb();
                setAssistantTextStream('');

                onComplete();
            } catch (error) {
                console.error('Error during OpenAI stream:', error);
            } finally {
                isFetching.current = false;  // Reset fetching flag
            }
        };

        fetchData();
    }, [trigger, activeChatMessagesArray, setAssistantTextStream, setActiveChatMessagesArray, onComplete]);

    return null; // This component does not render anything
};

export default StreamOpenai;

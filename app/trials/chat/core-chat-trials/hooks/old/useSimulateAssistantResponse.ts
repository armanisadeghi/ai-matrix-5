/*
import { activeChatIdAtom, assistantTextStreamAtom, activeChatMessageArrayAtom } from '@/state/aiAtoms/aiChatAtoms';
import { SimpleMessageType } from '@/types';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import supabase from '@/utils/supabase/client';

interface UseSimulateAssistantResponseProps {
    trigger: boolean;
    onComplete: () => void;
}

const useSimulateAssistantResponse = ({ trigger, onComplete }: UseSimulateAssistantResponseProps) => {
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [tempMessageArray, setTempMessageArray] = useRecoilState(activeChatMessageArrayAtom);
    const [activeChatId] = useRecoilState(activeChatIdAtom);

    const isFetching = useRef(false);

    useEffect(() => {
        if (!trigger || isFetching.current) return;  // Check if already fetching

        const simulateData = async () => {
            isFetching.current = true;  // Set fetching flag

            try {
                const messages = tempMessageArray.map(chat => ({
                    role: chat.role as 'system' | 'user' | 'assistant',
                    content: chat.text
                }));

                const assistantMessages = ['Hello', 'How', 'can', 'I', 'assist', 'you', 'today?'];
                let assistantMessage = '';

                for (const word of assistantMessages) {
                    assistantMessage += word + ' ';
                    setAssistantTextStream(assistantMessage.trim());

                    await new Promise(resolve => setTimeout(resolve, 250));
                }

                const newAssistantMessageEntry:  SimpleMessageType = {
                    index: tempMessageArray.length,
                    role: 'assistant',
                    text: assistantMessage.trim(),
                };


                const updatedArray: SimpleMessageType[] = [
                    ...tempMessageArray,
                    newAssistantMessageEntry
                ];

                setTempMessageArray(updatedArray);

                if (!activeChatId) {
                    console.error('No active chat ID found');
                } else {
                    const { data, error } = await supabase
                    .rpc('add_assistant_message', {
                        chat_id: activeChatId,
                        message: assistantMessage.trim(),
                    });
                    if (error) {
                        console.error('Error adding assistant message:', error);
                    } else {
                        console.log('Assistant message added:', data);
                    }
                }

                setAssistantTextStream('');
                onComplete();
            } catch (error) {
                console.error('Error during simulated response:', error);
            } finally {
                isFetching.current = false;  // Reset fetching flag
            }
        };

        simulateData();
    }, [trigger, tempMessageArray, setAssistantTextStream, setTempMessageArray, activeChatId, onComplete]);

};

export default useSimulateAssistantResponse;
*/

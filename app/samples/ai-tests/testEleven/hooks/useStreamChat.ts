import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeChatMessagesArrayAtom, systemMessagesAtom, assistantTextStreamAtom, userTextInputAtom } from '@/state/aiAtoms/chatAtoms';
import { OpenAiStream } from "@/app/api/openai/route";
import { MatrixMessage, ChatMessagesArray } from '@/types/chat';

const updatedArray: ChatMessagesArray = [];

const useStreamChat = () => {
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState<ChatMessagesArray>(activeChatMessagesArrayAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const systemMessage = useRecoilState(systemMessagesAtom);
    const [input, setInput] = useState('');
    const messagesRef = useRef<ChatMessagesArray>(activeChatMessagesArray);
    const [streamingAssistantMessage, setStreamingAssistantMessage] = useState('');

    useEffect(() => {
        messagesRef.current = activeChatMessagesArray;
    }, [activeChatMessagesArray]);

    const fetchData = useCallback(async (currentMessagesArray: MatrixMessage[]) => {
        try {
            const messages = currentMessagesArray.map(chat => ({
                role: chat.role as 'system' | 'user' | 'assistant',
                content: chat.text
            }));

            await OpenAiStream(messages, (chunk) => {
                setStreamingAssistantMessage(prev => {
                    const updatedMessage = prev + chunk;
                    setAssistantTextStream(updatedMessage);

                    setActiveChatMessagesArray(prevMessages => {
                        const updatedArray: ChatMessagesArray = [...prevMessages];
                        if (updatedArray.length > 0 && updatedArray[updatedArray.length - 1].role === 'assistant') {
                            const lastMessage = { ...updatedArray[updatedArray.length - 1], text: updatedMessage };
                            updatedArray[updatedArray.length - 1] = lastMessage;
                        } else {
                            updatedArray.push({
                                index: updatedArray.length,
                                role: 'assistant',
                                text: updatedMessage,
                            });
                        }
                        return updatedArray;
                    });
                    return updatedMessage;
                });
            });

            setStreamingAssistantMessage('');
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    }, [setActiveChatMessagesArray]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!userTextInput.trim()) return;

        const newUserMessage: MatrixMessage = {
            index: messagesRef.current.length,
            role: 'user',
            text: userTextInput,
        };

        const updatedArray: ChatMessagesArray = [...messagesRef.current, newUserMessage];
        setActiveChatMessagesArray(updatedArray);
        setUserTextInput('');
        fetchData(updatedArray);
    }, [userTextInput, fetchData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserTextInput(e.target.value);
    };

    return {
        activeChatMessagesArray,
        userTextInput,
        handleInputChange,
        handleSubmit
    };
};

export { useStreamChat };

'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userMessageEntryAtom,
    userTextInputAtom,
    useChatMessages, activeChatMessagesArrayAtom,
} from "../../ai-tests/shared/atoms/chatAtoms";
import { ChatMessage, MessageEntry } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";
import { aiModelAtom } from "@/app/samples/ai-tests/shared/atoms/settingsAtoms";

interface AutoChatProps {
    userTextInputProp?: string;
    userMessageEntry?: MessageEntry;
    onRequestComplete?: () => void;
    shouldStartRequest: boolean;
}

const AutoChat: React.FC<AutoChatProps> = ({ userTextInputProp, userMessageEntry, onRequestComplete, shouldStartRequest }) => {
    const { addMessageWithRole, messages, addMessage } = useChatMessages();
    const [userTextInput, setLocalUserTextInput] = useRecoilState(userTextInputAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [assistantMessageEntry, setAssistantMessageEntry] = useRecoilState(assistantMessageEntryAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [aiModel, setAiModel] = useRecoilState(aiModelAtom);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const userMessage : MessageEntry = { text: userTextInput, role: 'user' };
    useEffect(() => {
        console.log('AutoChat useEffect Should start value: ', shouldStartRequest);
        if (!shouldStartRequest) return;

        let isCancelled = false;

        const prepareChatRequest = (): { chatMessages: ChatMessage[], model: string } => {
            console.log('1. prepareChatRequest');
            console.log('userTextInputProp', userTextInputProp);
            console.log('userMessageEntry', userMessageEntry);
            console.log('userTextInput', userTextInput);

            if (!userTextInputProp && !userMessageEntry) {
                addMessageWithRole(userTextInput, 'user');
                console.log('2A. addMessageWithRole');
                setActiveChatMessagesArray([...activeChatMessagesArray, userMessage]);
                console.log('2AB. addMessageWithRole', activeChatMessagesArray);

            }

            if (userTextInputProp && !userMessageEntry) {
                addMessageWithRole(userTextInput, 'user');
                console.log('2A. addMessageWithRole');
                setActiveChatMessagesArray([...activeChatMessagesArray, userMessage]);
                console.log('2AB. addMessageWithRole', activeChatMessagesArray);
            }

            if (userMessageEntry) {
                setActiveChatMessagesArray([...activeChatMessagesArray, userMessage]);
                console.log('2C. addMessage');
            }

            console.log('3. Current Array:', activeChatMessagesArray);

            const chatMessages = activeChatMessagesArray.map(message => ({
                role: message.role,
                content: message.text,
            }));

            console.log('4. Transformed ChatMessages Array:', chatMessages);

            const model = aiModel.id;

            return { chatMessages, model };
        };

        const submitChatRequest = async (chatMessages: ChatMessage[], model: string): Promise<void> => {
            if (isRequestInProgress) return; // Prevent multiple triggers
            setIsRequestInProgress(true);

            setIsLoading(true);
            let fullResponseText = '';

            try {
                await OpenAiStream(
                    chatMessages,
                    (chunk: string) => {
                        setAssistantTextStream(prev => prev + chunk);
                        console.log('5. Chunk:', chunk);
                        fullResponseText += chunk;
                    },
                    model
                );

                console.log('6. Full Response:', fullResponseText);

                // Create a full assistant message entry
                const fullResponse: MessageEntry = { text: fullResponseText, role: 'assistant' };

                // Update the assistant message entry and chat array
                setAssistantMessageEntry(fullResponse);
                addMessage(fullResponse);

                if (onRequestComplete) {
                    onRequestComplete();
                }
            } catch (error) {
                console.error('Error during OpenAI stream:', error);
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                    setIsRequestInProgress(false); // Reset the request in progress state
                }
            }
        };

        const { chatMessages, model } = prepareChatRequest();
        submitChatRequest(chatMessages, model);

        return () => {
            isCancelled = true;
        };
    }, [userTextInput, userMessageEntry, addMessageWithRole, addMessage, messages, setAssistantMessageEntry, setAssistantTextStream, userTextInputProp, onRequestComplete]); // Empty dependency array to run the effect only once

    return <></>;
};

export default AutoChat;

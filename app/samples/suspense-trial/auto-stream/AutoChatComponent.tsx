'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userMessageEntryAtom,
    userTextInputAtom,
    useChatMessages,
} from "../../ai-tests/shared/atoms/chatAtoms";
import { MessageEntry } from '@/types/chat';
import { OpenAiStream } from "@/app/api/openai/route";

interface AutoChatProps {
    userTextInput?: string;
    userMessageEntry?: MessageEntry;
    onRequestComplete?: () => void;
}

const AutoChat: React.FC<AutoChatProps> = ({ userTextInput, userMessageEntry, onRequestComplete }) => {
    const { addMessageWithRole, messages, addMessage } = useChatMessages();
    const [localUserTextInput, setLocalUserTextInput] = useRecoilState(userTextInputAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [assistantMessageEntry, setAssistantMessageEntry] = useRecoilState(assistantMessageEntryAtom);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const submitChatRequest = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const userInput = localUserTextInput;

                addMessageWithRole(userInput, 'user');

                if (userInput) {
                    // Step 1: Add user message to the chat array
                    addMessageWithRole(userInput, 'user');
                } else if (userMessageEntry) {
                    // Directly add the user message entry if provided
                    addMessage(userMessageEntry);
                }

                // Get the updated chat array
                const updatedChat = messages;

                // Prepare the messages for the API call
                const messagesPayload = updatedChat.map(chat => ({
                    role: chat.role as 'system' | 'user' | 'assistant',
                    content: chat.text
                }));

                let assistantMessage: string = '';

                await OpenAiStream(messagesPayload, (chunk) => {
                    if (isCancelled) return;
                    // Step 3: Stream response into assistantTextStreamAtom
                    assistantMessage += chunk;
                    setAssistantTextStream(prev => prev + chunk);
                });

                if (isCancelled) return;

                // Step 4: Create a full assistant message entry
                const fullResponse: MessageEntry = { text: assistantMessage, role: 'assistant' };

                // Step 5: Update the assistant message entry and chat array
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
                }
            }
        };

        submitChatRequest();

        return () => {
            isCancelled = true;
        };
    }, [userTextInput, userMessageEntry, addMessageWithRole, addMessage, messages, setAssistantMessageEntry, setAssistantTextStream, localUserTextInput, onRequestComplete]); // Empty dependency array to run the effect only once

    return <></>;
};

export default AutoChat;

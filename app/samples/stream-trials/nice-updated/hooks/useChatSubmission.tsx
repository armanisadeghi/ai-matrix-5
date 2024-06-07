import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { submitChatRequest } from "../../../ai-tests/shared/services/SteamOpenAi";

// Import Recoil atoms
import {
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userMessageEntryAtom,
    userTextInputAtom,
    useChatMessages,
} from "../../../ai-tests/shared/atoms/chatAtoms";
import { MessageEntry } from "@/types";

export const useChatSubmission = () => {
    const responseRef = useRef<string>('');
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [userMessageEntry, setUserMessageEntry] = useRecoilState(userMessageEntryAtom);
    const [assistantTextStream, setAssistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [assistantMessageEntry, setAssistantMessageEntry] = useRecoilState(assistantMessageEntryAtom);
    const [messages, setMessages] = useState<{ userMessage: string, response: string }[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userMessage: MessageEntry = {
            role: 'user',
            text: userTextInput,
        };

        setUserMessageEntry(userMessage);
        responseRef.current = '';
        setMessages((prevMessages) => [...prevMessages, { userMessage: userTextInput, response: '' }]);
        setUserTextInput('');

        await submitChatRequest(
            [userMessage],
            (chunk) => {
                responseRef.current += chunk;
                setAssistantTextStream(responseRef.current);
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1].response = responseRef.current;
                    return newMessages;
                });
            },
            (finalMessage) => {
                setAssistantMessageEntry(finalMessage);
            }
        );
    };

    return { userTextInput, setUserTextInput, messages, handleSubmit };
};

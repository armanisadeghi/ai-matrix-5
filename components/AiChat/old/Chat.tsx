"use client";

import { useState, useEffect } from "react";
import ResponseSection from "@/app/chat/response/ResponseSection";
import ChatFormInput from "@/app/chat/input/ChatFormInput";
import { useChat } from "@/context/chatContext";
import { eRoleType, iMessage } from "@/utils/types";
import { Container, Paper, Space } from '@mantine/core';
import { useSocketManager } from '@/lib/socket';
import ChatSettings from '@/components/AiChat/UserInput/settings/ChatSettings';

export interface SettingsProps {
    aiPreferencesMain: string;
    aiPreferencesSecond: string;
    makeSmallTalk: boolean;
    quickAnswer: boolean;
    improveQuestions: boolean;
    submitOnEnter: boolean;
}

export interface ChatBotSettingsProps {
    settings: SettingsProps;
    onChange: (field: keyof SettingsProps, value: boolean | string) => void;
    onSubmit: () => void;
}


const initialSettings: SettingsProps = {
    aiPreferencesMain: 'direct_chat',
    aiPreferencesSecond: 'one_ai_chat',
    makeSmallTalk: false,
    quickAnswer: true,
    improveQuestions: false,
    submitOnEnter: false
};

function ChatForm() {
    const [message, setMessage] = useState<string>("");
    const [msgHistory, setMsgHistory] = useState<iMessage[]>([]);
    const [streamText, setStreamText] = useState<string>("");
    const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [settings, setSettings] = useState<SettingsProps>(initialSettings);

    const { chatHistory, setChatHistory } = useChat();
    const sendMessageHandler = useSocketManager((response: string) => {
        setStreamText((prev) => prev + " " + response);
    });

    useEffect(() => {
        setMsgHistory(chatHistory[0]?.msgArr || []);
    }, [chatHistory]);

    useEffect(() => {
        if (streamText === "" || !isResponseLoading) return;
        setIsResponseLoading(false);
    }, [streamText]);

    useEffect(() => {
        if (msgHistory.length === 0) return;
        if (chatHistory.length === 0) {
            setChatHistory([{ title: "New Chat", msgArr: msgHistory }]);
        } else {
            let data = chatHistory;
            data[0].msgArr = msgHistory;
            setChatHistory(data);
        }
    }, [msgHistory]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) return;
        setErrorText("");
        displayUserMessage(message, eRoleType.USER);
        sendMessageHandler(message);
        setMsgHistory((prev) => [...prev, { role: eRoleType.ASSISTANT, content: streamText }]);
        setMessage("");
        setStreamText("");
    };

    const displayUserMessage = (msg: string, type: eRoleType) => {
        const newMessage: iMessage = { role: type, content: msg };
        setMsgHistory((prev) => [...prev, newMessage]);
    };

    const handleSettingsChange = (field: keyof SettingsProps, value: boolean | string) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [field]: value
        }));
    };

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
            <ResponseSection msgHistory={msgHistory} streamText={streamText} />

            <Paper shadow="xs" radius="xs" p="xl">
                <ChatFormInput
                    message={message}
                    setMessage={setMessage}
                    submitHandler={submitHandler}
                    isResponseLoading={isResponseLoading}
                    errorText={errorText}
                />

                <Space h="sm" />


            </Paper>
        </Container>
    );
}

export default ChatForm;

/*
    return (
        <Container style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
            <ResponseSection msgHistory={msgHistory} streamText={streamText} />

            <Paper shadow="xs" radius="xs" p="xl">
                <ChatFormInput
                    message={message}
                    setMessage={setMessage}
                    submitHandler={submitHandler}
                    isResponseLoading={isResponseLoading}
                    errorText={errorText}
                />

                <Space h="sm" />


            </Paper>
        </Container>
    );
}
 */

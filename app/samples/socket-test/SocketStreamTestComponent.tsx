// components/SocketStreamTestComponent.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { Container, Paper, TextInput, NumberInput, Select, Button, Title, Text, Stack, Group, Textarea, Alert } from '@mantine/core';
import { IconPlayerPlay, IconPlayerStop, IconAlertCircle } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from './SocketManager';
import { aiModelAtom, combinedSettingsState } from '@/state/aiAtoms/settingsAtoms';
import { chatMessagesAtomFamily, requestTaskAtom, recipeIdAtom, assistantTextStreamAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';

const addMessage = (
    messages: MessageType[],
    chatId: string,
    text: string,
    role: string
): MessageType[] => {
    const newMessage: MessageType = {
        chatId: chatId,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        index: messages.length ? messages[messages.length - 1].index + 1 : 1,
        role: role,
        text: text,
    };

    return [...messages, newMessage];
};

const SocketStreamTestComponent: React.FC = () => {
    const [chatId, setChatId] = useState('test-chat-id');
    const [taskName, setTaskName] = useState('matrix_chat');
    const [taskIndex, setTaskIndex] = useState(0);
    const [recipeId, setRecipeId] = useState('test-recipe-id');
    const [userMessage, setUserMessage] = useState('');
    const [systemMessage, setSystemMessage] = useState('You are a helpful assistant.');

    const setRequestTask = useSetRecoilState(requestTaskAtom);
    const setRecipeIdAtom = useSetRecoilState(recipeIdAtom);
    const [chatMessages, setChatMessages] = useRecoilState(chatMessagesAtomFamily(chatId));
    const combinedSettings = useRecoilValue(combinedSettingsState);
    const [aiModel, setAiModel] = useRecoilState(aiModelAtom);
    const assistantStream = useRecoilValue(assistantTextStreamAtom);

    const { startSocketStream, stopSocketStream, taskStatus } = useSocket();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!chatId || !taskName || taskIndex < 0 || !recipeId || !systemMessage || !userMessage) {
            setError("Please fill in all fields");
            return;
        }

        let newMessages = addMessage([], chatId, systemMessage, 'system');
        newMessages = addMessage(newMessages, chatId, userMessage, 'user');

        setChatMessages(newMessages);
        setRequestTask(taskName);
        setRecipeIdAtom(recipeId);
        setAiModel('gpt-4');

        startSocketStream(chatId, taskName, taskIndex, newMessages);
    }, [chatId, systemMessage, userMessage, taskName, taskIndex, recipeId, setChatMessages, setRequestTask, setRecipeIdAtom, setAiModel, startSocketStream]);

    const handleStop = useCallback(() => {
        stopSocketStream(`${taskName}_${taskIndex}`);
    }, [taskName, taskIndex, stopSocketStream]);

    useEffect(() => {
        return () => {
            stopSocketStream(`${taskName}_${taskIndex}`);
        };
    }, [taskName, taskIndex, stopSocketStream]);

    return (
        <Container size="lg">
            <Stack gap="xl">
                {error && (
                    <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
                        {error}
                    </Alert>
                )}
                <Paper shadow="md" p="md" withBorder>
                    <form onSubmit={handleSubmit}>
                        <Stack gap="md">
                            <Title order={2}>Enter Test Values For a Chat</Title>

                            <TextInput
                                label="Chat ID"
                                value={chatId}
                                onChange={(event) => setChatId(event.currentTarget.value)}
                                required
                            />

                            <NumberInput
                                label="Task Index"
                                value={taskIndex}
                                onChange={(value) => setTaskIndex(value as number || 0)}
                                required
                            />

                            <Select
                                label="Task Name"
                                value={taskName}
                                onChange={(value) => setTaskName(value || '')}
                                data={[
                                    {value: 'matrix_chat', label: 'Matrix Chat'},
                                    {value: 'sample_task', label: 'Sample task with response'},
                                    {value: 'other_task', label: 'Other Task'},
                                ]}
                                required
                            />

                            <TextInput
                                label="Recipe ID"
                                value={recipeId}
                                onChange={(event) => setRecipeId(event.currentTarget.value)}
                                required
                            />

                            <Textarea
                                label="System Message"
                                value={systemMessage}
                                onChange={(event) => setSystemMessage(event.currentTarget.value)}
                                required
                            />

                            <Textarea
                                label="User Message"
                                value={userMessage}
                                onChange={(event) => setUserMessage(event.currentTarget.value)}
                                required
                            />

                            <Group>
                                <Button type="submit" leftSection={<IconPlayerPlay size={14}/>}>
                                    Start Stream
                                </Button>
                                <Button onClick={handleStop} leftSection={<IconPlayerStop size={14}/>} color="red">
                                    Stop Stream
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Paper>

                <Paper shadow="md" p="md" withBorder>
                    <Title order={3} mb="md">Conversation</Title>
                    <Stack gap="md">
                        {chatMessages.map((message, index) => (
                            (message.role === 'user' || message.role === 'assistant') && (
                                <Text key={index}>{message.role}: {message.text}</Text>
                            )
                        ))}
                        {assistantStream && (
                            <Text>Assistant (Streaming): {assistantStream}</Text>
                        )}
                    </Stack>
                </Paper>

                <Group>
                    <Text fw={700}>Status:</Text>
                    <Text>{taskStatus}</Text>
                </Group>

                <Paper shadow="md" p="md" withBorder>
                    <Title order={3} mb="md">Debug Information</Title>
                    <Stack gap="md">
                        <Text>Combined Settings: {JSON.stringify(combinedSettings, null, 2)}</Text>
                        <Text>AI Model: {aiModel}</Text>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
};

export default SocketStreamTestComponent;

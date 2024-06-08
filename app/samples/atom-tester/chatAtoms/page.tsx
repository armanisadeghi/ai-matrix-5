'use client';

import React, { useState, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    useChatMessages,
    messageCountSelector,
    filteredMessagesByRoleSelector,
    totalCharacterCountSelector,
    characterCountByRoleSelector,
    activeChatMessagesArrayAtom,
} from '../../ai-tests/shared/atoms/chatAtoms';
import { Box, Grid, Space, Button, TextInput, Select, Textarea } from "@mantine/core";
import { MessageEntry, Role } from "@/types/chat";
import AssistantMessage from "@/components/AiChat/Response/AssistantMessage";
import UserMessage from "@/components/AiChat/Response/extra/UserMessage";
import { submitChatRequest } from '@/app/samples/ai-tests/shared/services/SteamOpenAi';

const ChatComponent: React.FC = () => {
    const { messages, addMessage, deleteMessage, editMessage } = useChatMessages();
    const messageCount = useRecoilValue(messageCountSelector);
    const userMessages = useRecoilValue(filteredMessagesByRoleSelector('user'));
    const totalCharacterCount = useRecoilValue(totalCharacterCountSelector);
    const userCharacterCount = useRecoilValue(characterCountByRoleSelector('user'));
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);
    const setActiveMessages = useSetRecoilState(activeChatMessagesArrayAtom);

    const [newMessage, setNewMessage] = useState('');
    const [role, setRole] = useState<Role>('user');
    const [streamingResponse, setStreamingResponse] = useState('');
    const isStreamingRef = useRef(false);

    const handleAddMessage = async () => {
        if (isStreamingRef.current) return;

        addMessage({ role, text: newMessage });
        setNewMessage('');
        setActiveMessages([...activeChatMessages, { role, text: newMessage }]);
        setStreamingResponse('');

        isStreamingRef.current = true;

        try {
            await submitChatRequest(
                activeChatMessages,
                (updatedMessage: MessageEntry) => {
                    setStreamingResponse(updatedMessage.text);
                },
                (finalMessage: MessageEntry) => {
                    addMessage(finalMessage);
                    setActiveMessages([...activeChatMessages, finalMessage]);
                }
            );
        } catch (error) {
            console.error('Streaming error:', error);
        } finally {
            isStreamingRef.current = false;
        }
    };

    return (
        <div>
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span={10}>
                    <Space h={8}/>

                    <h3>Chat Messages</h3>
                    <div>
                        <Grid>
                            <Grid.Col span={10}>

                                <Select
                                    label="Role"
                                    value={role}
                                    onChange={(value) => setRole(value as Role)}
                                    data={[
                                        {
                                            value: 'user',
                                            label: 'User'
                                        },
                                        {
                                            value: 'assistant',
                                            label: 'Assistant'
                                        },
                                    ]}
                                />
                                <TextInput
                                    //value={newMessage}
                                    //onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message here"
                                />
                            </Grid.Col>

                            <Grid.Col span={2}>
                                <Button variant="light" size="xs" radius="xl" onClick={handleAddMessage}>
                                    Add Message
                                </Button>
                            </Grid.Col>
                        </Grid>

                    </div>
                    <div>
                        <h3>All Messages ({messageCount})</h3>
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>
                                    {message.role}: {message.text}
                                    <Space h={10}/>

                                    <Button variant="light" size="xs" radius="xl"
                                            onClick={() => deleteMessage(index)}>Delete</Button>
                                    <Button variant="light" size="xs" radius="xl" onClick={() => editMessage(index, {
                                        role: message.role,
                                        text: 'Edited message'
                                    })}> Edit </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {/* ... (active messages display) */}
                        <Textarea
                            value={streamingResponse}
                            readOnly
                            autosize
                            minRows={3}
                            styles={{ input: { whiteSpace: 'pre-wrap' } }}
                        />
                    </div>

                    <div>
                        <h4>User Messages</h4>
                        <ul>
                            {userMessages.map((message, index) => (
                                <li key={index}>
                                    {message.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Total Character Count: {totalCharacterCount}</h4>
                        <h4>User Character Count: {userCharacterCount}</h4>
                    </div>
                    <div>
                        {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => (
                            <div key={entryIndex}>
                                {entry.role === 'assistant' ? (
                                    <AssistantMessage entryIndex={entryIndex.toString()}/>
                                ) : (
                                    <UserMessage entryIndex={entryIndex.toString()}/>
                                )}
                                <Space h={10}/>
                            </div>
                        ))}
                    </div>
                </Grid.Col>
                <Grid.Col span={1}></Grid.Col>
            </Grid>
        </div>
    );
};

export default ChatComponent;

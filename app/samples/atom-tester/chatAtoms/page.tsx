'use client';

import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
    useChatMessages,
    messageCountSelector,
    filteredMessagesByRoleSelector,
    totalCharacterCountSelector,
    characterCountByRoleSelector,
    activeChatMessagesArrayAtom,
} from '../../ai-tests/shared/servicees/chatAtoms';
import { Box, Grid, Space, Button, TextInput, Select } from "@mantine/core";
import { MessageEntry, Role } from "@/types/chat";
import AssistantMessage from "@/app/samples/ai-tests/shared/response/AssistantMessage";
import UserMessage from "@/app/samples/ai-tests/shared/response/UserMessage";

const ChatComponent = () => {
    const { messages, addMessage, deleteMessage, editMessage } = useChatMessages();
    const messageCount = useRecoilValue(messageCountSelector);
    const userMessages = useRecoilValue(filteredMessagesByRoleSelector('user'));
    const totalCharacterCount = useRecoilValue(totalCharacterCountSelector);
    const userCharacterCount = useRecoilValue(characterCountByRoleSelector('user'));
    const activeChatMessages = useRecoilValue(activeChatMessagesArrayAtom);

    const [newMessage, setNewMessage] = useState<string>('');
    const [role, setRole] = useState<Role>('user');

    const handleAddMessage = () => {
        addMessage({ role, text: newMessage });
        setNewMessage('');
    };

    return (
        <div>
            <h1>Chat Messages</h1>
            <div>
                <Select
                    label="Role"
                    value={role}
                    onChange={(value) => setRole(value as Role)}
                    data={[
                        { value: 'user', label: 'User' },
                        { value: 'assistant', label: 'Assistant' },
                    ]}
                />
                <TextInput
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <Button onClick={handleAddMessage}>Add Message</Button>
            </div>
            <div>
                <h2>All Messages ({messageCount})</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            {message.role}: {message.text}
                            <Button onClick={() => deleteMessage(index)}>Delete</Button>
                            <Button onClick={() => editMessage(index, { role: message.role, text: 'Edited message' })}> Edit </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>User Messages</h2>
                <ul>
                    {userMessages.map((message, index) => (
                        <li key={index}>
                            {message.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Total Character Count: {totalCharacterCount}</h2>
                <h2>User Character Count: {userCharacterCount}</h2>
            </div>
            <Grid>
                <Grid.Col span={0.5}></Grid.Col>
                <Grid.Col span={11}>
                    <Space h={10} />
                    <div>
                        {activeChatMessages.map((entry: MessageEntry, entryIndex: number) => (
                            <div key={entryIndex}>
                                {entry.role === 'assistant' ? (
                                    <AssistantMessage entryIndex={entryIndex.toString()} />
                                ) : (
                                    <UserMessage entryIndex={entryIndex.toString()} />
                                )}
                                <Space h={10} />
                            </div>
                        ))}
                    </div>
                </Grid.Col>
                <Grid.Col span={0.5}></Grid.Col>
            </Grid>
        </div>
    );
};

export default ChatComponent;

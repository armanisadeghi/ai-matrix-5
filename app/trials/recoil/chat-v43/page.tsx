'use client';

import { useSetActiveChat } from '@/app/trials/recoil/local/hooks/useSetActiveChat';
import React, { useEffect, useMemo, useState } from 'react';
import { useLoadChats } from '@/hooks/ai/useLoadChats';
import { activeChatIdAtom, chatMessagesSelectorFamily, chatSummariesAtom, hasSubmittedMessageAtom, hookIdAtom, hookIndexAtom, isNewChatAtom, streamTriggerAtomFamily, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { useChatApi } from '@/hooks/ai/useChatApi';
import { notifications } from '@mantine/notifications';
import { useRecoilValue, useSetRecoilState, useRecoilState, } from 'recoil';
import { ChatType } from '@/types';
import { Box, Button, Grid, List, Textarea, TextInput, ThemeIcon } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';

const ControlPanel: React.FC = () => {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [chatIdInput, setChatIdInput] = useState('');
    const [userInput, setUserInput] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [assistantMessage, setAssistantMessage] = useState('');
    const [systemMessage, setSystemMessage] = useRecoilState(systemMessageAtom);
    const {messages, initialChats, fetchMessages, addUserMessage, addAssistantText} = useRecoilValue(chatMessagesSelectorFamily(activeChatId));
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [userSubmitState, setUserSubmit] = useRecoilState(hasSubmittedMessageAtom);
    const [isNewChatState, setIsNewChat] = useRecoilState(isNewChatAtom);
    const hookId = useRecoilValue(hookIdAtom);
    const hookIndex = useRecoilValue(hookIndexAtom)
    const [streamTrigger, setStreamTrigger] = useRecoilState(streamTriggerAtomFamily({hookId: hookId, index: hookIndex}));

    useEffect(() => {
        if (activeChatId) {
            fetchMessages();
            messages;

        }
    }, [activeChatId]);

    const handleUpdateChatId = () => {
        setActiveChatId(chatIdInput);
        setChatIdInput('');
    };

    const handleNewChat = () => {
        // setIsNewChat(true); Commented out due to outside errors. TODO: Put back, if running this.
        const newChatId = uuidv4();
        setActiveChatId(newChatId);
        console.log('New chat started with chatId:', newChatId);
    };

    const handleSubmitChat = () => {
        addUserMessage(userInput);
        setUserInput('');
    };

    const handleAddSystemMessage = () => {
        // Logic for adding system message
        console.log('Adding system message:', systemMessage);
        setSystemMessage('');
    };

    const handleAddUserMessage = () => {
        // Logic for adding user message
        console.log('Adding user message:', userMessage);
        setUserMessage('');
    };

    const handleAddAssistantMessage = () => {
        console.log('Adding assistant message:', assistantMessage, 'ID:');
        setAssistantMessage('');
    };

    return (
        <Box>
            <h4>Controls & Data</h4>
            <List size="sm" listStyleType="disc">
                <List.Item>Chat ID: {activeChatId}</List.Item>
                <List.Item>Active Chat ID: {'hi'}</List.Item>
                <List.Item>Active Chat Title:{"hello"}</List.Item>
                <List.Item>Is New Chat? {String(isNewChatState)}</List.Item>
                <List.Item>User Submit: {String(userSubmitState)}</List.Item>
                <List.Item>User Text Input:</List.Item>
                <List>
                    <List.Item>{userTextInput || 'None'}</List.Item>
                </List>
                <List.Item>Hook ID & Index: {hookId}-{hookIndex}</List.Item>
                <List.Item>Stream Trigger: {streamTrigger}</List.Item>
            </List>

            <Box my="md">
                <Textarea
                    label="User Text Input"
                    placeholder="Type your message here"
                    value={userInput}
                    onChange={(event) => setUserInput(event.currentTarget.value)}
                />
                <Button mt="xs" onClick={handleSubmitChat}>Submit Chat</Button>
            </Box>

            <Box my="md">
                <TextInput
                    label="Chat ID"
                    placeholder="Enter chat ID"
                    value={chatIdInput}
                    onChange={(event) => setChatIdInput(event.currentTarget.value)}
                />
                <Button mt="sm" onClick={handleUpdateChatId}>Update chat ID</Button>
                <Button ml="sm" onClick={handleNewChat}>New Chat</Button>
            </Box>

            <Box my="md">
                <Textarea
                    label="System Message"
                    placeholder="Enter system message"
                    value={systemMessage}
                    onChange={(event) => setSystemMessage(event.currentTarget.value)}
                />
                <Button mt="xs" onClick={handleAddSystemMessage}>Add System Message</Button>
            </Box>

            <Box my="md">
                <Textarea
                    label="User Message"
                    placeholder="Enter user message"
                    value={userMessage}
                    onChange={(event) => setUserMessage(event.currentTarget.value)}
                />
                <Button mt="xs" onClick={handleAddUserMessage}>Add User Message</Button>
            </Box>

            <Box my="md">
                <Textarea
                    label="Assistant Message"
                    placeholder="Enter assistant message"
                    value={assistantMessage}
                    onChange={(event) => setAssistantMessage(event.currentTarget.value)}
                />
                <TextInput value={''} mt="xs" label="Message ID" placeholder="Enter message ID"/>
                <Button mt="xs" onClick={handleAddAssistantMessage}>Add Assistant Message</Button>
            </Box>
        </Box>
    );
};

const useSortedChats = () => {
    const userChats = useRecoilValue(chatSummariesAtom);

    const sortedChats = useMemo(() => {
        return Object.values(userChats).sort((a, b) => {
            return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
        });
    }, [userChats]);

    return sortedChats;
};

const UserChats: React.FC = () => {
    const sortedChats = useSortedChats();

    return (
        <div>
            <h4>User Chats</h4>
            <List spacing="xs" size="sm" center>
                {sortedChats.map((chat) => (
                    <ChatListItem key={chat.chatId} chat={chat}/>
                ))}
            </List>
        </div>
    );
};

const ChatListItem: React.FC<{ chat: ChatType; }> = ({chat}) => {
    const {fetchMessages} = useRecoilValue(chatMessagesSelectorFamily(chat.chatId));
    const setActiveChatId = useSetRecoilState(activeChatIdAtom);

    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const {chatSummaries, loading, error} = useLoadChats();
    const {deleteChat} = useChatApi()
    const handleDelete = async (chatId: string) => {
        if (window.confirm('Are you sure you want to delete this chat?')) {
            setIsDeleting(chatId);
            try {
                await deleteChat(chatId);
                notifications.show({title: 'Success', message: 'Chat deleted successfully', color: 'green'});
            }
            catch (error) {
                notifications.show({title: 'Error', message: 'Failed to delete chat', color: 'red'});
            }
            finally {
                setIsDeleting(null);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleClick = async () => {
        setActiveChatId(chat.chatId);
        const updatedMessages = await fetchMessages();
        console.log(updatedMessages);
    };

    return (
        <List.Item
            icon={
                chat.fetchedMessages ? (
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck style={{width: 16, height: 16}}/>
                    </ThemeIcon>
                ) : (
                    <ThemeIcon color="blue" size={24} radius="xl">
                        <IconCircleDashed style={{width: 16, height: 16}}/>
                    </ThemeIcon>
                )
            }
            onClick={handleClick}
        >
            <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>
                {chat.chatTitle}
            </a>
        </List.Item>
    );
};

const ChatMessages: React.FC = () => {
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const { messages } = useRecoilValue(chatMessagesSelectorFamily(activeChatId));

    return (
        <div>
            <h4>Chat Messages</h4>
            <List>
                {messages.map((message) => (
                    <List.Item key={message.id}>
                        {message.text}
                    </List.Item>
                ))}
            </List>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <div style={{paddingTop: '5px', paddingRight: '20px', paddingLeft: '10px'}}>
            <Grid gutter="xl">
                <Grid.Col span={2}>
                    <UserChats/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <ChatMessages/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <ControlPanel/>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default App;


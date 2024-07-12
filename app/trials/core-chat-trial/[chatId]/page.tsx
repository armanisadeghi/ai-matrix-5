'use client';

import ChatSummaries from '@/app/trials/core-chat-trial/components/ChatSummaries';
import { useChatMessages } from '@/hooks/ai/useChatMessages';
import { activeChatIdAtom, activeChatMessagesArrayAtom, assistantTextStreamAtom, chatSummariesAtom, isNewChatAtom, systemMessageAtom, userTextInputAtom } from '@/state/aiAtoms/aiChatAtoms';
import { Box, Button, Container, Grid, Stack, Textarea, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';


const ChatIndividual = ({chatId}: { chatId: string }) => {
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const [isNewChat, setIsNewChat] = useRecoilState(isNewChatAtom);
    const {activeChat, activeChatWithMessages, isLoading, error: chatError, setActiveChat, startNewChat, finishNewChatTransition,} = useActiveChatTwo();
    const {messages, loading, error: messagesError, chatEntry, addUserMessage} = useChatMessages(chatId)

    useEffect(() => {
        if (chatId && typeof chatId === 'string') {
            setActiveChatId(chatId);
        }
    }, [chatId, setActiveChatId]);

    const handleNewChat = () => {
        setIsNewChat(true);
        startNewChat();
    };

    const handleChatSelection = (chatId: string) => {
        setActiveChatId(chatId);
        setActiveChat(chatId);
    };

    const handleUserInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserTextInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (!userTextInput) return;
        addUserMessage(userTextInput);
    };

    return (
        <Container>
            <Grid>
                <Grid.Col span={9}>
                    <Title order={1}>Chat Application</Title>
                    <Box mt="md">
                        <Title order={2}>Active Chat</Title>
                        <Stack gap="sm">
                            {messages.filter((message) => message.role === 'user' || message.role === 'assistant').map((message, index) => (
                                <Box key={index} className={message.role === 'user' ? 'user-message' : 'assistant-message'}>
                                    {message.text}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                    <Box mt="md">
                        <Title order={2}>Send a Message</Title>
                        <Textarea
                            value={userTextInput}
                            onChange={handleUserInputChange}
                            placeholder="Type your message here"
                            minRows={4}
                            mt="sm"
                        />
                        <Button onClick={handleSendMessage} mt="sm">Send</Button>
                    </Box>
                </Grid.Col>
                <Grid.Col span={3}>
                    <ChatSummaries/>
                    <Button onClick={handleNewChat} mt="sm">Start New Chat</Button>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default ChatIndividual;
